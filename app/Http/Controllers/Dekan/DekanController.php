<?php

namespace App\Http\Controllers\Dekan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Dekan;
use App\Models\Ruang;
use Inertia\Inertia;


class DekanController extends Controller
{
    public function index()
    {
 
        $dekan = Dekan::where('user_id', auth()->user()->id)->first();
        return Inertia::render('Dekan/Dashboard',[
            'dekan' => $dekan
        ]);
    }

    public function showruang(Request $request) {
        $ruangan = Ruang::query();


        //Show ruang only when is_verif is '1'

        
        if ($request->has('filter_prodi') && $request->filter_prodi) {
            $ruangan->where('kode_prodi', $request->filter_prodi);
        }

        $perPage = $request->get('perPage', 5);


        //where is verif = '1' or where is verif = '2'
        $ruangan = $ruangan->where('is_verif', '1')->orWhere('is_verif', '2')->orWhere('is_verif', '3')->orderBy('id', 'asc')->paginate($perPage)->appends($request->only(['filter_prodi']));


        // $ruangan = $ruangan->where('is_verif', '1', )->orderBy('id', 'asc')->paginate($perPage)->appends($request->only(['filter_prodi']));

        return Inertia::render('Dekan/PersetujuanRuang', [
            'ruangan' => $ruangan,
            'filters' => $request->only(['filter_prodi']),
            'perPage' => $perPage
        ]);
    }

    public function showJadwal(Request $request) {
        //Take kode prodi from ruang where kode ruang jadwal = kode ruang ruang then join kode_prodi ruang = kode_prodi prodi
        $jadwal = Ruang::query()->join('jadwal', 'ruang.kode_ruang', '=', 'jadwal.kode_ruang')
        ->join('prodi', 'ruang.kode_prodi', '=', 'prodi.kode_prodi')
        ->select('jadwal.*', 'prodi.nama as program_studi', 'prodi.kode_prodi as kode_prodi');
    
        //dont select from status cause jadwal dont have status
        
        


        if ($request->has('filter_prodi') && $request->filter_prodi) {
            $jadwal->where('kode_prodi', $request->filter_prodi);
        }
        

        $jadwal = $jadwal->orderBy('id', 'asc')->paginate(5)->appends($request->only(['filter_prodi']));

        return Inertia::render('Dekan/PersetujuanJadwal', [
            'jadwal' => $jadwal,
            'filters' => $request->only(['filter_prodi'])
        ]);
    }

    public function updateStatus(Request $request)
    {
        $validated = $request->validate([
            'selectedIds' => 'required|array',
            'selectedIds.*' => 'exists:ruang,id',
        ]);

        Ruang::whereIn('id', $validated['selectedIds'])->update(['is_verif' => '2']);

        return redirect()->route('dekan.ruang');
    }

    public function rejectStatus(Request $request)
    {
        $validated = $request->validate([
            'selectedIds' => 'required|array',
            'selectedIds.*' => 'exists:ruang,id',
        ]);

        Ruang::whereIn('id', $validated['selectedIds'])->update(['is_verif' => '3']);

        return redirect()->route('dekan.ruang');
    }

    public function resetStatus(Request $request)
    {
        $validated = $request->validate([
            'selectedIds' => 'required|array',
            'selectedIds.*' => 'exists:ruang,id',
        ]);

        Ruang::whereIn('id', $validated['selectedIds'])->update(['is_verif' => '1']);

        return redirect()->route('dekan.ruang');
    }



    public function create()
    {
        return view('dekan.create');
    }
}