<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Ruang;
use App\Models\Kelas;
use App\Models\Waktu;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function checkAvailability(Request $request)
{
    try {
        // Log data mentah yang diterima
        Log::info('Request Data yang diterima:', $request->all());

        // Validasi data
        $validated = $request->validate([
            'ruang' => 'required|string|exists:ruang,kode_ruang',
            'kelas' => 'required|string|exists:kelas,kelas',
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'waktu_mulai' => 'required|date_format:H:i:s',
            'waktu_akhir' => 'required|date_format:H:i',
            'mata_kuliah' => 'required|string|exists:mata_kuliah,nama',
        ]);

        Log::info('Data Validated:', $validated);

        // Konversi data
        $ruang = Ruang::where('kode_ruang', $validated['ruang'])->first();
        $kelas = Kelas::where('kelas', $validated['kelas'])->first();
        $mataKuliah = MataKuliah::where('nama', $validated['mata_kuliah'])->first();

        if (!$ruang || !$kelas || !$mataKuliah) {
            return response()->json(['success' => false, 'message' => 'Data referensi tidak ditemukan.'], 422);
        }

        // 1. Cek jika mata kuliah dan kelas sudah dijadwalkan
        $existingJadwal = Jadwal::where('kelas_id', $kelas->id)
            ->where('matkul_id', $mataKuliah->id)
            ->exists();

        if ($existingJadwal) {
            return response()->json([
                'success' => false,
                'message' => "{$validated['mata_kuliah']} kelas {$validated['kelas']} telah dijadwalkan",
            ]);
        }

        // 2. Cek konflik pada ruang, waktu, dan hari
        $conflictDetails = Jadwal::where('hari', $validated['hari'])
            ->where(function ($query) use ($ruang, $validated) {
                $query->where('ruang_id', $ruang->id)
                    ->where(function ($subQuery) use ($validated) {
                        $subQuery->where('waktu_mulai_id', '<=', $validated['waktu_mulai'])
                            ->where('waktu_akhir', '>=', $validated['waktu_mulai']);
                    });
            })
            ->first();

            if ($conflictDetails) {
                return response()->json([
                    'success' => false,
                    'message' => "Ruang pada jam tersebut telah digunakan",
                ]);
            }

        // Jika semua validasi lolos
        return response()->json([
            'success' => true,
            'message' => 'Jadwal tersedia!',
        ]);

    } catch (\Illuminate\Validation\ValidationException $e) {
        Log::error('Validation Error:', $e->errors());
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        Log::error('Error Exception:', ['error' => $e->getMessage()]);
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

public function store(Request $request)
{
    try {
        // Validasi data input
        $validated = $request->validate([
            'ruang' => 'required|string|exists:ruang,kode_ruang',
            'kelas' => 'required|string|exists:kelas,kelas',
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'waktu_mulai' => 'required|date_format:H:i:s',
            'waktu_akhir' => 'required|date_format:H:i',
            'mata_kuliah' => 'required|string|exists:mata_kuliah,nama',
        ]);

        // Konversi data ke ID
        $ruang = Ruang::where('kode_ruang', $validated['ruang'])->first();
        $kelas = Kelas::where('kelas', $validated['kelas'])->first();
        $waktuMulai = Waktu::where('waktu_mulai', $validated['waktu_mulai'])->first();
        $mataKuliah = MataKuliah::where('nama', $validated['mata_kuliah'])->first();

        if (!$ruang || !$kelas || !$waktuMulai || !$mataKuliah) {
            return response()->json(['success' => false, 'message' => 'Data referensi tidak ditemukan.'], 422);
        }

        // Simpan data ke tabel jadwal
        Jadwal::create([
            'ruang_id' => $ruang->id,
            'kelas_id' => $kelas->id,
            'hari' => $validated['hari'],
            'waktu_mulai_id' => $waktuMulai->id,
            'waktu_akhir' => $validated['waktu_akhir'],
            'matkul_id' => $mataKuliah->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Jadwal berhasil disimpan.',
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal.',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        \Log::error('Error Exception:', ['error' => $e->getMessage()]);
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan saat menyimpan jadwal.',
        ], 500);
    }
}

public function index()
{
    try {
        $jadwal = Jadwal::with(['kelas', 'ruang', 'mataKuliah.dosenUtama', 'mataKuliah.dosenKedua', 'mataKuliah.dosenKetiga'])->get();

        $formattedJadwal = $jadwal->map(function ($item) {
            return [
                'id' => $item->id,
                'hari' => $item->hari,
                'waktu_mulai' => $item->waktuMulai->waktu_mulai ?? null,
                'waktu_akhir' => $item->waktu_akhir,
                'kelas' => $item->kelas->kelas ?? null,
                'ruang' => $item->ruang->kode_ruang ?? null,
                'kode_mk' => $item->mataKuliah->kode_mk ?? null,
                'mata_kuliah' => $item->mataKuliah->nama ?? null,
                'sks' => $item->mataKuliah->sks ?? null,
                'semester' => $item->mataKuliah->semester ?? null,
                'jenis' => $item->mataKuliah->jenis ?? null,
                'kuota' => $item->mataKuliah->kuota ?? null,
                'dosen' => collect([
                    $item->mataKuliah->dosenUtama->nama ?? null,
                    $item->mataKuliah->dosenKedua->nama ?? null,
                    $item->mataKuliah->dosenKetiga->nama ?? null,
                ])->filter()->join(', '),
            ];
        });

        return response()->json(['success' => true, 'data' => $formattedJadwal]);
    } catch (\Exception $e) {
        \Log::error('Error fetching jadwal:', ['error' => $e->getMessage()]);
        return response()->json([
            'success' => false,
            'message' => 'Gagal mengambil data jadwal.',
        ], 500);
    }
}
    /**
     * Display the specified resource.
     */
    // public function show(Jadwal $jadwal)
    // {
    //     return view('jadwal.show', compact('jadwal'));
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Jadwal $jadwal)
    // {
    //     $ruangs = Ruang::all();
    //     $kelas = Kelas::all();
    //     $waktus = Waktu::all();
    //     $mataKuliahs = MataKuliah::all();
    //     $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

    //     return view('jadwal.edit', compact('jadwal', 'ruangs', 'kelas', 'waktus', 'mataKuliahs', 'days'));
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Jadwal $jadwal)
    // {
    //     $validated = $request->validate([
    //         'ruang_id' => 'required|exists:ruang,id',
    //         'kelas_id' => 'required|exists:kelas,id',
    //         'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
    //         'waktu_mulai_id' => 'required|exists:waktu,id',
    //         'waktu_akhir' => 'required|date_format:H:i',
    //         'matkul_id' => 'required|exists:mata_kuliah,id',
    //     ]);

    //     $jadwal->update($validated);

    //     return redirect()->route('jadwal.index')->with('success', 'Jadwal berhasil diperbarui.');
    // }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $jadwal = Jadwal::find($id);

        if (!$jadwal) {
            return response()->json([
                'success' => false,
                'message' => 'Jadwal tidak ditemukan.',
            ], 404);
        }

        // Hapus jadwal
        try {
            $jadwal->delete();

            return response()->json([
                'success' => true,
                'message' => 'Jadwal berhasil dihapus.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus jadwal: ' . $e->getMessage(),
            ], 500);
        }
    }
}