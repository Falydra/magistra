import PersetujuanIRSLayout from "@/Layouts/PersetujuanIRSLayout";
import { RuangProps, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import TextInput from "@/Components/TextInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import  { Inertia }  from "@inertiajs/inertia";


interface DummyDataProps {
    id: number;
    name: string;
    email: string;
    instansi: string;
    no_hp: string;
    bukti_bayar: string | null;
    twibbon: string | null;
    is_verif: string;
}


interface GedungProps {
    id: number;
    name: string;
    kapasitas: number;
    is_available: boolean;
    
}


interface ProdiProps {
    id: number;
    kode_prodi: string;
    nama: string;
    kode_fakultas: string;
}

interface PaginationProps extends PageProps {
    ruang: {
        data: RuangProps[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };

    
}


export default function AlokasiRuang({auth} : RuangProps ) {
    const {url} = usePage().props;
    const { ruang } = usePage<PaginationProps>().props;

    const handlePageChange = (url: string | null) => {
        if (url) {
            Inertia.get(url); // Navigasi ke halaman
        }
    };



    
    

    const [dummyData, setDummyData] = useState<DummyDataProps[]>([
        { id: 1, name: 'Alice', email: 'alice@example.com', instansi: 'Instansi A', no_hp: '123456789', bukti_bayar: null, twibbon: null, is_verif: '0' },
        { id: 2, name: 'Bob', email: 'bob@example.com', instansi: 'Instansi B', no_hp: '987654321', bukti_bayar: 'https://example.com/bukti_bayar1', twibbon: 'https://example.com/twibbon1', is_verif: '1' }
    ]);


    const [gedungData, setGedungData] = useState<GedungProps[]>([
        { id: 1, name: 'A', kapasitas: 100, is_available: true },
        { id: 2, name: 'B', kapasitas: 50, is_available: false },
        { id: 3, name: 'C', kapasitas: 75, is_available: true },
        { id: 4, name: 'D', kapasitas: 60, is_available: false },
        { id: 5, name: 'E', kapasitas: 90, is_available: true },
        { id: 6, name: 'F', kapasitas: 70, is_available: false }
    ]);

    const [prodiData, setProdiData] = useState<ProdiProps[]>([
        { id: 1, kode_prodi: '01', nama: 'Matematika', kode_fakultas: '1' },
        { id: 2, kode_prodi: '02', nama: 'Biologi', kode_fakultas: '1' },
        { id: 3, kode_prodi: '03', nama: 'Kimia', kode_fakultas: '1' },
        { id: 4, kode_prodi: '04', nama: 'Fisika', kode_fakultas: '1' },
        { id: 5, kode_prodi: '05', nama: 'Statistika', kode_fakultas: '1' },
        { id: 6, kode_prodi: '06', nama: 'Informatika', kode_fakultas: '1' }
    ]);

    const [filter, setFilter] = useState<string>('');
    const [filteredProdi, setFilteredProdi] = useState<ProdiProps[]>([]);
    const [filteredGedung, setFilteredGedung] = useState<GedungProps[]>([]);
    
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilter(value);
        setFilteredProdi(prodiData.filter(prodi => prodi.nama.toLowerCase().includes(value.toLowerCase())));
    };

    const handleStatusChange = (id: number, updatedVerif: string) => {
        setDummyData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, is_verif: updatedVerif } : item
            )
        );
    };
    console.log(ruang)

    return (
        <PersetujuanIRSLayout
        
        user={auth.user}
        Back = {
            <Link href={route("admin.dashboard")}>
                <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
                    <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                    Alokasi ruang
                </h2>
            </Link>
        }
        >
            <div className="flex flex-col w-full h-full items-center justify-center">
                <div className="flex flex-row w-full items-center justify-center gap-4">
                    <h2 className="w-32">
                        Gedung
                    </h2>
                    <div className="flex w-full justify-center my-4 items-start flex-col">
                        
                        <select
                            className='bg-white border border-gray-300 rounded-md shadow-sm w-1/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                            defaultValue=""
                        >
                            <option value="" disabled>Pilih Gedung</option>
                            {gedungData.map((gedung) => (
                                <option key={gedung.id} value={gedung.name}>{gedung.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-row w-full items-center justify-center gap-4">
                    <h2 className="w-32">
                        Program Studi
                    </h2>
                    <div className="flex w-full justify-center my-4 items-start flex-col">
                      
                        <select
                            className='bg-white border border-gray-300 rounded-md shadow-sm w-1/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                            defaultValue=""
                        >
                            <option value="" disabled>Pilih Program Studi</option>
                            {prodiData.map((prodi) => (
                                <option key={prodi.id} value={prodi.nama}>{prodi.nama}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-row w-full items-center justify-center gap-4">
            
                    <div className="flex w-full justify-center my-4 items-start flex-col">
                        <select
                            className='bg-white border border-gray-300 rounded-md shadow-sm w-1/6 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                            defaultValue=""
                        >
                            <option value="" disabled>Pilih Program Studi</option>
                            {prodiData.map((prodi) => (
                                <option key={prodi.id} value={prodi.nama}>{prodi.nama}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='w-full overflow-x-auto scrollbar-hidden'>
            <table className="min-w-full text-center border table-fixed">
                <thead className='p-10'>
                    <tr className='p-10'>
                        <th className='py-3 border'>No</th>
                        <th className='py-3 border'>Kode Ruang</th>
                        <th className='py-3 border '>Kapasitas</th>
                        <th className='py-3 border '>Kode Fakultas</th>
                        <th className='py-3 border '>Status</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {Array.isArray(ruang.data) && ruang.data.length > 0 ? (
                        ruang.data.map((item, index) => (
                            <tr key={String(item.id)} className='text-center'>
                                <td className='px-8 border'>{(ruang.current_page - 1) * 5 + index + 1}</td>
                                <td className='px-8 text-left border'>{String(item.kode_ruang)}</td>
                                <td className='px-8 border'>{String(item.kapasitas)}</td>
                                <td className='px-8 border'>{String(item.kode_fakultas) ? "Sains dan Matematika" : "Fakultas tidak ditemukan"}</td>
                                <td className='px-8 border'>
                                    <select
                                        value={String(item.is_verif)}
                                        onChange={(event) => handleStatusChange(Number(item.id), event.target.value)}
                                        className='bg-white border border-gray-300 rounded-md shadow-sm w-fit focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                                    >
                                        <option value='' disabled>Pilih Status</option>
                                        <option value="1">Sudah Dialokasi</option>
                                        <option value="0">Belum Dialokasi</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">Belum ada data.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange(ruang.prev_page_url)}
                        disabled={!ruang.prev_page_url}
                        className={`px-4 py-2 ${ruang.prev_page_url ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                    >
                        Previous
                    </button>
                    <span>
                        Halaman {ruang.current_page} dari {ruang.last_page}
                    </span>
                    <button
                        onClick={() => handlePageChange(ruang.next_page_url)}
                        disabled={!ruang.next_page_url}
                        className={`px-4 py-2 ${ruang.next_page_url ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                    >
                        Next
                    </button>
                </div>
            </div>
            </div>
            
        </PersetujuanIRSLayout>
    )
}