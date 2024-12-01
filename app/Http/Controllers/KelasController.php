<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kelas;

class KelasController extends Controller
{
    public function getKelas()
{
    $kelas = Kelas::all();  // Assuming 'Kelas' is the model for the 'kelas' table
    return response()->json($kelas);
}

}
