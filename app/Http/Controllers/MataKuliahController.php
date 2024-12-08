<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\MataKuliah;
use App\Models\Jadwal;

class MataKuliahController extends Controller
{
    // List mata kuliah
    public function getMataKuliah(Request $request)
    {
        $request->validate([
            'semester' => 'nullable|integer|min:1|max:8',
        ]);

        $query = MataKuliah::query();
        if ($request->has('semester')) {
            $query->where('semester', $request->semester);
        }

        $mataKuliah = $query->with(['dosenUtama', 'dosenKedua', 'dosenKetiga'])->get();
        return response()->json($mataKuliah->map(function ($mk) {
            return [
                'id' => $mk->id,
                'kode_mk' => $mk->kode_mk,
                'nama' => $mk->nama,
                'sks' => $mk->sks,
                'semester' => $mk->semester,
                'jenis' => $mk->jenis,
                'kuota' => $mk->kuota,
                'dosen_utama' => $mk->dosenUtama->nama ?? null,
                'dosen_kedua' => $mk->dosenKedua->nama ?? null,
                'dosen_ketiga' => $mk->dosenKetiga->nama ?? null,
            ];
        }));
    }

    // Detail matkul tertentu
    public function getMataKuliahDetail($kodeMk)
{
    $mataKuliah = MataKuliah::where('kode_mk', $kodeMk)
        ->with(['dosenUtama', 'dosenKedua', 'dosenKetiga'])
        ->first();

    if (!$mataKuliah) {
        return response()->json(['success' => false, 'message' => 'Mata kuliah tidak ditemukan.'], 404);
    }

    return response()->json([
        'success' => true,
        'data' => [
            'kode_mk' => $mataKuliah->kode_mk,
            'nama' => $mataKuliah->nama,
            'semester' => $mataKuliah->semester,
            'sks' => $mataKuliah->sks,
            'jumlah_kelas' => $mataKuliah->jumlah_kelas,
            'kuota' => $mataKuliah->kuota,
            'dosen_utama' => $mataKuliah->dosenUtama->nama ?? null,
            'dosen_kedua' => $mataKuliah->dosenKedua->nama ?? null,
            'dosen_ketiga' => $mataKuliah->dosenKetiga->nama ?? null,
        ]
    ]);
}
    
//     // Update data mata kuliah
//     public function updateMataKuliah(Request $request)
//     {
//     // Validasi data dari frontend
//     $validated = $request->validate([
//         'kode_mk' => 'required|string|exists:mata_kuliah,kode_mk',
//         'semester' => 'required|integer|min:1|max:8',
//         'sks' => 'required|integer|min:1|max:4',
//         'jumlah_kelas' => 'required|integer|min:1|max:10',
//         'kuota' => 'required|integer|min:1|max:200',
//         'dosen_nip' => 'nullable|string|exists:dosen,nip', // Dosen utama
//         'dosen_nip_2' => 'nullable|string|exists:dosen,nip', // Dosen kedua
//         'dosen_nip_3' => 'nullable|string|exists:dosen,nip', // Dosen ketiga
//     ]);

//     // Cari mata kuliah berdasarkan kode
//     $mataKuliah = MataKuliah::where('kode_mk', $validated['kode_mk'])->first();
//     if (!$mataKuliah) {
//         return response()->json(['success' => false, 'message' => 'Mata kuliah tidak ditemukan'], 404);
//     }

//     // Update data mata kuliah
//     $mataKuliah->update([
//         'semester' => $validated['semester'],
//         'sks' => $validated['sks'],
//         'jumlah_kelas' => $validated['jumlah_kelas'],
//         'kuota' => $validated['kuota'],
//         'dosen_nip' => $validated['dosen_nip'],
//         'dosen_nip_2' => $validated['dosen_nip_2'],
//         'dosen_nip_3' => $validated['dosen_nip_3'],
//     ]);

//     return response()->json([
//         'success' => true,
//         'message' => 'Mata kuliah berhasil diperbarui.'
//     ]);
// }

public function updateMataKuliah(Request $request)
{
    // Validasi data dari frontend
    $validated = $request->validate([
        'kode_mk' => 'required|string|exists:mata_kuliah,kode_mk',
        'semester' => 'required|integer|min:1|max:8',
        'sks' => 'required|integer|min:1|max:4',
        'jumlah_kelas' => 'required|integer|min:1|max:10',
        'kuota' => 'required|integer|min:1|max:200',
        'dosen_nip' => 'nullable|string|exists:dosen,nip', // Dosen utama
        'dosen_nip_2' => 'nullable|string|exists:dosen,nip', // Dosen kedua
        'dosen_nip_3' => 'nullable|string|exists:dosen,nip', // Dosen ketiga
    ]);

    Log::info('Data validasi untuk update mata kuliah:', $validated);

    // Cari mata kuliah berdasarkan kode
    $mataKuliah = MataKuliah::where('kode_mk', $validated['kode_mk'])->first();
    if (!$mataKuliah) {
        Log::error('Mata kuliah tidak ditemukan.');
        return response()->json(['success' => false, 'message' => 'Mata kuliah tidak ditemukan'], 404);
    }

    // Simpan SKS lama untuk membandingkan apakah ada perubahan
    $oldSks = $mataKuliah->sks;

    // Update data mata kuliah
    $mataKuliah->update([
        'semester' => $validated['semester'],
        'sks' => $validated['sks'],
        'jumlah_kelas' => $validated['jumlah_kelas'],
        'kuota' => $validated['kuota'],
        'dosen_nip' => $validated['dosen_nip'],
        'dosen_nip_2' => $validated['dosen_nip_2'],
        'dosen_nip_3' => $validated['dosen_nip_3'],
    ]);

    Log::info('Mata kuliah berhasil diperbarui.');

    // Jika SKS berubah, perbarui waktu akhir di jadwal
    if ($oldSks != $validated['sks']) {
        Log::info("SKS berubah dari $oldSks menjadi {$validated['sks']}");

        $jadwals = Jadwal::where('kode_mk', $validated['kode_mk'])->get();
        Log::info('Jadwal yang terkait dengan mata kuliah:', $jadwals->toArray());

        foreach ($jadwals as $jadwal) {
            // Hitung waktu akhir baru berdasarkan startTime + sks * duration
            $startTime = \Carbon\Carbon::createFromFormat('H:i:s', $jadwal->waktu_mulai);
            $newEndTime = $startTime->addMinutes($validated['sks'] * 50); // Misalnya 1 SKS = 50 menit

            $jadwal->update([
                'waktu_akhir' => $newEndTime->format('H:i:s'),
            ]);

            Log::info("Jadwal ID {$jadwal->id} diperbarui dengan waktu akhir baru: {$newEndTime->format('H:i:s')}");
        }
    } else {
        Log::info('SKS tidak berubah, tidak ada jadwal yang diperbarui.');
    }

    return response()->json([
        'success' => true,
        'message' => 'Mata kuliah dan jadwal berhasil diperbarui.',
    ]);
}
}
