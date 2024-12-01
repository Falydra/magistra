<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ruang;
use App\Models\Prodi;
use App\Models\Fakultas;
use App\Models\Gedung;

class RuangSeeder extends Seeder
{
    public function run()
    {
        $RuangData = [
            'A101', 'A102', 'A103', 'A104', 'A105', 'A201', 'A202', 'A203', 'A204', 'A205', 'A301', 'A302', 'A303', 'A304',
            'B101', 'B102', 'B103', 'B104', 'B105', 'B201', 'B202', 'B203', 'B204', 'B205', 'B301', 'B302', 'B303', 'B304', 'B305',
            'C101', 'C102', 'C103', 'C104', 'C105', 'C201', 'C202', 'C203', 'C301', 'C302', 'C303',
            'D101', 'D102', 'D103', 'D104', 'D105', 'D201', 'D202', 'D203', 'D204', 'D205', 'D301', 'D302', 'D303', 'D304',
            'E101', 'E102', 'E103',
            'F101', 'F102', 'F103', 'F104', 'F105', 'F201', 'F202', 'F203', 'F204', 'F205',
            'G201', 'G202', 'G203', 'G204', 'G301', 'G302', 'G303', 'G304',
        ];

       

        // Mapping of kode_gedung to kode_prodi
        

        $kodeFakultas = Fakultas::where('kode_fakultas', '24')->first()->kode_fakultas;
        $prodiList = [
            Prodi::where('kode_prodi', '01')->first(),
            Prodi::where('kode_prodi', '02')->first(),
            Prodi::where('kode_prodi', '03')->first(),
            Prodi::where('kode_prodi', '04')->first(),
            Prodi::where('kode_prodi', '05')->first(),
            Prodi::where('kode_prodi', '06')->first(),
        ];

        $prodiMapping = [
            'A' => $prodiList[0]->kode_prodi,
            'B' => $prodiList[1]->kode_prodi,
            'C' => $prodiList[2]->kode_prodi,
            'D' => $prodiList[3]->kode_prodi,
            'E' => $prodiList[5]->kode_prodi,
            'F' => $prodiList[4]->kode_prodi,
            'G' => $prodiList[4]->kode_prodi,
        ];



        foreach ($RuangData as $kodeRuang) {
            $kodeGedung = substr($kodeRuang, 0, 1); 
            $kodeProdi = $prodiMapping[$kodeGedung]; 
            Ruang::create([
                'kode_ruang' => $kodeRuang,
                'kapasitas' => 50,
                'kode_fakultas' => $kodeFakultas,
                'kode_gedung' => $kodeGedung,
                'kode_prodi' => $kodeProdi,
                'is_verif' => '0',
            ]);
        }
    }
}