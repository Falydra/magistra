<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\IRSRequest;
use App\Http\Requests\IRSJadwalRequest;
use App\Models\Mahasiswa;
use Inertia\Inertia;
use App\Models\Kelas;
use App\Models\Jadwal;
use App\Models\IRS;
use App\Models\Hari;
use App\Models\Ruang;
use App\Models\MataKuliah;
use App\Models\IRSJadwal;
use Carbon\Carbon;

class IRSController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;

        $irs = IRS::join('mahasiswa', 'irs.nim', '=', 'mahasiswa.nim')
            ->select('irs.*', 'mahasiswa.nama', 'mahasiswa.tahun_masuk', 'mahasiswa.kode_registrasi')
            ->where('irs.nim', $mahasiswa->nim)
            ->get();

        return Inertia::render('Mahasiswa/IRS', [
            'mahasiswa' => $mahasiswa,
            'irs' => $irs,
        ]);
    }

    public function create(Request $request)
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;
        $mahasiswa->hasMadeIRS = IRS::where('nim', $mahasiswa->nim)
            ->where('semester', $mahasiswa->semester)
            ->exists();

            $irs = IRS::join('mahasiswa', 'irs.nim', '=', 'mahasiswa.nim')
            ->select('irs.id', 'irs.total_sks', 'irs.status', 'irs.semester')
            ->where('irs.semester', $mahasiswa->semester)
            ->orderBy('irs.semester', 'desc')
            ->get();

        $matakuliah = MataKuliah::all();
        $hari = Hari::all();
        $ruang = Ruang::all();

        $jadwalQuery = Jadwal::join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->leftJoin('dosen as d1', 'mata_kuliah.dosen_nip', '=', 'd1.nip')
            ->leftJoin('dosen as d2', 'mata_kuliah.dosen_nip_2', '=', 'd2.nip')
            ->leftJoin('dosen as d3', 'mata_kuliah.dosen_nip_3', '=', 'd3.nip')
            ->select(
                'jadwal.*',
                'mata_kuliah.nama as nama',
                'mata_kuliah.sks',
                'mata_kuliah.semester',
                'mata_kuliah.kuota',
                'd1.nama as dosen_1',
                'd2.nama as dosen_2',
                'd3.nama as dosen_3'
            )
            ->where(function ($query) use ($mahasiswa) {
                $query->where('mata_kuliah.semester', $mahasiswa->semester)
                    ->orWhere('mata_kuliah.semester', $mahasiswa->semester - 2)
                    ->orWhere('mata_kuliah.semester', $mahasiswa->semester - 4)
                    ->orWhere('mata_kuliah.semester', $mahasiswa->semester - 6);
            });

        if ($request->has('filterSemester') && $request->filterSemester) {
            $jadwalQuery->where('mata_kuliah.semester', $request->filterSemester);
        }

        if ($request->has('filterSKS') && $request->filterSKS) {
            $jadwalQuery->where('mata_kuliah.sks', $request->filterSKS);
        }

        if ($request->has('filterJenis') && $request->filterJenis) {
            $jadwalQuery->where('mata_kuliah.jenis', $request->filterJenis);
        }

        $jadwal = $jadwalQuery->get();
        $kelas = Kelas::whereIn('kelas', $jadwal->pluck('kelas')->toArray())->get();

        return Inertia::render('Mahasiswa/TambahIRS', [
            'mahasiswa' => $mahasiswa,
            'kelas' => $kelas,
            'jadwal' => $jadwal,
            'hari' => $hari,
            'ruang' => $ruang,
            'irs' => $irs,
            'matakuliah' => $matakuliah,

            'session' => [
                'selected_ids' => session('selected_ids', []),
                'total_sks' => session('total_sks', 0),
            ],
            'filters' => $request->only(['filterSKS', 'filterSemester', 'filterJenis']),
        ]);
    }

    public function store(IRSRequest $request, IRSJadwalRequest $request2)
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;
        $validated = $request->validated();
        $validated2 = $request2->validated();

        // Cek apakah mahasiswa sudah membuat IRS pada semester ini
        $existingIRS = IRS::where('nim', '=',  $mahasiswa->nim)
            ->where('semester', $mahasiswa->semester)
            ->first();

        if ($existingIRS) {
            return redirect()->route('mahasiswa.checkIRS')->withErrors([
                'error' => 'IRS untuk semester ini sudah dibuat. Silakan edit mata kuliah Anda.',
            ]);
        }

        // Buat IRS baru
        $irs = IRS::create([
            'nim' => $mahasiswa->nim,
            'total_sks' => $validated['total_sks'],
            'semester' => $mahasiswa->semester,
            'status' => 'Belum Disetujui',
        ]);

        foreach ($validated2['id_jadwal'] as $value) {
            $jadwal = Jadwal::find($value);
            if ($jadwal) {
                $priority = $this->getPriority($mahasiswa->semester, $jadwal->semester);
                $this->handlePriorityQueue($jadwal, $mahasiswa, $priority);
                IRSJadwal::create([
                    'id_irs' => $irs->id,
                    'id_jadwal' => $value,
                ]);
            }
        }

        // Simpan data ke session
        session([
            'selected_ids' => $validated2['id_jadwal'],
            'total_sks' => $validated['total_sks'],
        ]);

        return redirect()->route('mahasiswa.checkIRS')->with('success', 'IRS berhasil dibuat.');
    }

    private function getPriority($studentSemester, $courseSemester)
    {
        if ($studentSemester == $courseSemester) {
            return 1;
        } elseif ($studentSemester > $courseSemester) {
            return 2;
        } else {
            return 3;
        }
    }

    private function handlePriorityQueue($jadwal, $mahasiswa, $priority)
    {
        $currentRegistrations = IRSJadwal::where('id_jadwal', $jadwal->id)->count();
        if ($currentRegistrations < $jadwal->kuota) {
            return;
        }

        if ($priority == 1) {
            $lowerPriorityRegistrations = IRSJadwal::join('irs', 'irs_jadwal.id_irs', '=', 'irs.id')
                ->join('mahasiswa', 'irs.nim', '=', 'mahasiswa.nim')
                ->where('irs_jadwal.id_jadwal', $jadwal->id)
                ->where('mahasiswa.semester', '!=', $jadwal->semester)
                ->orderBy('mahasiswa.semester', 'desc')
                ->get();

            if ($lowerPriorityRegistrations->isNotEmpty()) {
                $registrationToRemove = $lowerPriorityRegistrations->first();
                IRSJadwal::where('id', $registrationToRemove->id)->delete();
            }
        }
    }

    public function updateIRS(Request $request, $id)
{
    $user = auth()->user();
    $mahasiswa = $user->mahasiswa;

    $irs = IRS::findOrFail($id);
    $validated = $request->validate([
        'id_jadwal' => 'required|array',
        'id_jadwal.*' => 'required|exists:jadwal,id',
        'total_sks' => 'required|integer',
    ]);

    \Log::info('Request Data:', $request->all());

    $irs->update([
        'id_jadwal' => json_encode($validated['id_jadwal']),
        'total_sks' => $validated['total_sks'],
    ]);

    $irsJadwal = IRSJadwal::where('id_irs', $irs->id)->get();
    //insert if there was e new jadwal id
    foreach ($validated['id_jadwal'] as $value) {
        $jadwal = Jadwal::find($value);
        if ($jadwal) {
            $priority = $this->getPriority($mahasiswa->semester, $jadwal->semester);
            $this->handlePriorityQueue($jadwal, $mahasiswa, $priority);
            $irsJadwal = IRSJadwal::firstOrCreate([
                'id_irs' => $irs->id,
                'id_jadwal' => $value,
            ]);
        }
    }

    return redirect()->route('mahasiswa.checkIRS')->with('success', 'IRS berhasil diubah.');
}


    public function checkIRS(Request $request)
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;

        $semester = $request->get('semester', null); // Ambil parameter semester jika ada, default null

        $irs = IRS::join('mahasiswa', 'irs.nim', '=', 'mahasiswa.nim')
            ->select('irs.id', 'irs.total_sks', 'irs.status', 'irs.semester')
            ->where('irs.nim', $mahasiswa->nim)
            ->where('irs.semester', $request->get('semester', $mahasiswa->semester))
            ->orderBy('irs.semester', 'desc')
            ->get();

        $mahasiswa = Mahasiswa::join('prodi', 'mahasiswa.kode_prodi', '=', 'prodi.kode_prodi')
            ->leftJoin('pembimbing as p1', 'mahasiswa.pembimbing_id', '=', 'p1.id')
            ->leftJoin('dosen as d1', 'p1.nip', '=', 'd1.nip')
            ->join('irs', 'mahasiswa.nim', '=', 'irs.nim')
            ->select(
                'mahasiswa.*',
                'irs.status as status_irs',
                'irs.total_sks as total_sks',
                'prodi.nama as prodi',
                'd1.nama as dosen_pembimbing',
            )
            ->where('mahasiswa.nim', $mahasiswa->nim)
            ->when($semester, function ($query, $semester) {
                return $query->where('irs.semester', $semester); // Filter berdasarkan semester jika tersedia
            })
            ->orderBy('irs.semester', 'desc')
            ->first();

        $irsJadwal = IRSJadwal::join('irs', 'irs_jadwal.id_irs', '=', 'irs.id')
            ->join('jadwal', 'irs_jadwal.id_jadwal', '=', 'jadwal.id')
            ->join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->leftJoin('dosen as d1', 'mata_kuliah.dosen_nip', '=', 'd1.nip')
            ->leftJoin('dosen as d2', 'mata_kuliah.dosen_nip_2', '=', 'd2.nip')
            ->leftJoin('dosen as d3', 'mata_kuliah.dosen_nip_3', '=', 'd3.nip')
            ->select(
                'irs.total_sks as Total sks',
                'irs.semester as semester',
                'jadwal.*',
                'mata_kuliah.nama as nama',
                'mata_kuliah.semester as semester',
                'mata_kuliah.sks',
                'd1.nama as dosen_1',
                'd2.nama as dosen_2',
                'd3.nama as dosen_3'
            )
            ->where('irs.nim', $mahasiswa->nim)
            ->where('irs.semester', $request->get('semester', $mahasiswa->semester))
            ->get();

        return Inertia::render('Mahasiswa/CheckIRS', [
            'mahasiswa' => $mahasiswa,
            'irsJadwal' => $irsJadwal,
            'irs' => $irs,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $irs = IRS::findOrFail($id);
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;

        if ($irs->semester < $mahasiswa->semester) {
            return redirect()->route('mahasiswa.deleteIRS');
        }

        $irs->delete();
        session()->forget(['selected_ids', 'total_sks']);

        return redirect()->route('mahasiswa.irs');
    }
}