<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PenyusunanJadwal;
use App\Models\JadwalProdi;
use Illuminate\Support\Str;

class JadwalProdiController extends Controller
{
    public function ajukanKeDekan(Request $request)
{
    try {
        $validated = $request->validate([
            'jadwal_ids' => 'required|array',
            'jadwal_ids.*' => 'exists:jadwal,id',
            'kode_prodi' => 'required|string|exists:prodi,kode_prodi',
        ]);

        \Log::info('Data berhasil divalidasi:', $validated);

        $kodeJadwalProdi = 'JADWAL-' . strtoupper(Str::random(4));

        $jadwalProdi = JadwalProdi::create([
            'kode_jadwal_prodi' => $kodeJadwalProdi,
            'kode_prodi' => $validated['kode_prodi'],
            'status' => 'belum disetujui',
        ]);
        
        // Simpan relasi di tabel penyusunan_jadwal
        foreach ($validated['jadwal_ids'] as $jadwalId) {
            PenyusunanJadwal::create([
                'jadwal_prodi_id' => $jadwalProdi->id,
                'jadwal_id' => $jadwalId,
                'kode_jadwal_prodi' => $kodeJadwalProdi,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Jadwal berhasil diajukan ke dekan!',
            'kode_jadwal_prodi' => $kodeJadwalProdi,
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal.',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan saat mengajukan jadwal ke dekan.',
        ], 500);
    }
}
}