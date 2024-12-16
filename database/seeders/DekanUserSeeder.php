<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Dosen;
use App\Models\Kaprodi;
use App\Models\Dekan;
use App\Models\Fakultas;



class DekanUserSeeder extends Seeder
{
    public function run()
    {
        // Create a dekan user using Dosen Nip
        $deosenNip = Dosen::where('nip', '19696201999031002')->first();
        $kode_fakulta = Fakultas::where('kode_fakultas', '24')->first();
        $dekanUser = User::create([
            'name' => 'Dr. Ngadiwiyana, S.Si., M.Si.',
            'email' => 'ngadiwiyana@lecturer.undip.ac.id',
            'password' => Hash::make('ngadi123'),
            'role' => 'dekan',
        ]);

        // Assign the dekan user to the dekan user
    

        // Create a dekan user
        $dekan = Dekan::create([
            'nip' => $deosenNip->nip,
            'tahun_periode' => 2021,
            'kode_fakultas' => $kode_fakulta->kode_fakultas,
            'nama' => 'Dr. Ngadiwiyana, S.Si., M.Si.',
            'user_id' => $dekanUser->id,
        ]);

     

    }
}