<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Dosen;
use App\Models\Kaprodi;


class KaprodiUserSeeder extends Seeder
{
    public function run()
    {
        // Create a kaprodi user
        $kaprodiUser = User::create([
            'name' => 'Dr. Aris Sugiharto, S.Si., M.Kom.',
            'email' => 'arissugiharto@lecturer.undip.ac.id ',
            'password' => Hash::make('aris1234'),
            // 'role' => 'kaprodi',
        ]);

        // Create a corresponding kaprodi record
        Kaprodi::create([
            'tahun_periode' => '2024',
            'prodi_id' => 6,
            'dosen_id' => 1,
            'user_id' => $kaprodiUser->id,
        ]);

    }
}
