<?php

namespace Database\Seeders;

use App\Models\Waktu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WaktuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Waktu::insert([
            ['waktu_mulai' => '07:00'],
            ['waktu_mulai' => '09:40'],
            ['waktu_mulai' => '10:30'],
            ['waktu_mulai' => '13:00'],
            ['waktu_mulai' => '15:40'],
            ['waktu_mulai' => '16:30'],
        ]);
    }
}
