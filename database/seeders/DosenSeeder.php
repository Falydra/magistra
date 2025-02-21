<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\Prodi;


class DosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $kodeFakultas = Fakultas::where('kode_fakultas', '24')->first()->kode_fakultas;
        $prodiList = [
            Prodi::where('kode_prodi', '01')->first(),
            Prodi::where('kode_prodi', '02')->first(),
            Prodi::where('kode_prodi', '03')->first(),
            Prodi::where('kode_prodi', '04')->first(),
            Prodi::where('kode_prodi', '05')->first(),
            Prodi::where('kode_prodi', '06')->first(),
        ];

        //Create a random number of dosen nidn with length 14
        

        

        $dosen = [
            [   'nip' => '1971081119970210040',
                'nidn' => '0011087104',
                'nama' => 'Dr. Aris Sugiharto, S.Si., M.Kom.',
                'nomor_telepon' => '1234567890', 
            ],
            [   'nip' => '199603032024061003',
                'nidn' => '0003039602',
                'nama' => 'Sandy Kurniawan, S.Kom., M.Kom.',
                'nomor_telepon' => '1234567890', 
            ],
            [   'nip' => '197910202006041001',
                'nidn' => '0039108101',
                'nama' => 'Dr. Retno Kusumaningrum, S.Si., M.Kom.',
                'nomor_telepon' => '1234567890',
            ],
            [
                'nip' => '198508162006041003',
                'nidn' => '0045088603',
                'nama' => 'Dr. Eng. Adi Wibowo, M.Kom.',
                'nomor_telepon' => '1234567890',
            ],
            [
                'nip' => '198211252005041002',
                'nidn' => '0028112502',
                'nama' => 'Helmie Arif Wibawa, S.Si., M.Cs.',
                'nomor_telepon' => '1234567890',
            ],

            ['nip' => '197601102009122002',
            'nidn' => '0010017603',
            'nama' => 'Dinar Mutiara Kusumo Nugraheni, S.T., M.InfoTech.(Comp)., Ph.D.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '197404011999031002',
            'nidn' => '0001047404',
            'nama' => 'Dr. Aris Puji Widodo, S.Si., M.T.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '197905242009121003',
            'nidn' => '0024057906',
            'nama' => 'Dr. Sutikno, S.T., M.Cs.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '196511071992031003',
            'nidn' => '0007116503',
            'nama' => 'Drs. Eko Adi Sarwoko, M.Komp.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '197007051997021001',
            'nidn' => '0005077005',
            'nama' => 'Priyo Sidik Sasongko, S.Si., M.Kom.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '197308291998022001',
            'nidn' => '0029087303',
            'nama' => 'Beta Noranita, S.Si., M.Kom.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198009142006041002',
            'nidn' => '0014098003',
            'nama' => 'Edy Suharto, S.T., M.Kom.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198012272015041002',
            'nidn' => '0627128001',
            'nama' => 'Guruh Aryotejo, S.Kom., M.Sc.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '197902122008121002',
            'nidn' => '0012027907',
            'nama' => 'Dr. Indra Waspada, S.T., M.TI.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198903032015042002',
            'nidn' => '0003038907',
            'nama' => 'Khadijah, S.Kom., M.Cs.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198106202015041002',
            'nidn' => '0020068108',
            'nama' => 'Muhammad Malik Hakim, S.T., M.T.I.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '197907202003121002',
            'nidn' => '0020077902',
            'nama' => 'Nurdin Bahtiar, S.Si., M.T.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198803222020121010',
            'nidn' => '0622038802',
            'nama' => 'Prajanto Wahyu Adi, M.Kom.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198010212005011003',
            'nidn' => '0021108002',
            'nama' => 'Ragil Saputra, S.Si., M.Cs.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198511252018032001',
            'nidn' => '0025118503',
            'nama' => 'Rismiyati, B.Eng., M.Cs.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198302032006041002',
            'nidn' => '0003028301',
            'nama' => 'Satriyo Adhy, S.Si., M.T.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '198506302012121001',
            'nidn' => '0030068502',
            'nama' => 'Solikhin, S.Si., M.Sc.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '197805022005012002',
            'nidn' => '0002057811',
            'nama' => 'Sukmawati Nur Endah, S.Si., M.Kom.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '199112092024061001',
            'nidn' => null,
            'nama' => 'Adhe Setya Pramayoga, M.T.',
            'nomor_telepon' => '1234567890',
            ],
  
            ['nip' => 'H.7.198806142022102001',
            'nidn' => null,
            'nama' => 'Yunila Dwi Putri Ariyanti, S.Kom., M.Kom.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => 'H.7.199204252023072001',
            'nidn' => null,
            'nama' => 'Dr. Yeva Fadhilah Ashari, S.Si., M.Si.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => 'H.7.199602212023072001',
            'nidn' => null,
            'nama' => 'Etna Vianita, S.Mat., M.Mat.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '199606132024062001',
            'nidn' => null,
            'nama' => 'Dhena Kamalia Fu\'adi, S.Kom., M.Kom.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '199612272024061001',
            'nidn' => null,
            'nama' => 'Henri Tantyoko, S.Kom., M.Kom.',
            'nomor_telepon' => '1234567890',
            ],
            ['nip' => '199805212024061001',
            'nidn' => null,
            'nama' => 'Satriawan Rasyid Purnama, S.Kom., M.Cs.',
            'nomor_telepon' => '1234567890',
            ],
            [
                'nip' => '19696201999031002',// Kondisi untuk mencari dosen berdasarkan NIP
                'nama' => 'Dr. Ngadiwiyana, S.Si., M.Si.',
                'nidn' => '0009036902',
    
                'nomor_telepon' => '1234567890',
            ]

        ];

        foreach ($dosen as $d) {
            Dosen::create([
                'nip' => $d['nip'],
                'nidn' => $d['nidn'],
                'nama' => $d['nama'],
            
                'kode_prodi' => $prodiList[5]->kode_prodi,
            ]);
        }
    }
}
