<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dosen;

class DosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Dosen::insert([
            ['nip' => '1971081119970210040',
            'nidn' => '0011087104',
            'nama' => 'Dr. Aris Sugiharto, S.Si., M.Kom.',
            'nomor_telepon' => '1234567890', 
        ],
        ['nip' => '1971081119970210041',
            'nidn' => '0011087105',
            'nama' => 'Sandy Kurniawan, S.Kom., M.Kom.',
            'nomor_telepon' => '1234567890', 
        ],
        ]);
    }
}
