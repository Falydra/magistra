<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MataKuliahController extends Controller
{
    public function getMataKuliah(Request $request)
    {
        $query = \App\Models\MataKuliah::query();
    
        // Tambahkan filter berdasarkan semester jika parameter semester dikirim
        if ($request->has('semester')) {
            $query->where('semester', $request->semester);
        }
    
        $mataKuliah = $query->get(['id', 'nama', 'kode_mk', 'sks', 'semester', 'jenis', 'kuota', 'dosen_id', 'dosen_id_2', 'dosen_id_3']); 
        return response()->json($mataKuliah);
    }
    

}
