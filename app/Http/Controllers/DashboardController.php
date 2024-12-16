<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Irs;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // Mengambil jumlah IRS berdasarkan status tertentu
        $disetujuiCount = Irs::where('status', 'Disetujui')->count();
        $dibatalkanCount = Irs::where('status', 'Dibatalkan')->count();
        $diizinkanCount = Irs::where('status', 'Diizinkan')->count();

        // Mengirimkan data ke frontend
        return inertia('Dashboard', [
            'disetujuiCount' => $disetujuiCount,
            'dibatalkanCount' => $dibatalkanCount,
            'diizinkanCount' => $diizinkanCount,
            'auth' => Auth::user() 
        ]);
    }
}
