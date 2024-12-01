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
        $students = [
            ['nim' => '24060122140114', 'nama' => 'RIZQI WILDAN GILANG ROBBANI'],
            ['nim' => '24060122120015', 'nama' => 'HANIF HEROFA'],
            ['nim' => '24060122130058', 'nama' => 'ABYAN SETYANEVA'],
            ['nim' => '24060122130073', 'nama' => 'BARON ALBANA ACHMAD'],
            ['nim' => '24060122120028', 'nama' => 'SHERLI ARNINDA'],
            ['nim' => '24060122140164', 'nama' => 'AL FERRO PUTRA YUSANDA'],
            ['nim' => '24060122130056', 'nama' => 'M YAQUTA HUSNA'],
            ['nim' => '24060122130092', 'nama' => 'SAUSAN BERLIANA ARRIZQI'],
            ['nim' => '24060122140140', 'nama' => 'DAFFA ALY MEGANENDRA'],
            ['nim' => '24060122140121', 'nama' => 'ROSIDAH RAHMATI'],
            ['nim' => '24060122130082', 'nama' => 'FATHIA RAHMA'],
            ['nim' => '24060122130054', 'nama' => 'AYYUB AL ANSHOR'],
            ['nim' => '24060122130094', 'nama' => 'DAVID CRISTIAN BATUBARA'],
            ['nim' => '24060122130063', 'nama' => 'KEISYA INTAN NABILA'],
            ['nim' => '24060122130046', 'nama' => 'MUHAMMAD IRFAN MURSYID'],
            ['nim' => '24060122140150', 'nama' => 'GIGIH HAIDAR FALAH'],
            ['nim' => '24060122120031', 'nama' => 'BINTANG SYAFRIAN RIZAL'],
            ['nim' => '24060122140138', 'nama' => 'ADZKIYA QARINA SALSABILA'],
            ['nim' => '24060122120009', 'nama' => 'ROSA YOHANA SINAGA'],
            ['nim' => '24060122130088', 'nama' => 'AHLIS DINAL BAHTIAR'],
            ['nim' => '24060122130075', 'nama' => 'REVA YASMIN NAUFALIA'],
            ['nim' => '24060122140153', 'nama' => 'ACHMAD IVAN YUGAVA'],
            ['nim' => '24060122140110', 'nama' => 'SAJID NOUVAL'],
            ['nim' => '24060122140176', 'nama' => 'MANGELEK GABRIEL NICHOLAS TAMBUN'],
            ['nim' => '24060122140162', 'nama' => 'ZAHRA NISAA\' FITRIA NUR\'AFIFAH'],
            ['nim' => '24060122140184', 'nama' => 'RADEN RICO DWIANDA'],
            ['nim' => '24060122140119', 'nama' => 'RAKA MAULANA YUSUF'],
            ['nim' => '24060122130100', 'nama' => 'LAURENTIUS LUCKY ANDRIAWAN BAGASKARA'],
            ['nim' => '24060122140163', 'nama' => 'AULYA SALSABILA KHAIRUNNISA'],
            ['nim' => '24060122140170', 'nama' => 'MOCHAMMAD QAYNAN MAHDAVIQYA'],
            ['nim' => '24060122120039', 'nama' => 'AWANG PRATAMA PUTRA MULYA'],
            ['nim' => '24060122140112', 'nama' => 'MUHAMMAD RAYYIS BUDI PRASETYO'],
            ['nim' => '24060122140127', 'nama' => 'MUHAMMAD MIRZA FAIZ RABBANI'],
            ['nim' => '24060122140149', 'nama' => 'DEMINA AYUNDA CHESARA'],
            ['nim' => '24060122130062', 'nama' => 'HELGA NURUL BHAITI'],
            ['nim' => '24060122140101', 'nama' => 'ZAHIDAN AQILA FAIHA PAB'],
            ['nim' => '24060122140111', 'nama' => 'MUHAMMAD FAHMI'],
            ['nim' => '24060122120007', 'nama' => 'TITAH MOHAMAD SAHPUTRA'],
            ['nim' => '24060122130086', 'nama' => 'THORIQ HADIWINATA'],
        ];

        $years = ['2021', '2022', '2023', '2024'];
        $statuses = [1 => 'Cuti', 2 => 'Aktif'];

        foreach ($students as $index => $student) {
            $user = User::create([
                'name' => $student['nama'],
                'email' => strtolower(str_replace(' ', '.', $student['nama'])) . '@students.undip.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'Mahasiswa',
            ]);

            $tahunMasuk = $years[$index % count($years)];

            Mahasiswa::create([
                'nim' => $student['nim'],
                'nama' => $student['nama'],
                'email' => $user->email,
                'no_telp' => '0812345678' . $index,
                'alamat' => 'Jl. Contoh No.' . ($index + 1),
                'tahun_masuk' => $tahunMasuk,
                'ipk' => number_format(rand(200, 400) / 100, 2), // IPK antara 2.00 - 4.00
                'sksk' => rand(20, 144), // SKS acak
                'kode_prodi' => 6,
                'kode' => $index % 5 == 0 ? 1 : 2, // Lebih banyak status 'Aktif'
                'pembimbing_id' => ($tahunMasuk == '2021' || $tahunMasuk == '2022') ? 1 : 2, // Pembimbing 1 untuk 2021-2022, Pembimbing 2 untuk 2023-2024
                'role' => 'Mahasiswa',
                'user_id' => $user->id,
            ]);
        }
    }
}
