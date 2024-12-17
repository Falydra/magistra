<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IRS;
use Inertia\Inertia;
use App\Models\Mahasiswa;
use Illuminate\Support\Facades\Log;
class DetailMahasiswaController extends Controller
{
    // Setujui IRS
    public function approveIRS(Request $request, $id)
    {
        $validated = $request->validate([
            'semester' => 'required|integer', 
        ]);
    
        $mahasiswa = Mahasiswa::findOrFail($id);
    
        $irs = $mahasiswa->irs()
            ->where('semester', $validated['semester'])
            ->where('status', '!=', 'Disetujui')
            ->first();
    
        if ($irs) {
            $irs->status = 'Disetujui';
            $irs->save(); 
    
            Log::info('IRS disetujui.', [
                'nim' => $mahasiswa->nim,
                'semester' => $validated['semester'],
                'status' => $irs->status,
            ]);
        } else {
            Log::warning('IRS tidak ditemukan atau sudah disetujui.', [
                'nim' => $mahasiswa->nim,
                'semester' => $validated['semester'],
            ]);
        }
    
        return Inertia::location(route('pembimbing.detailMahasiswa', ['id' => $mahasiswa->id]));
    }
    // Batalkan IRS
    public function cancelIRS(Request $request, $id)
    {
        $validated = $request->validate([
            'semester' => 'required|integer', 
        ]);
    
        $mahasiswa = Mahasiswa::findOrFail($id);
    
        $irs = $mahasiswa->irs()
            ->where('semester', $validated['semester'])
            ->where('status', '!=', 'Dibatalkan')
            ->first();
    
        if ($irs) {
            $irs->status = 'Dibatalkan';
            $irs->save(); 
    
            Log::info('IRS dibatalkan.', [
                'nim' => $mahasiswa->nim,
                'semester' => $validated['semester'],
                'status' => $irs->status,
            ]);
        } else {
            Log::warning('IRS tidak ditemukan atau sudah dibatalkan.', [
                'nim' => $mahasiswa->nim,
                'semester' => $validated['semester'],
            ]);
        }
    
        return Inertia::location(route('pembimbing.detailMahasiswa', ['id' => $mahasiswa->id]));
    }

    // Izinkan Ubah IRS
    // public function allowEditIRS($mahasiswaId)
    // {
    //     $mahasiswa = Mahasiswa::findOrFail($mahasiswaId);

    //     // Periksa jika IRS mahasiswa ada dan statusnya bukan 'Diperbolehkan Ubah'
    //     if ($mahasiswa->irs && $mahasiswa->irs->status !== 'Diperbolehkan Ubah') {
    //         $mahasiswa->irs->update(['status' => 'Diperbolehkan Ubah']);
    //     }

    //     return redirect()->route('pembimbing.persetujuanIRS')->with('success', 'Perubahan IRS diizinkan.');
    // }
}
