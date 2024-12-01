<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gedung;
use App\Models\Fakultas;
use App\Models\Prodi;

class GedungSeeder extends Seeder
{
    public function run()
    {
        $fakultas1 = Fakultas::where('kode_fakultas', '24')->first();
        $prodiList = [
            Prodi::where('kode_prodi', '01')->first(),
            Prodi::where('kode_prodi', '02')->first(),
            Prodi::where('kode_prodi', '03')->first(),
            Prodi::where('kode_prodi', '04')->first(),
            Prodi::where('kode_prodi', '05')->first(),
            Prodi::where('kode_prodi', '06')->first(),
        ];

        $gedungData = [
            ['kode_gedung' => 'A', 'kode_prodi' => '01'],
            ['kode_gedung' => 'B', 'kode_prodi' => '02'],
            ['kode_gedung' => 'C', 'kode_prodi' => '03'],
            ['kode_gedung' => 'D', 'kode_prodi' => '04'],
            ['kode_gedung' => 'F', 'kode_prodi' => '05'],
            ['kode_gedung' => 'G', 'kode_prodi' => '05'],
            ['kode_gedung' => 'E', 'kode_prodi' => '06'],
        ];

        if ($fakultas1) {
            foreach ($gedungData as $gedung) {
                $prodi = Prodi::where('kode_prodi', $gedung['kode_prodi'])->first();
                if ($prodi) {
                    Gedung::insert([
                        [
                            'kode_gedung' => $gedung['kode_gedung'],
                            'nama' => 'Gedung ' . $gedung['kode_gedung'],
                            'kode_fakultas' => $fakultas1->kode_fakultas,
                            'kode_prodi' => $prodi->kode_prodi,
                        ],
                    ]);
                }
            }
        }
    }
}