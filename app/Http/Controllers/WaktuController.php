<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Waktu;

class WaktuController extends Controller
{
    public function getWaktu()
{
    $waktu = Waktu::all();  // Assuming 'Waktu' is the model for the 'waktu' table
    return response()->json($waktu);
}

}
