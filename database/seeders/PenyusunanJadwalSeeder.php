<?php

namespace Database\Seeders;

use app\Models\JadwalProdi;
use App\Models\PenyusunanJadwal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PenyusunanJadwalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kode_jadwal = JadwalProdi::pluck('kode_jadwal_prodi')->toArray();
        PenyusunanJadwal::insert([
            [
                'kode_jadwal_prodi'=>$kode_jadwal[0],
                'jadwal_id'=>1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
