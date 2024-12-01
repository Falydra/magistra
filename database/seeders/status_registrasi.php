<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\StatusRegistrasi;

class status_registrasi extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StatusRegistrasi::insert([
            [
                'kode'=>'000',
                'nama' => 'cuti'
            ],
            [
                'kode'=>'100',
                'nama' => 'aktif'
            ],
        ]);
    }
}
