<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ruang;

class RuangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ruangan = [
            'a101',
            'a102',
            'a103',
            'a104',
            'a105',
            'a201',
            'a202',
            'a203',
            'a204',
            'a205',
            'a301',
            'a302',
            'a303',
            'a304',

            'b101',
            'b102',
            'b103',
            'b104',
            'b105',
            'b201',
            'b202',
            'b203',
            'b204',
            'b205',
            'b301',
            'b302',
            'b303',
            'b304',
            'b305',

            'c101',
            'c102',
            'c103',
            'c104',
            'c105',
            'c201',
            'c202',
            'c203',
            'c301',
            'c302',
            'c303',

            'd101',
            'd102',
            'd103',
            'd104',
            'd105',
            'd201',
            'd202',
            'd203',
            'd204',
            'd205',
            'd301',
            'd302',
            'd303',
            'd304',

            'e101',
            'e102',
            'e103',

            'f101',
            'f102',
            'f103',
            'f104',
            'f105',
            'f201',
            'f202',
            'f203',
            'f204',
            'f205',

            'g201',
            'g202',
            'g203',
            'g204',
            'g301',
            'g302',
            'g303',
            'g304',
        ];

        foreach ($ruangan as $kode) {
            Ruang::create([
                'kode_ruang' => $kode,
                'kapasitas' => 50,
                'kode_fakultas' => 1, // Replace with the appropriate fakultas ID
            ]);
        }
    }
}