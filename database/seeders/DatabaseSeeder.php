<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            FakultasSeeder::class,
            ProdiSeeder::class,
            GedungSeeder::class,
            RuangSeeder::class,
            AdminUserSeeder::class,
            DosenSeeder::class,
            KaprodiUserSeeder::class,
            PembimbingUserSeeder::class,
            DekanUserSeeder::class,
            StatusRegistrasiSeeder::class,
            MahasiswaUserSeeder::class,
            MataKuliahSeeder::class,
            
        ]);
    }
}
