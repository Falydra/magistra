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
        // Validasi input
        $validated = $request->validate([
            'jadwal_ids' => 'required|array|min:1', // Jadwal ID harus berupa array dan tidak kosong
            'jadwal_ids.*' => 'integer|exists:jadwal,id', // Setiap ID harus valid di tabel jadwal
        ]);

        // Generate kode jadwal prodi unik
        $kodeJadwalProdi = 'JP-' . strtoupper(Str::random(8));

        // Simpan entri baru di tabel jadwal_prodi
        $jadwalProdi = JadwalProdi::create([
            'kode_jadwal_prodi' => $kodeJadwalProdi,
            'status' => 'belum disetujui',
        ]);

        // Simpan relasi di tabel penyusunan_jadwal
        foreach ($validated['jadwal_ids'] as $jadwalId) {
            PenyusunanJadwal::create([
                'jadwal_prodi_id' => $jadwalProdi->id,
                'jadwal_id' => $jadwalId,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Jadwal berhasil diajukan ke dekan!',
            'kode_jadwal_prodi' => $kodeJadwalProdi,
        ]);
    }
}