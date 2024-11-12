<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
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
            'role' => 'kaprodi',
        ]);

        // Create a corresponding kaprodi record
        Kaprodi::create([
            'nama' => 'Dr. Aris Sugiharto, S.Si., M.Kom.',
            'nip' => '1971081119970210040',
            'nidn' => '0011087104',
            'prodi' => 'Informatika',
            'email' => 'arissugiharto@lecturer.undip.ac.id ',	
            'nomor_telepon' => '1234567890',
            'alamat' => 'Jl. Prof. Soedarto, SH Tembalang, Semarang',
            'role' => 'kaprodi',
            'user_id' => $kaprodiUser->id,
        ]);

    }
}
