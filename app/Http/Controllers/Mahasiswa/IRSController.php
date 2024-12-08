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

public function create(Request $request){
    $user = auth()->user();
    $mahasiswa = $user->mahasiswa;

  

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
        );
      


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
        'filters' => $request->only(['filterSKS', 'filterSemester', 'filterJenis']),	
    ]);
    }

    public function store(IRSRequest $request, IRSJadwalRequest $request2)
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;
        $validated = $request->validated();
        $validated2 = $request2->validated();


        
        
        $irs = IRS::create([
            'nim' => $mahasiswa->nim,
            'total_sks' => $validated['total_sks'],
            'semester' => $mahasiswa->semester, // Asumsikan semester diambil dari model mahasiswa
            'status' => 'Belum Disetujui', // Default status
        ]);

       
    //    here is the console.log of data.id_jadwal
    //    0
    //     : 
    //     1
    //     1
    //     : 
    //     5
    //     2
    //     : 
    //     9
    //     3
    //     : 
    //     13
    //     4
    //     : 
    //     17
    //     5
    //     : 
    //     21
    //     6
    //     : 
    //     33
    // submitted by the form, make the loop to insert the data to the database
        foreach ($validated2['id_jadwal'] as $key => $value) {
            IRSJadwal::create([
                'id_irs' => $irs->id,
                'id_jadwal' => $value,
            ]);
        }
    

     

        return redirect()->route('mahasiswa.checkIRS');

    }


    public function checkIRS(){
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;

        $irs = IRS::join('mahasiswa', 'irs.nim', '=', 'mahasiswa.nim')
            ->select('irs.total_sks', 'irs.status')
            ->where('irs.nim', $mahasiswa->nim)
            ->orderBy('irs.semester', 'desc')
            ->get();


       //Select mahasiswa with join with prodi, dosen pembimbing, by nim and kode prodi, pembimbing id
        $mahasiswa = Mahasiswa::join('prodi', 'mahasiswa.kode_prodi', '=', 'prodi.kode_prodi')
            ->leftJoin('pembimbing as p1', 'mahasiswa.pembimbing_id', '=', 'p1.id')
            ->leftJoin('dosen as d1', 'p1.nip', '=', 'd1.nip')
            //select irs  using nim , select the current semester irs
            ->join('irs', 'mahasiswa.nim', '=', 'irs.nim')
        
            

            ->select(
                'mahasiswa.*',
                'irs.status as status_irs',
                'irs.total_sks as total_sks',
                'prodi.nama as prodi',
                'd1.nama as dosen_pembimbing',
            )
            ->where('mahasiswa.nim', $mahasiswa->nim)
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
            'jadwal.*',
            'mata_kuliah.nama as nama',
            'mata_kuliah.semester as semester',
            'mata_kuliah.sks',
            'd1.nama as dosen_1',
            'd2.nama as dosen_2',
            'd3.nama as dosen_3'
        )
        ->where('irs.nim', $mahasiswa->nim)
        ->get();

  

        return Inertia::render('Mahasiswa/CheckIRS', [
            'mahasiswa' => $mahasiswa,
            'irsJadwal' => $irsJadwal,
            'irs' => $irs,
          
        ]);
    }

    public function submitIRS(Request $request)
{
    $request->validate([
        'mahasiswa_id' => 'required|exists:mahasiswa,id',
        'status' => 'required|string',
    ]);

    $mahasiswa = Mahasiswa::find($request->mahasiswa_id);
    $irs = IRS::where('nim', $mahasiswa->nim)->orderBy('id', 'desc')->first();

    if ($irs) {
        $irs->status = $request->status;
        $irs->save();

        // Notify the pembimbing (you can use events, notifications, or any other method)
        // Example: Notification::send($mahasiswa->pembimbing, new IRSSubmitted($irs));

        return response()->json(['success' => true]);
    }

    return back()->withError('IRS tidak ditemukan');
}

    public function destroy(Request $request, $id)
    {
        $irs = IRS::find($id);
        $irs->delete();

        return redirect()->route('mahasiswa.irs.index');
    }
}
