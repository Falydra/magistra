<?php

namespace Database\Seeders;

use App\Models\IRS;
use App\Models\Mahasiswa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IrsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nimMhs = Mahasiswa::pluck('nim')->toArray();
    
        //Mahasiswa with nim 24060122140140
        $nimDf = Mahasiswa::where('nim', '24060122140140')->value('nim');

        //If semeter < mahasiswa semester with the nim 24060122140140, then statu Sudah Diseujui
        IRS::create([
            'total_sks' => 20,
            'status' => 'Disetujui',
            'semester' => 1,
            'nim'=> $nimDf
        ]);
        IRS::create([
            'total_sks' => 24,
            'status' => 'Disetujui',
            'semester' => 2,
            'nim'=> $nimDf
        ]);
        IRS::create([
            'total_sks' => 24,
            'status' => 'Disetujui',
            'semester' => 3,
            'nim'=> $nimDf
        ]);
        IRS::create([
            'total_sks' => 24,
            'status' => 'Disetujui',
            'semester' => 4,
            'nim'=> $nimDf
        ]);
        IRS::create([
            'total_sks' => 19,
            'status' => 'Disetujui',
            'semester' => 5,
            'nim'=> $nimDf
        ]);
        IRS::create([
            'total_sks' => 20,
            'status' => 'Disetujui',
            'semester' => 6,
            'nim'=> $nimDf
        ]);
        

        IRS::create([
            'total_sks' => 3,
            'status' => 'Belum Disetujui',
            'semester' => 5,
            'nim'=> $nimMhs[1]??null
        ]);
        IRS::create([
            'total_sks' => 3,
            'status' => 'Belum Disetujui',
            'semester' => 5,
            'nim'=> $nimMhs[2]??null
        ]);
        
    }
}
