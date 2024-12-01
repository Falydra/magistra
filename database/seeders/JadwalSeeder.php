<?php

namespace Database\Seeders;

use App\Models\Jadwal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JadwalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Jadwal::insert([
            [
                'id_ruang'=>1,
                'id_kelas'=>1,
                'id_hari'=>1, 
                'id_waktu'=>1,
                'id_mk'=>1,
                'status'=>'Disetujui'
            ],
            [
                'id_ruang'=>2,
                'id_kelas'=>2,
                'id_hari'=>1, 
                'id_waktu'=>2,
                'id_mk'=>2,
                'status'=>'Disetujui'
            ],
            [
                'id_ruang'=>3,
                'id_kelas'=>3,
                'id_hari'=>3, 
                'id_waktu'=>3,
                'id_mk'=>3,
                'status'=>'Disetujui'
            ],
        ]);
    }
}
