<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MataKuliah;


class MatakuliahSeeder extends Seeder
{
    public function run()
    {
        // Create an admin user
        $matakuliah = MataKuliah::create([
            'kode' => 'TIF123',
            'nama' => 'Pemrograman Web',
            'sks' => 3,
            'semester' => 3,
        ]);
    }
}