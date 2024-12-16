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

public function updateMataKuliah(Request $request)
{
    try {
        $validated = $request->validate([
            'kode_mk' => 'required|string|exists:mata_kuliah,kode_mk',
            'semester' => 'required|integer|min:1|max:8',
            'sks' => 'required|integer|min:1|max:4',
            'jumlah_kelas' => 'required|integer|min:1|max:10',
            'kuota' => 'required|integer|min:1|max:200',
            'dosen_nip' => 'nullable|string|exists:dosen,nip',
            'dosen_nip_2' => 'nullable|string|exists:dosen,nip',
            'dosen_nip_3' => 'nullable|string|exists:dosen,nip',
        ]);


        // Validasi kode_mk agar tidak digunakan oleh mata kuliah lain
        $existingMatkul = MataKuliah::where('kode_mk', '!=', $validated['kode_mk'])
            ->where('kode_mk', $validated['kode_mk'])
            ->exists();

        if ($existingMatkul) {
            return response()->json([
                'success' => false,
                'message' => 'Kode mata kuliah sudah digunakan oleh mata kuliah lain.',
            ], 422);
        }
        $mataKuliah = MataKuliah::where('kode_mk', $validated['kode_mk'])->first();
        if (!$mataKuliah) {
            return response()->json(['success' => false, 'message' => 'Mata kuliah tidak ditemukan'], 404);
        }
        // Simpan SKS lama jika ada perubahan
        $oldSks = $mataKuliah->sks;

        $mataKuliah->update([
            'semester' => $validated['semester'],
            'sks' => $validated['sks'],
            'jumlah_kelas' => $validated['jumlah_kelas'],
            'kuota' => $validated['kuota'],
            'dosen_nip' => $validated['dosen_nip'],
            'dosen_nip_2' => $validated['dosen_nip_2'],
            'dosen_nip_3' => $validated['dosen_nip_3'],
        ]);
    
        // Jika SKS berubah, perbarui waktu akhir di jadwal
        if ($oldSks != $validated['sks']) {
            $jadwals = Jadwal::where('kode_mk', $validated['kode_mk'])->get();
            foreach ($jadwals as $jadwal) {
                $startTime = \Carbon\Carbon::createFromFormat('H:i:s', $jadwal->waktu_mulai);
                $newEndTime = $startTime->addMinutes($validated['sks'] * 50); // Misalnya 1 SKS = 50 menit
    
                $jadwal->update([
                    'waktu_akhir' => $newEndTime->format('H:i:s'),
                ]);
            }
        } 

        return response()->json([
            'success' => true,
            'message' => 'Mata kuliah dan jadwal berhasil diperbarui.',
        ]);
    } catch (\Exception $e) {
        \Log::error('Error saat memperbarui mata kuliah:', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan saat memperbarui mata kuliah.',
            'error' => $e->getMessage(),
        ], 500);
    }
}
public function tambahMatkul(Request $request)
{
    try{
    $validated = $request->validate([
        'nama' => 'required|string|max:255',
        'semester' => 'required|integer|min:1|max:8',
        'kode_mk' => 'required|string|unique:mata_kuliah,kode_mk|max:10',
        'sks' => 'required|integer|min:1|max:4',
        'jumlah_kelas' => 'required|integer|min:1|max:10',
        'kuota' => 'required|integer|min:1|max:200',
        'jenis' => 'required|string|in:Wajib,Pilihan',
        'dosen_pengampu' => 'required|array|min:1|max:3', // Maksimal 3 dosen pengampu
        'dosen_pengampu.*' => 'nullable|string|exists:dosen,nip', // Validasi setiap NIP dosen
    ]);

     $existingMatkul = MataKuliah::where('nama', $validated['nama'])
     ->orWhere('kode_mk', $validated['kode_mk'])
     ->exists();

    if ($existingMatkul) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menambahkan mata kuliah! (Nama mata kuliah telah digunakan)',
        ], 422); 
    }

    $mataKuliah = MataKuliah::create([
        'nama' => $validated['nama'],
        'semester' => $validated['semester'],
        'kode_mk' => $validated['kode_mk'],
        'sks' => $validated['sks'],
        'jumlah_kelas' => $validated['jumlah_kelas'],
        'kuota' => $validated['kuota'],
        'jenis' => $validated['jenis'],
        'dosen_nip' => $validated['dosen_pengampu'][0] ?? null,
        'dosen_nip_2' => $validated['dosen_pengampu'][1] ?? null,
        'dosen_nip_3' => $validated['dosen_pengampu'][2] ?? null,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Mata kuliah berhasil ditambahkan.',
        'data' => $mataKuliah,
    ]);
} catch (\Illuminate\Validation\ValidationException $e) {
    // Tangani error validasi
    return response()->json([
        'success' => false,
        'message' => 'Gagal menambahkan mata kuliah! Lengkapi seluruh data.',
        'errors' => $e->errors(), 
    ], 422);
} catch (\Exception $e) {
    return response()->json([
        'success' => false,
        'message' => 'Gagal menambahkan mata kuliah! (Kode mata kuliah telah digunakan)',
        'error' => $e->getMessage(),
    ], 500);
}
}
}
