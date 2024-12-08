<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kelas;
use App\Models\MataKuliah;

class KelasController extends Controller
{
    public function getKelas(Request $request)
    {
    $kodeMk = $request->get('kode_mk'); // Ambil kode mata kuliah dari request
    $mataKuliah = MataKuliah::where('kode_mk', $kodeMk)->first();

    if (!$mataKuliah) {
        return response()->json(['success' => false, 'message' => 'Mata kuliah tidak ditemukan.'], 404);
    }

    $jumlahKelas = $mataKuliah->jumlah_kelas; // Ambil jumlah kelas
    $kelasList = [];

    // Generate daftar kelas (A, B, C, ...)
    for ($i = 0; $i < $jumlahKelas; $i++) {
        $kelasList[] = [
            'id' => $i + 1,
            'kelas' => chr(65 + $i), // ASCII 
        ];
    }

    return response()->json(['success' => true, 'data' => $kelasList]);
}

}
