<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MataKuliah;

use App\Models\Dosen;
use App\Models\Ruang;



class MataKuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $dosenNips = Dosen::pluck('nip')->toArray();
        $kapasitasList = Ruang::pluck('kapasitas')->toArray();

        $mataKuliahList = [
            //Semester 1
            [
                'kode_mk' => 'PAIK6102',
                'nama' => 'Dasar Pemrograman',
                'sks' => 3,
                'semester' => 1,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[0] ?? 45, // Default to 45 if kapasitas is not available
                'dosen_nip' => $dosenNips[0] ?? null,
                'dosen_nip_2' => $dosenNips[1] ?? null,
                'dosen_nip_3' => $dosenNips[2] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6101',
                'nama' => 'Dasar Sistem',
                'sks' => 3,
                'semester' => 1,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 45, // Default to 45 if kapasitas is not available
                'dosen_nip' => $dosenNips[3] ?? null,
                'dosen_nip_2' => $dosenNips[4] ?? null,
                'dosen_nip_3' => $dosenNips[5] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6104',
                'nama' => 'Matematika I',
                'sks' => 2,
                'semester' => 1,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 45,
                'dosen_nip' => $dosenNips[3] ?? null,
                'dosen_nip_2' => $dosenNips[23] ?? null,
                'dosen_nip_3' => $dosenNips[13] ?? null,

            ],
            [
                'kode_mk' => 'PAIK6105',
                'nama' => 'Aljabar Linier',
                'sks' => 3,
                'semester' => 1,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 45,
                'dosen_nip' => $dosenNips[7] ?? null,
                'dosen_nip_2' => $dosenNips[3] ?? null,
                'dosen_nip_3' => $dosenNips[20] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6103',
                'nama' => 'Struktur Diskrit',
                'sks' => 4,
                'semester' => 1,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 45,
                'dosen_nip' => $dosenNips[3] ?? null,
                'dosen_nip_2' => $dosenNips[19] ?? null,
                'dosen_nip_3' => $dosenNips[28] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6107',
                'nama' => 'Bahasa Inggris I',
                'sks' => 1,
                'semester' => 1,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 45,
                'dosen_nip' => $dosenNips[22] ?? null,
                'dosen_nip_2' => $dosenNips[3] ?? null,
                'dosen_nip_3' => $dosenNips[13] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6004',
                'nama' => 'Bahasa Indonesia',
                'sks' => 2,
                'semester' => 1,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 45,
                'dosen_nip' => $dosenNips[25] ?? null,
                'dosen_nip_2' => $dosenNips[3] ?? null,
                'dosen_nip_3' => $dosenNips[23] ?? null,
            ],
            [
                'kode_mk' => 'UUW00005',
                'nama' => 'Olahraga',
                'sks' => 2,
                'semester' => 1,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 45,
                'dosen_nip' => $dosenNips[25] ?? null,
                'dosen_nip_2' => $dosenNips[3] ?? null,
                'dosen_nip_3' => $dosenNips[2] ?? null,
            ],

            // Semester 2
            [
                'kode_mk' => 'PAIK6201',
                'nama' => 'Matematika II',
                'sks' => 2,
                'semester' => 2,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[25] ?? null,
                'dosen_nip_2' => $dosenNips[39] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6202',
                'nama' => 'Algoritma dan Pemrograman',
                'sks' => 4,
                'semester' => 2,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[8] ?? null,
                'dosen_nip_2' => $dosenNips[11] ?? null,
                'dosen_nip_3' => $dosenNips[28] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6203',
                'nama' => 'Organisasi dan Arsitektur Komputer',
                'sks' => 3,
                'semester' => 2,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[22] ?? null,
                'dosen_nip_2' => $dosenNips[10] ?? null,
                'dosen_nip_3' => $dosenNips[13] ?? null,
            ],
           
            [
                'kode_mk' => 'UUW00004',
                'nama' => 'Bahasa Indonesia',
                'sks' => 2,
                'semester' => 2,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[22] ?? null,
                'dosen_nip_2' => $dosenNips[64] ?? null,
                'dosen_nip_3' =>  null,
            ],
            [
                'kode_mk' => 'UUW00006',
                'nama' => 'Internet of Things (IoT)',
                'sks' => 2,
                'semester' => 2,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[12] ?? null,
                'dosen_nip_2' => $dosenNips[29] ?? null,
                'dosen_nip_3' => $dosenNips[26] ?? null,
            ],
            [
                'kode_mk' => 'UUW00011',
                'nama' => 'Pendidikan Agama Islam',
                'sks' => 2,
                'semester' => 2,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[7] ?? null,
                'dosen_nip_2' => $dosenNips[45] ?? null,
                'dosen_nip_3' => null,
            ],

            // Semester 3
            [
                'kode_mk' => 'PAIK6301',
                'nama' => 'Struktur Data',
                'sks' => 4,
                'semester' => 3,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[3] ?? null,
                'dosen_nip_2' => $dosenNips[14] ?? null,
                'dosen_nip_3' => $dosenNips[17] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6303',
                'nama' => 'Basis Data',
                'sks' => 4,
                'semester' => 3,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[13] ?? null,
                'dosen_nip_2' => $dosenNips[23] ?? null,
                'dosen_nip_3' => $dosenNips[17] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6302',
                'nama' => 'Sistem Operasi',
                'sks' => 3,
                'semester' => 3,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[21] ?? null,
                'dosen_nip_2' => $dosenNips[11] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6305',
                'nama' => 'Interaksi Manusia dan Komputer',
                'sks' => 3,
                'semester' => 3,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[11] ?? null,
                'dosen_nip_2' => $dosenNips[8] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6304',
                'nama' => 'Metode Numerik',
                'sks' => 3,
                'semester' => 3,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[12] ?? null,
                'dosen_nip_2' => $dosenNips[19] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6306',
                'nama' => 'Statistika',
                'sks' => 2,
                'semester' => 3,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[4] ?? null,
                'dosen_nip_5' => $dosenNips[5] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],

            // Semester 4
            [
                'kode_mk' => 'PAIK6401',
                'nama' => 'Pemrograman Berorientasi Objek',
                'sks' => 3,
                'semester' => 4,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[14] ?? null,
                'dosen_nip_2' => $dosenNips[17] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6402',
                'nama' => 'Jaringan Komputer',
                'sks' => 3,
                'semester' => 4,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[15] ?? null,
                'dosen_nip_2' => $dosenNips[16] ?? null,
                'dosen_nip_3' => $dosenNips[18] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6403',
                'nama' => 'Manajemen Basis Data',
                'sks' => 3,
                'semester' => 4,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[14] ?? null,
                'dosen_nip_2' => $dosenNips[13] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6404',
                'nama' => 'Grafika dan Komputasi Visual',
                'sks' => 3,
                'semester' => 4,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[3] ?? null,
                'dosen_nip_2' => $dosenNips[7] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6405',
                'nama' => 'Rekayasa Perangkat Lunak',
                'sks' => 3,
                'semester' => 4,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[9] ?? null,
                'dosen_nip_2' => $dosenNips[23] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6406',
                'nama' => 'Sistem Cerdas',
                'sks' => 3,
                'semester' => 4,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[4] ?? null,
                'dosen_nip_2' => $dosenNips[7] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],

            // Semester 5
            [
                'kode_mk' => 'PAIK6501',
                'nama' => 'Pengembangan Berbasis Platform',
                'sks' => 4,
                'semester' => 5,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[4] ?? null,
                'dosen_nip_2' => $dosenNips[26] ?? null,
                'dosen_nip_3' => $dosenNips[28] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6502',
                'nama' => 'Komputasi Tersebar Paralel',
                'sks' => 3,
                'semester' => 5,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[15] ?? null,
                'dosen_nip_2' => $dosenNips[26] ?? null,
                'dosen_nip_3' => $dosenNips[6] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6503',
                'nama' => 'Sistem Informasi',
                'sks' => 3,
                'semester' => 5,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[4] ?? null,
                'dosen_nip_2' => $dosenNips[26] ?? null,
                'dosen_nip_3' => $dosenNips[28] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6504',
                'nama' => 'Proyek Perangkat Lunak',
                'sks' => 3,
                'semester' => 5,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[8] ?? null,
                'dosen_nip_2' => $dosenNips[9] ?? null,
                'dosen_nip_3' => $dosenNips[27] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6505',
                'nama' => 'Pembelajaran Mesin',
                'sks' => 3,
                'semester' => 5,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[5] ?? null,
                'dosen_nip_2' => $dosenNips[22] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6506',
                'nama' => 'Keamanan dan Jaminan Informasi',
                'sks' => 3,
                'semester' => 5,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[15] ?? null,
                'dosen_nip_2' => $dosenNips[27] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'UUW00008',
                'nama' => 'Kewirausahaan',
                'sks' => 2,
                'semester' => 5,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[9] ?? null,
                'dosen_nip_2' => $dosenNips[20] ?? null,
                'dosen_nip_3' => $dosenNips[23] ?? null,
            ],

            // Semester 6
            [
                'kode_mk' => 'PAIK6601',
                'nama' => 'Analisis dan Strategi Algoritma',
                'sks' => 3,
                'semester' => 6,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[4] ?? null,
                'dosen_nip_5' => $dosenNips[6] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6602',
                'nama' => 'Uji Perangkat Lunak',
                'sks' => 3,
                'semester' => 6,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[19] ?? null,
                'dosen_nip_2' => $dosenNips[26] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6603',
                'nama' => 'Masyarakat dan Etika Profesi',
                'sks' => 3,
                'semester' => 6,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[20] ?? null,
                'dosen_nip_2' => $dosenNips[12] ?? null,
                'dosen_nip_3' => $dosenNips[18] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6604',
                'nama' => 'Praktik Kerja Lapangan',
                'sks' => 3,
                'semester' => 6,
                'jenis' => 'Wajib',
                'kuota' => 250,

                'dosen_nip' => $dosenNips[4] ?? null,
                'dosen_nip_2' => $dosenNips[3] ?? null,
                'dosen_nip_3' => $dosenNips[23] ?? null,
           ],
            [
                'kode_mk' => 'PAIK6605',
                'nama' => 'Manajemen Proyek',
                'sks' => 3,
                'semester' => 6,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[13] ?? null,
                'dosen_nip_2' => $dosenNips[8] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
           ],

            // Semester 7
            [
                'kode_mk' => 'PAIK6701',
                'nama' => 'Metodologi Penelitian dan Penulisan Ilmiah',
                'sks' => 2,
                'semester' => 7,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[5] ?? null,
                'dosen_nip_2' => $dosenNips[20] ?? null,
                'dosen_nip_3' => $dosenNips[6] ?? null,

            ],
            [
                'kode_mk' => 'PAIK6702',
                'nama' => 'Teori Bahasa dan Otomata',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Wajib',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[21] ?? null,
                'dosen_nip_2' => $dosenNips[29] ?? null,
                'dosen_nip_3' => $dosenNips[12] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6703',
                'nama' => 'Metode Perangkat Lunak',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[9] ?? null,
                'dosen_nip_2' => $dosenNips[14] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6704',
                'nama' => 'Kualitas Perangkat Lunak',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[9] ?? null,
                'dosen_nip_2' => $dosenNips[26] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6705',
                'nama' => 'Pemodelan dan Simulasi',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[15] ?? null,
                'dosen_nip_2' => $dosenNips[30] ?? null,
                'dosen_nip_3' => $dosenNips[20] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6706',
                'nama' => 'Visi Komputer',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[3] ?? null,
                'dosen_nip_5' => $dosenNips[6] ?? null,
                'dosen_nip_3' => $dosenNips[11] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6707',
                'nama' => 'Audit Sistem Informasi',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 45,
                'dosen_nip' => $dosenNips[13] ?? null,
                'dosen_nip_2' => $dosenNips[8] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6708',
                'nama' => 'Penambangan Data',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[16] ?? null,
                'dosen_nip_2' => $dosenNips[19] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6709',
                'nama' => 'Sistem Tertanam',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[16] ?? null,
                'dosen_nip_2' => $dosenNips[23] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6710',
                'nama' => 'Algoritma Evolusioner',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[10] ?? null,
                'dosen_nip_2' => $dosenNips[22] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6711',
                'nama' => 'Komputasi Lunak',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 50,
                'dosen_nip' => $dosenNips[20] ?? null,
                'dosen_nip_2' => $dosenNips[12] ?? null,
                'dosen_nip_3' => $dosenNips[17] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6712',
                'nama' => 'Temu Balik Informasi',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 45,
                'dosen_nip' => $dosenNips[5] ?? null,
                'dosen_nip_2' => null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
           ],

            // Semester 8
            [
                'kode_mk' => 'PAIK6801',
                'nama' => 'Topik Khusus RPL & STI',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[8] ?? null,
                'dosen_nip_2' => $dosenNips[19] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
           ],
            [
                'kode_mk' => 'PAIK6802',
                'nama' => 'Topik Khusus SC & KG',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[7] ?? null,
                'dosen_nip_2' => $dosenNips[10] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6803',
                'nama' => 'Evolusi Perangkat Lunak',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[27] ?? null,
                'dosen_nip_2' => $dosenNips[14] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6804',
                'nama' => 'Rekayasa Sistem',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[8] ?? null,
                'dosen_nip_2' => $dosenNips[26] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6805',
                'nama' => 'Komputasi Awan',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[26] ?? null,
                'dosen_nip_2' => $dosenNips[27] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6806',
                'nama' => 'Arsitektur Perangkat Lunak',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[27] ?? null,
                'dosen_nip_2' => $dosenNips[14] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'PAIK6807',
                'nama' => 'Pemrograman Lanjut',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[14] ?? null,
                'dosen_nip_2' => $dosenNips[26] ?? null,
                'dosen_nip_3' => $dosenNips[6] ?? null,

            ],
            [
                'kode_mk' => 'PAIK6808',
                'nama' => 'Pengenalan Pola',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[11] ?? null,
                'dosen_nip_2' => $dosenNips[13] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,


            ],
            [
                'kode_mk' => 'PAIK6809',
                'nama' => 'Kriptografi',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[15] ?? null,
                'dosen_nip_2' => $dosenNips[20] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,

            ],
            [
                'kode_mk' => 'PAIK6810',
                'nama' => 'Bioinformatika',
                'sks' => 3,
                'semester' => 8,
                'jenis' => 'Pilihan',

                'kuota' => $kapasitasList[1] ?? 30,
                'dosen_nip' => $dosenNips[6] ?? null,
                'dosen_nip_2' => $dosenNips[17] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,

            ],

            [
                'kode_mk' => 'PAIK6821',
                'nama' => 'Tugas Akhir',
                'sks' => 6,
                'semester' => 8,
                'jenis' => 'Wajib',
                'kuota' => 250,

                'dosen_nip' => $dosenNips[19] ?? null,
                'dosen_nip_2' => $dosenNips[23] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],
            [
                'kode_mk' => 'UUW00009',
                'nama' => 'Kuliah Kerja Nyata (KKN)',
                'sks' => 3,
                'semester' => 7,
                'jenis' => 'Wajib',
                'kuota' => 250,

                'dosen_nip' => $dosenNips[23] ?? null,
                'dosen_nip_2' => $dosenNips[22] ?? null,
                'dosen_nip_3' => $dosenNips[3] ?? null,
            ],

        ];   
        // Tambahkan atribut 'jumlah_kelas' dengan default 4
        foreach ($mataKuliahList as &$mataKuliah) {
            $mataKuliah['jumlah_kelas'] = 4;
        }
        // Insert ke database
        MataKuliah::insert($mataKuliahList);
    }
}