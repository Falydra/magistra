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
            DekanUserSeeder::class,
            KaprodiUserSeeder::class,
            PembimbingUserSeeder::class,
            StatusRegistrasiSeeder::class,
            MataKuliahSeeder::class,
            WaktuSeeder::class,
            KelasSeeder::class,
            JadwalSeeder::class,
            MahasiswaUserSeeder::class,
            AngkatanPerwalianSeeder::class,
            JadwalProdiSeeder::class,
            PenyusunanJadwalSeeder::class,
            // IrsSeeder::class,
            IrsJadwalSeeder::class
            
        ]);
    }
}
