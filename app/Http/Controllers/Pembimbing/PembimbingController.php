<?php
// app/Http/Controllers/Pembimbing/PembimbingController.php

namespace App\Http\Controllers\Pembimbing;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pembimbing;
use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\IRS;
use App\Models\Jadwal;
use App\Models\IRSJadwal;
use App\Models\AngkatanPerwalian;
use Inertia\Inertia;

class PembimbingController extends Controller {
    
    public function index() {
        return Inertia::render('Pembimbing/Dashboard');
    }

    public function persetujuanIRS()
    {
        $user = auth()->user();
        $pembimbing = $user->pembimbing;
    
        if (!$pembimbing) {
            return redirect()->route('pembimbing.dashboard')->with('error', 'Pembimbing tidak ditemukan.');
        }
    
        // Ambil angkatan perwalian dari pembimbing
        $angkatanPerwalian = $pembimbing->angkatanPerwalian()->pluck('angkatan_perwalian');
    
        // Mengambil mahasiswa berdasarkan angkatan yang diinginkan dan memastikan mahasiswa memiliki IRS
        $mahasiswa = Mahasiswa::with(['irs' => function ($query) {
            $query->orderBy('semester', 'desc'); // Urutkan IRS berdasarkan semester desc
        }])
            ->whereIn('tahun_masuk', $angkatanPerwalian)
            ->whereHas('pembimbing', function ($query) use ($pembimbing) {
                $query->where('id', $pembimbing->id);
            })
            ->whereHas('irs')
            ->paginate(5);
    
        // Transformasi data mahasiswa
        $mahasiswa->getCollection()->transform(function ($mahasiswa) {
            // Ambil IRS yang sesuai dengan semester mahasiswa saat ini
            $latestIrs = $mahasiswa->irs->filter(function ($irs) use ($mahasiswa) {
                return $irs->semester == $mahasiswa->semester;
            })->first();
    
            // Tambahkan properti latest_irs
            $mahasiswa->latest_irs = $latestIrs
                ? [
                    'status' => $latestIrs->status,
                    'total_sks' => $latestIrs->total_sks,
                    'semester' => $latestIrs->semester,
                ]
                : null; // Jika tidak ada IRS yang sesuai, tetapkan null
    
            unset($mahasiswa->irs); // Hapus relasi IRS agar tidak redundant
            return $mahasiswa;
        });
    
        // Mengembalikan data ke frontend
        return Inertia::render('Pembimbing/PersetujuanIRS', [
            'students' => $mahasiswa,
            'angkatanPerwalian' => $angkatanPerwalian,
        ]);
    }
    
    public function detailMahasiswa($id)
{
    // Ambil data mahasiswa dengan relasi IRS dan jadwal melalui pivot
    $student = Mahasiswa::with([
        'prodi',
        'pembimbing.dosen',
        'irs.jadwal.mataKuliah',
        'irs.jadwal.ruang',
    ])->findOrFail($id);

    // Ambil IRS terbaru berdasarkan semester desc
    $irs = $student->irs()->orderBy('semester', 'desc')->first();
    $irsStatus = IRS::where('irs.nim', '=', $student->nim)->orderBy('semester', 'desc')->first();

    $formattedJadwal = [];
    if ($irs) {
        // Ambil daftar jadwal melalui pivot
        $irsJadwals = $irs->irsJadwal;

        // Format data jadwal untuk dikirim ke frontend
        $formattedJadwal = $irsJadwals->map(function ($irsJadwal) {
            $jadwal = $irsJadwal->jadwal;

            // Tangani kemungkinan relasi yang kosong
            $mataKuliah = $jadwal->mataKuliah ?? null;
            $ruang = $jadwal->ruang ?? null;

            return [
                'kode_mk' => $mataKuliah->kode_mk ?? 'Tidak tersedia',
                'mata_kuliah' => $mataKuliah->nama ?? 'Tidak tersedia',
                'sks' => $mataKuliah->sks ?? null,
                'kelas' => $jadwal->kelas ?? 'Tidak tersedia',
                'ruang' => $ruang->kode_ruang ?? 'Tidak tersedia',
                'hari' => $jadwal->hari ?? 'Tidak tersedia',
                'waktu_mulai' => $jadwal->waktu_mulai ?? 'Tidak tersedia',
                'waktu_akhir' => $jadwal->waktu_akhir ?? 'Tidak tersedia',
            ];
        });
    }

    // Debugging log untuk memverifikasi data
    \Log::info('Data Mahasiswa:', [
        'student' => $student,
        'jadwal' => $formattedJadwal,
    ]);

    // Kirim data ke frontend
    return inertia('Pembimbing/DetailMahasiswa', [
        'student' => $student,
        'irs' => $irsStatus,
        'jadwal' => $formattedJadwal,
        'semester' => $irs ? $irs->semester : 'Tidak tersedia',
    ]);
}

    public function khsMahasiswa(){
        return Inertia::render('Pembimbing/KHS');
    }

    public function create() {
        return view('pembimbing.create');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role' => 'required|string',
        ]);

        $user = new Pembimbing();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->role = $request->role; // Assign the role from the request
        $user->save();

        return redirect()->route('pembimbing.dashboard')->with('success', 'Pembimbing created successfully.');
    }
}