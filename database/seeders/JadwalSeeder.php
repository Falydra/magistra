<?php

namespace Database\Seeders;

use App\Models\Jadwal;
use App\Models\Kelas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Waktu;
use App\Models\MataKuliah;
use App\Models\Ruang;

class JadwalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kelas = Kelas::pluck('kelas')->toArray();
        $mk = MataKuliah::pluck('kode_mk')->toArray();
        $ruang = Ruang::pluck('kode_ruang')->toArray();
        $waktu = [
            Waktu::where('waktu_mulai', '07:00')->first(),
            Waktu::where('waktu_mulai', '09:40')->first(),
            Waktu::where('waktu_mulai', '10:30')->first(),
            Waktu::where('waktu_mulai', '13:00')->first(),
            Waktu::where('waktu_mulai', '15:40')->first(),
            Waktu::where('waktu_mulai', '16:30')->first(),
        ];
        
         //Create more jadwal, each Mata kuliah have 4 Kelas and 4 Different Day, Time. Every 4 Kelas had been added to 1 Mata kuliah, then change to another Mata kuliah
         Jadwal::create([
            'kode_ruang' => $ruang[0],
            'kelas' => $kelas[0],
            'hari' => 'Senin',
           
            'kode_mk' => $mk[0],
            'waktu_mulai' => $waktu[0]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[57],
            'kelas' => $kelas[1],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[0],
            'waktu_mulai' => $waktu[1]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[56],
            'kelas' => $kelas[2],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[0],
            'waktu_mulai' => $waktu[2]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[58],
            'kelas' => $kelas[3],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[0],
            'waktu_mulai' => $waktu[3]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[4],
            'kelas' => $kelas[0],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[1],
            'waktu_mulai' => $waktu[4]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[5],
            'kelas' => $kelas[1],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[1],
            'waktu_mulai' => $waktu[5]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[6],
            'kelas' => $kelas[2],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[1],
            'waktu_mulai' => $waktu[0]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[7],
            'kelas' => $kelas[3],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[1],
            'waktu_mulai' => $waktu[1]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[8],
            'kelas' => $kelas[0],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[2],
            'waktu_mulai' => $waktu[2]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[9],
            'kelas' => $kelas[1],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[2],
            'waktu_mulai' => $waktu[3]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[10],
            'kelas' => $kelas[2],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[2],
            'waktu_mulai' => $waktu[4]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[11],
            'kelas' => $kelas[3],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[2],
            'waktu_mulai' => $waktu[5]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[12],
            'kelas' => $kelas[0],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[3],
            'waktu_mulai' => $waktu[0]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[13],
            'kelas' => $kelas[1],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[3],
            'waktu_mulai' => $waktu[1]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[14],
            'kelas' => $kelas[2],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[3],
            'waktu_mulai' => $waktu[2]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[15],
            'kelas' => $kelas[3],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[3],
            'waktu_mulai' => $waktu[3]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[16],
            'kelas' => $kelas[0],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[4],
            'waktu_mulai' => $waktu[4]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[17],
            'kelas' => $kelas[1],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[4],
            'waktu_mulai' => $waktu[5]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[18],
            'kelas' => $kelas[2],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[4],
            'waktu_mulai' => $waktu[0]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[19],
            'kelas' => $kelas[3],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[4],
            'waktu_mulai' => $waktu[1]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[20],
            'kelas' => $kelas[0],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[5],
            'waktu_mulai' => $waktu[2]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[21],
            'kelas' => $kelas[1],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[5],
            'waktu_mulai' => $waktu[3]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[22],
            'kelas' => $kelas[2],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[5],
            'waktu_mulai' => $waktu[4]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[23],
            'kelas' => $kelas[3],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[5],
            'waktu_mulai' => $waktu[5]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[24],
            'kelas' => $kelas[0],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[6],
            'waktu_mulai' => $waktu[0]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[25],
            'kelas' => $kelas[1],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[6],
            'waktu_mulai' => $waktu[1]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[26],
            'kelas' => $kelas[2],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[6],
            'waktu_mulai' => $waktu[2]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[27],
            'kelas' => $kelas[3],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[6],
            'waktu_mulai' => $waktu[3]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[28],
            'kelas' => $kelas[0],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[7],
            'waktu_mulai' => $waktu[4]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[29],
            'kelas' => $kelas[1],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[7],
            'waktu_mulai' => $waktu[5]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[30],
            'kelas' => $kelas[2],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[7],
            'waktu_mulai' => $waktu[0]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[31],
            'kelas' => $kelas[3],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[7],
            'waktu_mulai' => $waktu[1]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[32],
            'kelas' => $kelas[0],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[8],
            'waktu_mulai' => $waktu[2]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[33],
            'kelas' => $kelas[1],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[8],
            'waktu_mulai' => $waktu[3]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[34],
            'kelas' => $kelas[2],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[8],
            'waktu_mulai' => $waktu[4]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[35],
            'kelas' => $kelas[3],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[8],
            'waktu_mulai' => $waktu[5]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[36],
            'kelas' => $kelas[0],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[9],
            'waktu_mulai' => $waktu[0]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[37],
            'kelas' => $kelas[1],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[9],
            'waktu_mulai' => $waktu[1]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[38],
            'kelas' => $kelas[2],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[9],
            'waktu_mulai' => $waktu[2]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[39],
            'kelas' => $kelas[3],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[9],
            'waktu_mulai' => $waktu[3]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[40],
            'kelas' => $kelas[0],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[10],
            'waktu_mulai' => $waktu[4]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[41],
            'kelas' => $kelas[1],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[10],
            'waktu_mulai' => $waktu[5]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[42],
            'kelas' => $kelas[2],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[10],
            'waktu_mulai' => $waktu[0]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[43],
            'kelas' => $kelas[3],
            'hari' => 'Kamis',
            
            'kode_mk' => $mk[10],
            'waktu_mulai' => $waktu[1]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[44],
            'kelas' => $kelas[0],
            'hari' => 'Jumat',
            
            'kode_mk' => $mk[11],
            'waktu_mulai' => $waktu[2]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[45],
            'kelas' => $kelas[1],
            'hari' => 'Senin',
            
            'kode_mk' => $mk[11],
            'waktu_mulai' => $waktu[3]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[46],
            'kelas' => $kelas[2],
            'hari' => 'Selasa',
            
            'kode_mk' => $mk[11],
            'waktu_mulai' => $waktu[4]->waktu_mulai,
        ]);
        Jadwal::create([
            'kode_ruang' => $ruang[47],
            'kelas' => $kelas[3],
            'hari' => 'Rabu',
            
            'kode_mk' => $mk[11],
            'waktu_mulai' => $waktu[5]->waktu_mulai,
        ]);


        

    }
}