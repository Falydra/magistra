<?php
// database/seeders/JadwalSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jadwal;
use App\Models\MataKuliah;
use App\Models\Kelas;
use App\Models\Waktu;
use App\Models\Ruang;

class JadwalSeeder extends Seeder
{
    public function run()
    {
        $mataKuliahList = MataKuliah::all();
        $kelasList = Kelas::all();
        $waktuList = Waktu::all();
        $ruangList = Ruang::whereIn('kode_gedung', ['A', 'E'])->get();

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

        foreach ($mataKuliahList as $mataKuliah) {
            for ($i = 0; $i < 4; $i++) {
                $kelas = $kelasList[rand(0, 5)];
                $waktu = $waktuList->random();
                $ruang = $ruangList->random();
                $day = $days[rand(0, 4)];

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