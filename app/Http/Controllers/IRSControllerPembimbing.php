<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\IRS;
use App\Models\Mahasiswa;
use Carbon\Carbon;

class IRSControllerPembimbing extends Controller
{   
    public function approve(Request $request)
    {
        Log::info('Memulai proses persetujuan IRS.', ['request' => $request->all()]);
    
        $validated = $request->validate([
            'students' => 'required|string',
        ]);
    
        $students = json_decode($validated['students'], true);
    
        if (!$students || !is_array($students)) {
            Log::error('Format data students tidak valid.', ['students' => $validated['students']]);
            return redirect()->route('pembimbing.persetujuanIRS')->with('error', 'Format data tidak valid.');
        }
    
        foreach ($students as $student) {
            Log::info('Memproses mahasiswa.', ['nim' => $student['nim'], 'semester' => $student['semester']]);
    
            if (isset($student['nim'], $student['semester'])) {
                $affectedRows = IRS::where('nim', $student['nim'])
                    ->where('semester', $student['semester'])
                    ->where('status', '!=', 'Disetujui') 
                    ->update(['status' => 'Disetujui']);
    
                if ($affectedRows > 0) {
                    Log::info('IRS berhasil disetujui.', ['nim' => $student['nim'], 'semester' => $student['semester']]);
                } else {
                    Log::warning('IRS tidak diperbarui. Mungkin sudah disetujui atau data tidak ditemukan.', ['nim' => $student['nim'], 'semester' => $student['semester']]);
                }
            } else {
                Log::error('Data mahasiswa tidak lengkap.', ['student' => $student]);
            }
        }
    
        Log::info('Proses persetujuan IRS selesai.');
    
        return Inertia::location('/pembimbing/persetujuanIRS');
    }
    
    public function cancel(Request $request)
    {
        Log::info('Memulai proses pembatalan IRS.', ['request' => $request->all()]);
    
        $validated = $request->validate([
            'students' => 'required|string',
        ]);
    
        $students = json_decode($validated['students'], true);
    
        if (!$students || !is_array($students)) {
            Log::error('Format data students tidak valid.', ['students' => $validated['students']]);
            return redirect()->route('pembimbing.persetujuanIRS')->with('error', 'Format data tidak valid.');
        }
    
        foreach ($students as $student) {
            Log::info('Memproses mahasiswa untuk pembatalan.', ['nim' => $student['nim'], 'semester' => $student['semester']]);
    
            if (isset($student['nim'], $student['semester'])) {
                $affectedRows = IRS::where('nim', $student['nim'])
                    ->where('semester', $student['semester'])
                    ->where('status', '!=', 'Dibatalkan') 
                    ->update(['status' => 'Dibatalkan']); 
    
                if ($affectedRows > 0) {
                    Log::info('IRS berhasil dibatalkan.', ['nim' => $student['nim'], 'semester' => $student['semester']]);
                } else {
                    Log::warning('IRS tidak diperbarui. Mungkin sudah dibatalkan atau data tidak ditemukan.', ['nim' => $student['nim'], 'semester' => $student['semester']]);
                }
            } else {
                Log::error('Data mahasiswa tidak lengkap.', ['student' => $student]);
            }
        }
    
        Log::info('Proses pembatalan IRS selesai.');
    
        return Inertia::location('/pembimbing/persetujuanIRS');
    }
    
}
