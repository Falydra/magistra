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
                ['kode_prodi' => '01', 'nama' => 'Matematika', 'fakultas_id' => $fakultas1->id,],
                ['kode_prodi' => '02', 'nama' => 'Biologi', 'fakultas_id' => $fakultas1->id,],
                ['kode_prodi' => '03', 'nama' => 'Kimia', 'fakultas_id' => $fakultas1->id,],
                ['kode_prodi' => '04', 'nama' => 'Fisika', 'fakultas_id' => $fakultas1->id,],
                ['kode_prodi' => '05', 'nama' => 'Statistika', 'fakultas_id' => $fakultas1->id,],
                ['kode_prodi' => '06', 'nama' => 'Matematika', 'fakultas_id' => $fakultas1->id,],
            ]);
    }
    }
}
