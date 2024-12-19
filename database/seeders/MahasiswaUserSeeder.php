<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Mahasiswa;
use App\Models\Prodi;

class MahasiswaUserSeeder extends Seeder
{
    public function run()
    {
        $prodiList = [
            Prodi::where('kode_prodi', '01')->first(),
            Prodi::where('kode_prodi', '02')->first(),
            Prodi::where('kode_prodi', '03')->first(),
            Prodi::where('kode_prodi', '04')->first(),
            Prodi::where('kode_prodi', '05')->first(),
            Prodi::where('kode_prodi', '06')->first(),
        ];

        $students = [
            ['nim' => '24060122140114', 'nama' => 'Rizqi Wildan Gilang Robbani'],
            ['nim' => '24060122120015', 'nama' => 'Hanif Herofa'],
            ['nim' => '24060122130058', 'nama' => 'Abyan Setyaneva'],
            ['nim' => '24060122130073', 'nama' => 'Baron Albana Achmad'],
            ['nim' => '24060122120028', 'nama' => 'Sherli Arninda'],
            ['nim' => '24060122140164', 'nama' => 'Al Ferro Putra Yusanda'],
            ['nim' => '24060122130056', 'nama' => 'M Yaquta Husna'],
            ['nim' => '24060122130092', 'nama' => 'Sausan Berliana Arrizqi'],
            ['nim' => '24060122140121', 'nama' => 'Rosidah Rahmati'],
            ['nim' => '24060122140140', 'nama' => 'Daffa Aly Meganendra'],
            ['nim' => '24060122130082', 'nama' => 'Fathia Rahma'],
            ['nim' => '24060122130054', 'nama' => 'Ayyub Al Anshor'],
            ['nim' => '24060122130094', 'nama' => 'David Cristian Batubara'],
            ['nim' => '24060122130063', 'nama' => 'Keisya Intan Nabila'],
            ['nim' => '24060122130046', 'nama' => 'Muhammad Irfan Mursyid'],
            ['nim' => '24060122140150', 'nama' => 'Gigih Haidar Falah'],
            ['nim' => '24060122120031', 'nama' => 'Bintang Syafrian Rizal'],
            ['nim' => '24060122140138', 'nama' => 'Adzkiya Qarina Salsabila'],
            ['nim' => '24060122120009', 'nama' => 'Rosa Yohana Sinaga'],
            ['nim' => '24060122130088', 'nama' => 'Ahlis Dinal Bahtiar'],
            ['nim' => '24060122130075', 'nama' => 'Reva Yasmin Naufalia'],
            ['nim' => '24060122140153', 'nama' => 'Achmad Ivan Yugava'],
            ['nim' => '24060122140110', 'nama' => 'Sajid Nouval'],
            ['nim' => '24060122140176', 'nama' => 'Mangelek Gabriel Nicholas Tambun'],
            ['nim' => '24060122140162', 'nama' => 'Zahra Nisaa\' Fitria Nur\'afifah'],
            ['nim' => '24060122140184', 'nama' => 'Raden Rico Dwianda'],
            ['nim' => '24060122140119', 'nama' => 'Raka Maulana Yusuf'],
            ['nim' => '24060122130100', 'nama' => 'Laurentius Lucky Andriawan Bagaskara'],
            ['nim' => '24060122140163', 'nama' => 'Aulya Salsabila Khairunnisa'],
            ['nim' => '24060122140170', 'nama' => 'Mochammad Qaynan Mahdaviqya'],
            ['nim' => '24060122120039', 'nama' => 'Awang Pratama Putra Mulya'],
            ['nim' => '24060122140112', 'nama' => 'Muhammad Rayyis Budi Prasetyo'],
            ['nim' => '24060122140127', 'nama' => 'Muhammad Mirza Faiz Rabbani'],
            ['nim' => '24060122140149', 'nama' => 'Demina Ayunda Chesara'],
            ['nim' => '24060122130062', 'nama' => 'Helga Nurul Bhaiti'],
            ['nim' => '24060122140101', 'nama' => 'Zahidan Aqila Faiha Pab'],
            ['nim' => '24060122140111', 'nama' => 'Muhammad Fahmi'],
            ['nim' => '24060122120007', 'nama' => 'Titah Mohamad Sahputra'],
            ['nim' => '24060122130086', 'nama' => 'Thoriq Hadiwinata']
        ];

        $years = ['2021', '2022', '2023', '2024'];
        $statuses = ['100', '000'];

        foreach ($students as $index => $student) {
            $user = User::create([
                'name' => $student['nama'],
                'email' => strtolower(str_replace(' ', '.', $student['nama'])) . '@students.undip.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'mahasiswa',
            ]);

            $tahunMasuk = $years[$index % count($years)];

            $mahasiswa = Mahasiswa::create([
                'nim' => $student['nim'],
                'nama' => $student['nama'],
                'email' => $user->email,
                'no_telp' => '0812345678' . $index,
                'kode_registrasi' => '000',
                'tahun_masuk' => $tahunMasuk,
                'ips' => number_format(rand(200, 400) / 100, 2), // IPK antara 2.00 - 4.00
                'kode_prodi' => $prodiList[5]->kode_prodi,
                'pembimbing_id' => ($tahunMasuk == '2021' || $tahunMasuk == '2022') ? 1 : 2, // Pembimbing 1 untuk 2021-2022, Pembimbing 2 untuk 2023-2024
                'role' => 'mahasiswa',
                'user_id' => $user->id,
            ]);

            // Call the createIRSAndJadwal method
            $mahasiswa->createIRSAndJadwal();
        }
    }
}