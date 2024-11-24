<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Akademik;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Create an admin user
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create a corresponding akademik record
        Akademik::create([
            'nama' => 'Admin User',
            
            'nomor_telepon' => '1234567890',
            'alamat' => 'Jl. Prof. Soedarto No.13, Tembalang, Kec. Tembalang, Kota Semarang, Jawa Tengah',
            'role' => 'admin',
            'user_id' => $adminUser->id,
        ]);
    }
}