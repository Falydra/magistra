<?php

namespace Database\Seeders;

use App\Models\JadwalProdi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Prodi;

class JadwalProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $prodi = Prodi::where('kode_prodi', '06')->first();
        JadwalProdi::insert([
            [
                'kode_jadwal_prodi'=>'JP-GXA2XNFD',
                'kode_prodi'=> $prodi->kode_prodi,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
