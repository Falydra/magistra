<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\IRS;
use App\Models\Jadwal;
use App\Models\Mahasiswa;
use App\Models\IRSJadwal;
use Illuminate\Http\Request;

class SubmitIRSController extends Controller
{
    public function submitIRS(Request $request)
    {
        $validated = $request->validate([
            'mahasiswa_nim' => 'required|string|exists:mahasiswa,nim',
            'irs_id' => 'required|integer|exists:irs,id',
            'jadwal_ids' => 'required|array', // jadwal_ids harus array
            'jadwal_ids.*' => 'integer|exists:jadwal,id',
        ]);

        $mahasiswa = Mahasiswa::where('nim', $validated['mahasiswa_nim'])->first();
        $irs = IRS::findOrFail($validated['irs_id']);

        if ($irs->nim !== $mahasiswa->nim) {
            return redirect()->back()->withErrors(['error' => 'IRS tidak sesuai dengan NIM mahasiswa.']);
        }

        $selectedJadwals = Jadwal::whereIn('id', $validated['jadwal_ids'])->get();

        // Cek konflik jadwal
        $conflicts = false;
        foreach ($selectedJadwals as $jadwal1) {
            foreach ($selectedJadwals as $jadwal2) {
                if ($jadwal1->id !== $jadwal2->id &&
                    $jadwal1->hari === $jadwal2->hari &&
                    $jadwal1->waktu_mulai < $jadwal2->waktu_akhir &&
                    $jadwal1->waktu_akhir > $jadwal2->waktu_mulai
                ) {
                    $conflicts = true;
                    break 2;
                }
            }
        }

        if ($conflicts) {
            return redirect()->back()->withErrors(['error' => 'Jadwal bentrok dengan jadwal lain.']);
        }

        // Update IRS status
        $irs->status = 'Diajukan';
        $irs->save();

        foreach ($validated['jadwal_ids'] as $jadwalId) {
            IRSJadwal::firstOrCreate([
                'id_irs' => $irs->id,
                'id_jadwal' => $jadwalId,
            ]);
        }

        return redirect()->route('mahasiswa.checkIRS')->with('success', 'IRS berhasil diajukan ke pembimbing.');
    }
}
