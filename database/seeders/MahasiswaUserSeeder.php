<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Mahasiswa;


class MahasiswaUserSeeder extends Seeder
{
    public function run()
    {
        $mahasiswaUser = User::create([
            'name' => 'Daffa Aly Meganendra',
            'email' => 'daffa.meganendra@students.undip.ac.id',
            'password' => Hash::make('daffa123'),
            'role' => 'Mahasiswa',	 
        ]);

        Mahasiswa::create([
            'nama' => 'Daffa Aly Meganendra',
            'nim' => '24060122140140',
            'email' => 'daffa.meganendra@students.undip.ac.id',
            'nomor_telepon' => '1234567890',
            'alamat' => 'Jl. Mulawarman Timur 6 No.9',
            'role' => 'Mahasiswa',
            'status' => 'Aktif',
            'tahun_masuk' => '2022',
            'semester' => '3',
            'ipk' => '4',
            'prodi' => 'Informatika',
            'user_id' => $mahasiswaUser->id,
        ]);


    }
}