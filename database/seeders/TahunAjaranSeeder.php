<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TahunAjaran;

class TahunAjaranSeeder extends Seeder
{
    public function run()
    {
        TahunAjaran::insert([
            ['tahun' => '2021/2022', 'periode' => 'ganjil'],
            ['tahun' => '2021/2022', 'periode' => 'genap'],
            ['tahun' => '2022/2023', 'periode' => 'ganjil'],
            ['tahun' => '2022/2023', 'periode' => 'genap'],
            ['tahun' => '2023/2024', 'periode' => 'ganjil'],
            ['tahun' => '2023/2024', 'periode' => 'genap'],
            ['tahun' => '2024/2025', 'periode' => 'ganjil'],
        ]);
    }
}
