<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Ruang;
use App\Models\Kelas;
use App\Models\Waktu;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
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
    Log::info('Data yang diterima di backend:', $request->all());

    // Validasi data yang diterima
    $validated = $request->validate([
        'id' => 'nullable|integer|exists:jadwal,id', // ID jika edit
        'ruang' => 'required|string|exists:ruang,kode_ruang',
        'kelas' => 'required|string|exists:kelas,kelas',
        'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
        'waktu_mulai' => 'required|date_format:H:i:s',
        'waktu_akhir' => 'required|date_format:H:i:s|after:waktu_mulai',
        'mata_kuliah' => 'required|string|exists:mata_kuliah,kode_mk',
    ]);

    $currentRoute = Route::currentRouteName(); 
    Log::info('Nama route yang diakses:', ['route_name' => $currentRoute]);
    $mataKuliah = MataKuliah::where('kode_mk', $validated['mata_kuliah'])->first();
    $validated['kode_mk'] = $mataKuliah->kode_mk;
    $validated['mata_kuliah'] = $mataKuliah->nama;

    // 1. Validasi untuk jadwal baru
    if ($currentRoute === 'cekJadwalNew') {
        // 1a) Validasi jadwal sudah terjadwal
        $existingJadwal = Jadwal::where('kelas', $validated['kelas'])
            ->where('kode_mk', $validated['kode_mk'])
            ->exists();

        if ($existingJadwal) {
            return response()->json([
                'success' => false,
                'message' => "{$validated['mata_kuliah']} untuk kelas {$validated['kelas']} telah dijadwalkan.",
            ]);
        }

        // 1a) Validasi konflik ruang dan waktu
        $conflictDetails = Jadwal::where('hari', $validated['hari'])
            ->where('kode_ruang', $validated['ruang'])
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
    // 2. Validasi untuk edit jadwal    
    } elseif ($currentRoute === 'cekJadwalEdit') {
        // 2a) Ruang, hari, waktu bentrok
        $conflictDetails = Jadwal::where('hari', $validated['hari'])
            ->where('kode_ruang', $validated['ruang'])
            ->where(function ($query) use ($validated) {
                $query->where('id', '!=', $validated['id']); // Abaikan jadwal dengan ID yang sedang diedit
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
            'message' => 'Jadwal tersedia untuk diedit!',
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Route tidak valid.',
    ], 400);
}
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
            $jadwal = Jadwal::with(['kelasJadwal', 'waktu', 'ruang', 'mataKuliah.dosenUtama', 'mataKuliah.dosenKedua', 'mataKuliah.dosenKetiga'])->get();        
        
            $formattedJadwal = $jadwal->map(function ($item) {
                return [
                    'id' => $item->id,
                    'hari' => $item->hari,
                    'waktu_mulai' => $item->waktu->waktu_mulai ?? null,
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