<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\IRS;
use App\Models\Mahasiswa;
use Carbon\Carbon;

class IRSController extends Controller
{
    public function approve(Request $request)
    {
        $studentIds = $request->input('student_id');
        
        // Update status IRS mahasiswa hanya jika status saat ini bukan 'Disetujui'
        $updatedStudents = IRS::whereIn('id_mahasiswa', $studentIds)
            ->whereNot('status', 'Disetujui')
            ->update(['status' => 'Disetujui']);
        
        // Ambil kembali data mahasiswa yang sudah diperbarui
        $students = Mahasiswa::with('irs')->whereIn('id', $studentIds)->get();
        
        // Redirect ke halaman PersetujuanIRS setelah sukses
        return Inertia::location('/pembimbing/persetujuanIRS');  // Assuming the route to this page is '/persetujuan-irs'
    }

    public function cancel(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|array|min:1',
            'student_id.*' => 'exists:mahasiswa,id',
        ]);

        IRS::whereIn('id_mahasiswa', $validated['student_id'])->update(['status' => 'Dibatalkan']);

        return Inertia::location('/pembimbing/persetujuanIRS');
    }

    // public function allowChange(Request $request)
    // {
    //     // Validasi bahwa student_ids adalah array
    //     $validated = $request->validate([
    //         'student_id' => 'required|array|min:1', // pastikan ini adalah array
    //         'student_id.*' => 'exists:irs,id', // validasi ID
    //     ]);
    
    //     // Mengambil data IRS berdasarkan ID mahasiswa
    //     $students = IRS::whereIn('id', $validated['student_id'])->get();
    
    //     // Array untuk menyimpan ID yang terlambat
    //     $overdueIds = [];
    
    //     foreach ($students as $irs) {
    //         $tanggalPengisian = Carbon::parse($irs->tanggal_pengisian_irs);
    //         if (Carbon::now()->diffInDays($tanggalPengisian) > 14) {
    //             $overdueIds[] = $irs->id;
    //         }
    //     }
    
    //     // Cek jika ada ID yang melebihi batas waktu
    //     if (count($overdueIds) > 0) {
    //         IRS::whereIn('id', $overdueIds)->update(['status' => 'Izinkan Ubah']);
    //         return response()->json(['message' => 'Izin ubah telah diberikan.']);
    //     }
    
    //     return response()->json(['message' => 'Tidak ada mahasiswa yang melebihi batas waktu.'], 400);
    // }

    // public function updateStatus(Request $request)
    // {
    //     $request->validate([
    //         'student_id' => 'required|exists:mahasiswa,id',
    //         'status' => 'required|in:Belum Disetujui,Disetujui,Dibatalkan,Izinkan Ubah', // Validasi status
    //     ]);

    //     // Update status IRS
    //     $irs = IRS::where('id_mahasiswa', $request->student_id)->first();

    //     if ($irs) {
    //         $irs->status = $request->status;
    //         $irs->save();

    //         // Mengembalikan data mahasiswa setelah status diupdate
    //         return response()->json(['message' => 'Status IRS berhasil diperbarui!'], 200);
    //     }

    //     return response()->json(['message' => 'Data IRS tidak ditemukan!'], 404);
    // }
}
