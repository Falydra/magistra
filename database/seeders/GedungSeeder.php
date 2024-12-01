<?php

namespace Database\Seeders;

use App\Models\Gedung;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GedungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Gedung::insert([
            [
                'kode_gedung'=>'A'
            ],
            [
                'kode_gedung'=>'B'
            ],
            [
                'kode_gedung'=>'C'
            ],
            [
                'kode_gedung'=>'D'
            ],
            [
                'kode_gedung'=>'E'
            ],
            [
                'kode_gedung'=>'F'
            ],
            [
                'kode_gedung'=>'G'
            ],
            [
                'kode_gedung'=>'K'
            ],
        ]);
    }
}
