<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Dosen;
use App\Models\Kaprodi;
use App\Models\Dekan;


class DekanUserSeeder extends Seeder
{
    public function run()
    {
        // Create a dekan user
        $dekanUser = User::create([
            'name' => 'Dr. Ngadiwiyana, S.Si., M.Si.',
            'email' => 'ngadiwiyana@lecturer.undip.ac.id',
            'password' => Hash::make('ngadiwiyana1234'),
            'role' => 'dekan',
        ]);


        $dekanDosen = Dosen::create([
            'nama' => 'Dr. Ngadiwiyana, S.Si., M.Si.',
            'nip' => '19696201999031002',
            'nidn' => '0009036902',
            'kode_prodi' => '06',
            
        ]);

        // Create a corresponding dekan record
        Dekan::create([
            'nama' => 'Dr. Ngadiwiyana, S.Si., M.Si.',
            'tahun_periode' => '2024',
            'kode_fakultas' => '24',
            'nip' => $dekanDosen->nip,
            'user_id' => $dekanUser->id,
        ]);
    }
}