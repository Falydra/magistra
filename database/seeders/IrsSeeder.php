<?php

namespace Database\Seeders;

use App\Models\IRS;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IrsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IRS::create(['id_mahasiswa' => 1, 'id_tahun_ajaran' => 7]);
        IRS::create(['id_mahasiswa' => 2, 'id_tahun_ajaran' => 7]);
        IRS::create(['id_mahasiswa' => 3, 'id_tahun_ajaran' => 7]);
        IRS::create(['id_mahasiswa' => 4, 'id_tahun_ajaran' => 7, 'status' => 'Disetujui']);
    }
}
