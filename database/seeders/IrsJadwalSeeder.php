<?php

namespace Database\Seeders;

use App\Models\IRSJadwal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IrsJadwalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IRSJadwal::create(['id_irs' => 1, 'id_jadwal' => 1]);
        IRSJadwal::create(['id_irs' => 2, 'id_jadwal' => 1]);
        IRSJadwal::create(['id_irs' => 3, 'id_jadwal' => 1]);
    }
}