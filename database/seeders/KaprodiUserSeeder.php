<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Dosen;
use App\Models\Kaprodi;
use App\Models\Prodi;


class KaprodiUserSeeder extends Seeder
{
    public function run()
    {
        // Create a kaprodi user
        $prodi = Prodi::where('kode_prodi', '06')->first();
        $dosen = Dosen::where('nip', '1971081119970210040')->first();
        $kaprodiUser = User::create([
            'name' => 'Dr. Aris Sugiharto, S.Si., M.Kom.',
            'email' => 'arissugiharto@lecturer.undip.ac.id',
            'password' => Hash::make('aris1234'),
            'role' => 'kaprodi',
        ]);

        // Create a corresponding kaprodi record
        Kaprodi::create([
            'tahun_periode' => '2024',
            'nip' => $dosen->nip,
            'kode_prodi' => $prodi->kode_prodi,
            'user_id' => $kaprodiUser->id,
        ]);

    }
}
