<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Pembimbing;
use App\Models\User;

class PembimbingUserSeeder extends Seeder
{
    public function run()
    {

        $pembimbing = User::create([
            'name' => '	Sandy Kurniawan, S.Kom., M.Kom.',
            'email' => 'sandy@lecturer.undip.ac.id',
            'password' => Hash::make('sandy123'),
            'role' => 'pembimbing',
        ]);

        Pembimbing::create([
            'nama' => 'Sandy Kurniawan, S.Kom., M.Kom.',
            'nip' => '1234567890',
            'nidn' => '1234567890',
            'prodi' => 'Informatika',
            'email' => 'sandy@lecturer.undip.ac.id',
            'nomor_telepon' => '1234567890',
            'alamat' => 'Jl. Prof. Soedarto, SH Tembalang, Semarang',
            'role' => 'pembimbing',
            'user_id' => $pembimbing->id,
        ]);


    }
}