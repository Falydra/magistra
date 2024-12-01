<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kelas;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kelas::Insert([
            [
                'kelas'=>'A'
            ],
            [
                'kelas'=>'B'
            ],
            [
                'kelas'=>'C'
            ],
            [
                'kelas'=>'D'
            ],
            [
                'kelas'=>'E'
            ],
        ]);
    }
}
