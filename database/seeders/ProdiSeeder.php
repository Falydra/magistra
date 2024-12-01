<?php

namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use App\Models\Prodi;  
use App\Models\Fakultas; 

class ProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
 public function run(): void
    {
        $fakultas1 = Fakultas::where('kode_fakultas', '24')->first(); 

        if ($fakultas1) {

            Prodi::insert([
                ['kode_prodi' => '01', 'nama' => 'Matematika', 'kode_fakultas' => '24',],
                ['kode_prodi' => '02', 'nama' => 'Biologi', 'kode_fakultas' => '24',],
                ['kode_prodi' => '03', 'nama' => 'Kimia', 'kode_fakultas' => '24',],
                ['kode_prodi' => '04', 'nama' => 'Fisika', 'kode_fakultas' => '24',],
                ['kode_prodi' => '05', 'nama' => 'Statistika', 'kode_fakultas' => '24',],
                ['kode_prodi' => '06', 'nama' => 'Informatika', 'kode_fakultas' => '24',],
            ]);
    }
    }
}
