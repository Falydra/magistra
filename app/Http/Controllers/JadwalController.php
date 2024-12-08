<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Ruang;
use App\Models\Kelas;
use App\Models\Waktu;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JadwalController extends Controller
{
    public function getJadwal(Request $request)
{
    $jadwal = Jadwal::query();

    if ($request->has('kelas')) {
        $jadwal->where('kelas', $request->kelas);
    }

    if ($request->has('kode_mk')) {
        $jadwal->where('kode_mk', $request->kode_mk);
    }

    return response()->json([
        'success' => true,
        'data' => $jadwal->get(),
    ]);
}
    public function checkAvailability(Request $request)
{
    try {
        Log::info('Data yang diterima di backend:', $request->all());

        // Validasi data
        $validated = $request->validate([
            'id' => 'nullable|integer|exists:jadwal,id', // ID untuk edit
            'ruang' => 'required|string|exists:ruang,kode_ruang',
            'kelas' => 'required|string|exists:kelas,kelas',
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'waktu_mulai' => 'required|exists:waktu,waktu_mulai',
            'waktu_akhir' => 'required|date_format:H:i:s|after:waktu_mulai',
            'mata_kuliah' => 'required|string|exists:mata_kuliah,kode_mk',
        ]);

        $mataKuliah = MataKuliah::where('kode_mk', $validated['mata_kuliah'])->first();
        if (!$mataKuliah) {
            return response()->json([
                'success' => false,
                'message' => 'Mata kuliah tidak ditemukan.',
            ], 422);
        }
        $validated['kode_mk'] = $mataKuliah->kode_mk;
        $validated['mata_kuliah'] = $mataKuliah->nama;

        // 1. Cek jika mata kuliah dan kelas sudah dijadwalkan, kecuali jika ID sama
        $existingJadwal = Jadwal::where('kelas', $validated['kelas'])
            ->where('kode_mk', $validated['kode_mk'])
            ->when(isset($validated['id']), function ($query) use ($validated) {
                $query->where('id', '!=', $validated['id']); // Abaikan jadwal yang sedang diedit
            })
            ->exists();

        if ($existingJadwal) {
            // Tambahkan log untuk membantu debugging
            Log::info('Existing schedule conflict detected.', [
                'kelas' => $validated['kelas'],
                'kode_mk' => $validated['kode_mk'],
                'ignored_id' => $validated['id'] ?? null,
                'jadwal_conflicts' => Jadwal::where('kelas', $validated['kelas'])
                    ->where('kode_mk', $validated['kode_mk'])
                    ->get() // Ambil semua jadwal yang menyebabkan konflik
                    ->toArray(),
            ]);

            return response()->json([
                'success' => false,
                'message' => "{$validated['mata_kuliah']} untuk kelas {$validated['kelas']} telah dijadwalkan.",
            ]);
        }

        // 2. Cek konflik pada ruang, waktu, dan hari, kecuali jika ID sama
        $conflictDetails = Jadwal::where('hari', $validated['hari'])
            ->where('kode_ruang', $validated['ruang'])
            ->when(isset($validated['id']), function ($query) use ($validated) {
                $query->where('id', '!=', $validated['id']); // Abaikan jadwal yang sedang diedit
            })
            ->where(function ($query) use ($validated) {
                $query->whereBetween('waktu_mulai', [$validated['waktu_mulai'], $validated['waktu_akhir']])
                      ->orWhereBetween('waktu_akhir', [$validated['waktu_mulai'], $validated['waktu_akhir']])
                      ->orWhere(function ($subQuery) use ($validated) {
                          $subQuery->where('waktu_mulai', '<=', $validated['waktu_mulai'])
                                   ->where('waktu_akhir', '>=', $validated['waktu_akhir']);
                      });
            })
            ->exists();

        if ($conflictDetails) {
            return response()->json([
                'success' => false,
                'message' => "Ruang pada jam tersebut telah digunakan.",
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Jadwal tersedia!',
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        Log::error('Validation Error:', $e->errors());
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal!',
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

    // public function store(Request $request)
    // {
    //     try {
    //         // Validasi data input
    //         $validated = $request->validate([
    //             'ruang' => 'required|string|exists:ruang,kode_ruang',
    //             'kelas' => 'required|string|exists:kelas,kelas',
    //             'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
    //             'waktu_mulai' => 'required|date_format:H:i:s|exists:waktu,waktu_mulai',
    //             'waktu_akhir' => 'required|date_format:H:i:s|after:waktu_mulai',
    //             'mata_kuliah' => 'required|string|exists:mata_kuliah,kode_mk',
    //         ]);
        
    //         // Ambil data dari tabel lain
    //         $waktuMulai = Waktu::where('waktu_mulai', $validated['waktu_mulai'])->first();
    //         $ruang = Ruang::where('kode_ruang', $validated['ruang'])->first();
    //         $mataKuliah = MataKuliah::where('kode_mk', $validated['mata_kuliah'])->first();
    //         $kelas = Kelas::where('kelas', $validated['kelas'])->first();
    
    //         if (!$ruang || !$kelas || !$mataKuliah || !$waktuMulai) {
    //             Log::error('Data referensi tidak ditemukan.', [
    //                 'ruang' => $ruang,
    //                 'kelas' => $kelas,
    //                 'mata_kuliah' => $mataKuliah,
    //                 'waktu_mulai' => $waktuMulai,
    //             ]);
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Data referensi tidak ditemukan.',
    //             ], 422);
    //         }
    

    //         Jadwal::create([
    //             'kode_ruang' => $ruang->kode_ruang,
    //             'kelas' => $kelas->kelas, 
    //             'hari' => $validated['hari'],
    //             'waktu_mulai' => $waktuMulai->waktu_mulai, 
    //             'waktu_akhir' => $validated['waktu_akhir'],
    //             'kode_mk' => $mataKuliah->kode_mk,
    //         ]);
    
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Jadwal berhasil disimpan.',
    //         ]);

    //     } catch (\Illuminate\Validation\ValidationException $e) {
    //         Log::error('Validation Error:', $e->errors());
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Validasi gagal!!',
    //             'errors' => $e->errors(),
    //         ], 422);
    //     } catch (\Exception $e) {
    //         Log::error('Error Exception:', ['error' => $e->getMessage()]);
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Terjadi kesalahan saat menyimpan jadwal.',
    //         ], 500);
    //     }
    // }

    public function store(Request $request)
{
    $validated = $request->validate([
        'ruang' => 'required|string|exists:ruang,kode_ruang',
        'kelas' => 'required|string|exists:kelas,kelas',
        'hari' => 'required|string',
        'waktu_mulai' => 'required|date_format:H:i:s',
        'waktu_akhir' => 'required|date_format:H:i:s|after:waktu_mulai',
        'mata_kuliah' => 'required|string|exists:mata_kuliah,kode_mk', // Validasi kode_mk
    ]);
    Log::info('Data diterima di backend (STORE):', $request->all());

    Jadwal::create([
        'kode_ruang' => $validated['ruang'],
        'kelas' => $validated['kelas'],
        'hari' => $validated['hari'],
        'waktu_mulai' => $validated['waktu_mulai'],
        'waktu_akhir' => $validated['waktu_akhir'],
        'kode_mk' => $validated['mata_kuliah'], 
    ]);

    return response()->json(['success' => true, 'message' => 'Jadwal berhasil dibuat.']);
}

    public function index()
    {
        try {
            $jadwal = Jadwal::with(['kelasJadwal', 'waktuMulai', 'ruang', 'mataKuliah.dosenUtama', 'mataKuliah.dosenKedua', 'mataKuliah.dosenKetiga'])->get();        
        
            $formattedJadwal = $jadwal->map(function ($item) {
                return [
                    'id' => $item->id,
                    'hari' => $item->hari,
                    'waktu_mulai' => $item->waktuMulai->waktu_mulai ?? null,
                    'waktu_akhir' => $item->waktu_akhir,
                    'kelas' => $item->kelasJadwal->kelas ?? null,
                    'ruang' => $item->ruang->kode_ruang ?? null,
                    'kode_mk' => $item->mataKuliah->kode_mk ?? 'Tidak tersedia',
                    'mata_kuliah' => $item->mataKuliah->nama ?? 'Tidak tersedia',
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

        \Log::info('Formatted Jadwal:', $formattedJadwal->toArray());

            return response()->json(['success' => true, 'data' => $formattedJadwal]);
        } catch (\Exception $e) {
            \Log::error('Error fetching jadwal:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data jadwal.',
            ], 500);
        }
    }

    public function edit(Request $request)
    {
        // Ambil data yang dibutuhkan untuk dropdown dan form
        $mataKuliah = MataKuliah::all(); 
        $ruang = Ruang::all(); 
        $kelas = Kelas::all();
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        $editData = $request->session()->get('editData', null);

        return inertia('Kaprodi/BuatJadwal', [ // Direct ke halaman React
            'mataKuliah' => $mataKuliah,
            'ruang' => $ruang,
            'kelas' => $kelas,
            'days' => $days,
            'editData' => $editData,
        ]);
    }

    // public function update(Request $request)
    // {
    //     $validated = $request->validate([
    //         'kelas' => 'required|string',
    //         'hari' => 'required|string',
    //         'ruang' => 'required|string',
    //         'waktu_mulai' => 'required|date_format:H:i',
    //         'waktu_akhir' => 'required|date_format:H:i|after:waktu_mulai',
    //         'kode_mk' => 'required|string|exists:mata_kuliah,kode_mk',
    //     ]);
    
    //     $jadwal = Jadwal::where('kode_mk', $validated['kode_mk'])
    //         ->where('kelas', $validated['kelas'])
    //         ->first();
    
    //     if (!$jadwal) {
    //         return response()->json(['success' => false, 'message' => 'Jadwal tidak ditemukan.'], 404);
    //     }
    
    //     $jadwal->update($validated);
    
    //     return response()->json(['success' => true, 'message' => 'Jadwal berhasil diperbarui.']);
    // }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer|exists:jadwal,id',
            'ruang' => 'required|string|exists:ruang,kode_ruang',
            'kelas' => 'required|string|exists:kelas,kelas',
            'hari' => 'required|string',
            'waktu_mulai' => 'required|date_format:H:i:s',
            'waktu_akhir' => 'required|date_format:H:i:s|after:waktu_mulai',
            'mata_kuliah' => 'required|string|exists:mata_kuliah,kode_mk', 
        ]);
    
        $jadwal = Jadwal::find($validated['id']);
        if (!$jadwal) {
            return response()->json(['success' => false, 'message' => 'Jadwal tidak ditemukan.'], 404);
        }
    
        $jadwal->update([
            'kode_ruang' => $validated['ruang'],
            'kelas' => $validated['kelas'],
            'hari' => $validated['hari'],
            'waktu_mulai' => $validated['waktu_mulai'],
            'waktu_akhir' => $validated['waktu_akhir'],
            'kode_mk' => $validated['mata_kuliah'], // Map correctly
        ]);
    
        return response()->json(['success' => true, 'message' => 'Jadwal berhasil diperbarui.']);
    }

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