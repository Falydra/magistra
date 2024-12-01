<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ruang;

class RuangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dataRuang = [
            // Gedung A
            ['gedung' => 'A', 
            'kode_ruang' => 'A101', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A102', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A103', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A104', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],

            ['gedung' => 'A', 
            'kode_ruang' => 'A201', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A202', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A203', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A204', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],

            ['gedung' => 'A', 
            'kode_ruang' => 'A301', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A302', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A303', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'A', 
            'kode_ruang' => 'A304', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],

            // Gedung B
            ['gedung' => 'B', 
            'kode_ruang' => 'B101', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B102', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B103', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B104', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],

            ['gedung' => 'B', 
            'kode_ruang' => 'B201', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B202', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B203', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B204', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],

            ['gedung' => 'B', 
            'kode_ruang' => 'B301', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B302', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B303', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'B', 
            'kode_ruang' => 'B304', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],

            // Gedung E
            ['gedung' => 'E', 
            'kode_ruang' => 'E101', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'E', 
            'kode_ruang' => 'E102', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],
            ['gedung' => 'E', 
            'kode_ruang' => 'E103', 
            'kapasitas' => 50, 
            'kode_fakultas' => 1],

        ];

        Ruang::insert($dataRuang);
    }
}
