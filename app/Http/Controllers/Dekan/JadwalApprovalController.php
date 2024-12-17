<?php

namespace App\Http\Controllers\Dekan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JadwalProdi;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class JadwalApprovalController extends Controller
{
    public function approveJadwal(Request $request)
{
    $validated = $request->validate([
        'jadwal_prodi_id' => 'required|array',
        'jadwal_prodi_id.*' => 'integer',
        'kode_prodi' => 'required|string',
    ]);

    $jadwalIds = $validated['jadwal_prodi_id'];
    $kodeProdi = $validated['kode_prodi'];

    $jadwal = JadwalProdi::whereIn('id', $jadwalIds)
        ->where('kode_prodi', $kodeProdi)
        ->where('status', '!=', 'Disetujui')
        ->get();

    foreach ($jadwal as $item) {
        $item->status = 'Disetujui';
        $item->save();

        Log::info('Jadwal disetujui.', [
            'id' => $item->id,
            'kode_prodi' => $item->kode_prodi,
            'status' => $item->status,
        ]);
    }

    return redirect()->route('dekan.jadwal');
}

}