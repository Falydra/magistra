<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Waktu;

class WaktuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dataWaktu = [
            ['waktu_mulai' => '07:00'],
            ['waktu_mulai' => '09:40'],
            ['waktu_mulai' => '10:30'],
            
            ['waktu_mulai' => '13:00'],
            ['waktu_mulai' => '15:40'],
            ['waktu_mulai' => '16:30'],

        ];

        Waktu::insert($dataWaktu);
    }
}
