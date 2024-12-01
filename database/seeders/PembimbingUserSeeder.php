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

        $pembimbing1 = User::create([
            'name' => '	Sandy Kurniawan, S.Kom., M.Kom.',
            'email' => 'sandy@lecturer.undip.ac.id',
            'password' => Hash::make('sandy123'),
            'role' => 'pembimbing',
        ]);

        $pembimbing2 = User::create([
            'name' => 'Dr. Sutikno, S.T., M.Cs.',
            'email' => 'sutikno@lecturer.undip.ac.id',
            'password' => Hash::make('sutikno123'),
            'role' => 'pembimbing',
        ]);

        
        Pembimbing::create([
           
            'nip' => '199603032024061003',
            'role' => 'pembimbing',
            'user_id' => $pembimbing1->id,
        ]);

        Pembimbing::create([
            
            'nip' => '197905242009121003',
            'role' => 'pembimbing',
            'user_id' => $pembimbing2->id,
        ]);
    }
}