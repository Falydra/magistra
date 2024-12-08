<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dosen;

class DosenController extends Controller
{
    public function getDosen()
    {
        try {
            $dosen = Dosen::select('nip', 'nama')->get();

            return response()->json([
                'success' => true,
                'data' => $dosen,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data dosen.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
