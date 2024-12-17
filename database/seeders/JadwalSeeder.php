<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jadwal;
use App\Models\MataKuliah;
use App\Models\Kelas;
use App\Models\Waktu;
use App\Models\Ruang;
use Carbon\Carbon;

class JadwalSeeder extends Seeder
{
    public function run()
    {
        $mataKuliahList = MataKuliah::all();
        //Pluck kelas to Array
        $kelasList = Kelas::whereIn('kelas', ['A', 'B', 'C', 'D'])->get();
        $waktuList = Waktu::all();
        $ruangList = Ruang::whereIn('kode_gedung', ['A', 'E'])->get();

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        foreach ($mataKuliahList as $mataKuliah) {
            for ($i = 0; $i < 4; $i++) {
                $kelas = $kelasList[$i % count($kelasList)];
                $waktu = $waktuList->random();
                $ruang = $ruangList->random();
                $day = $days[rand(0, 4)];

                // Check for existing schedule
                $existingJadwal = Jadwal::where('kode_mk', $mataKuliah->kode_mk)
                    ->where('hari', $day)
                    ->where('waktu_mulai', $waktu->waktu_mulai)
                    ->where('kode_ruang', $ruang->kode_ruang)
                    ->first();

                // Adjust time if there is an existing schedule
                while ($existingJadwal) {
                 

                    $existingJadwal = Jadwal::where('kode_mk', $mataKuliah->kode_mk)
                        ->where('hari', $day)
                        ->where('waktu_mulai', $waktu->waktu_mulai)
                        ->where('kode_ruang', $ruang->kode_ruang)
                        ->first();
                }

                // Ensure no duplicate class
                $duplicateClass = Jadwal::where('kode_mk', $mataKuliah->kode_mk)
                    ->where('kelas', $kelas->kelas)
                    ->exists();

                if (!$duplicateClass) {
                    Jadwal::create([
                        'kode_mk' => $mataKuliah->kode_mk,
                        'kelas' => $kelas->kelas,
                        'hari' => $day,
                        'waktu_mulai' => $waktu->waktu_mulai,
                     
                        'kode_ruang' => $ruang->kode_ruang,
                    ]);
                }
            }
        }
    }
}