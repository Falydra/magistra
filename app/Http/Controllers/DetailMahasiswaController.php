<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IRS;
use Inertia\Inertia;
use App\Models\Mahasiswa;

class DetailMahasiswaController extends Controller
{
    // Setujui IRS
    public function approveIRS(Request $request, $id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);

        

        return Inertia::location(route('pembimbing.detailMahasiswa', ['id' => $mahasiswa->id]));
    }
    // Batalkan IRS
    public function cancelIRS($mahasiswaId)
    {
        $mahasiswa = Mahasiswa::findOrFail($mahasiswaId);
        if ($mahasiswa->irs && $mahasiswa->irs->status !== 'Dibatalkan') {
            $mahasiswa->irs->update(['status' => 'Dibatalkan']);
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
