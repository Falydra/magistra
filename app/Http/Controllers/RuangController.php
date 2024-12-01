<?php

namespace App\Http\Controllers;

use App\Models\Ruang;
use Illuminate\Http\Request;

class RuangController extends Controller
{
    public function getRuang()
    {
        // Fetching all rooms
        $ruang = Ruang::all();
        return response()->json($ruang);  // Return the data as JSON
    }
}

