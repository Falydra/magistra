<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AngkatanPerwalian;

class AngkatanPerwalianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AngkatanPerwalian::insert([
            [
                'pembimbing_id' => 1,  
                'angkatan_perwalian' => '2021',
            ],
            [
                'pembimbing_id' => 1,
                'angkatan_perwalian' => '2022',
            ],
            [
                'pembimbing_id' => 2, 
                'angkatan_perwalian' => '2023',
            ],
            [
                'pembimbing_id' => 2,
                'angkatan_perwalian' => '2024',
            ],
        ]);
    }
}
