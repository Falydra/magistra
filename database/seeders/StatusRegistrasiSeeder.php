<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StatusRegistrasi;


class StatusRegistrasiSeeder extends Seeder
{
    public function run()
    {
        //Kode 100 for 'Aktif' and 000 for Cuti
        StatusRegistrasi::Insert([
            ['kode_registrasi' => '100', 'nama' => 'Aktif'],
            ['kode_registrasi' => '000', 'nama' => 'Cuti'],
        ]);
    }
}