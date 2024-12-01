import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import PageLayout from "@/Layouts/PageLayout";
import { Link, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { PageProps } from '@/types';
import { HiBuildingLibrary } from 'react-icons/hi2';

interface RuangProps {
    id: number;
    kode_ruang: string;
    kapasitas: number;
    kode_fakultas: string;
    kode_prodi: string;
    kode_gedung: string;
    is_verif: boolean;
}



interface AlokasiProps extends PageProps {
    auth: any;
    ruang: RuangProps[];
    filters: {
        filter_gedung: string;
        filter_prodi: string;
    }
}

interface FormData {
    kode_ruang: string;
    kode_gedung: string;
    kode_prodi: string;
    kode_fakultas: string;
    kapasitas: number;
}

export default function TambahRuang({ auth }: { auth: any }) {
    const { url } = usePage().props;
    const { ruang, filters } = usePage<AlokasiProps>().props;
    const [filterGedung, setFilterGedung] = useState<string>(filters.filter_gedung || '');
    const [filterProdi, setFilterProdi] = useState<string>(filters.filter_prodi || '');
    const [filteredRuang, setFilteredRuang] = useState<RuangProps[]>(ruang || []);

    const { data, setData, post, errors } = useForm<FormData>({
        kode_ruang: '',
        kode_gedung: '',
        kode_prodi: '',
        kode_fakultas: '',
        kapasitas: 0,
    });

    useEffect(() => {
        let filteredData = ruang || [];

        if (filterGedung) {
            filteredData = filteredData.filter((ruang: RuangProps) => ruang.kode_gedung.toLowerCase() === filterGedung.toLowerCase());
        }

        if (filterProdi) {
            filteredData = filteredData.filter((ruang: RuangProps) => ruang.kode_prodi.toLowerCase() === filterProdi.toLowerCase());
        }

        setFilteredRuang(filteredData);
    }, [filterGedung, filterProdi, ruang]);

    const handleFilterChangeGedung = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterGedung(event.target.value);
    };

    const handleFilterChangeProdi = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterProdi(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setData(name as keyof FormData, name === 'kapasitas' ? Number(value) : value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post(route('admin.storeruang'));
    };

    const prodiMapping: { [key: string]: string } = {
        '01': 'Matematika',
        '02': 'Biologi',
        '03': 'Kimia',
        '04': 'Fisika',
        '05': 'Statistika',
        '06': 'Informatika',
    };

    const fakultasMapping: { [key: string]: string } = {
        '24': 'Fakultas Sains dan Matematika',
        '25': 'Fakultas Teknik',
        '26': 'Fakultas Ekonomi dan Bisnis',
        '27': 'Fakultas Ilmu Sosial dan Ilmu Politik',
        '28': 'Fakultas Ilmu Budaya',
    };

    const gedungOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const prodiOptions = Object.keys(prodiMapping);

    return (
        <PageLayout
            user={auth.user}
            back={
                <Link href={route("admin.dashboard")}>
                    <h2 className="mb-4 ml-10 text-3xl font-bold leading-tight text-primary-dark">
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                        Tambah Ruang
                    </h2>
                </Link>
            }
            sidebarChildren={
                <div
                    className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${url == "/admin/tambahruang" ? "" : " text-white opacity-100"}
                    `}
                >
                    <HiBuildingLibrary className='w-8 h-8' />
                    <Link href={route("admin.tambahruang")}>Tambah Ruang</Link>
                </div>
            }
        >
            <div className="flex flex-col w-full items-center justify-center mx-12 min-h-screen ">
                <form onSubmit={handleSubmit} className="w-full max-w-lg mb-12 border-t-black">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="kode_ruang">
                                Kode Ruang
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="kode_ruang"
                                type="text"
                                name="kode_ruang"
                                value={data.kode_ruang}
                                onChange={handleInputChange}
                            />
                            {errors.kode_ruang && <p className="text-red-500 text-xs italic">{errors.kode_ruang}</p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="kode_gedung">
                                Kode Gedung
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="kode_gedung"
                                name="kode_gedung"
                                value={data.kode_gedung}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Pilih Gedung</option>
                                {gedungOptions.map((gedung) => (
                                    <option key={gedung} value={gedung}>{gedung}</option>
                                ))}
                            </select>
                            {errors.kode_gedung && <p className="text-red-500 text-xs italic">{errors.kode_gedung}</p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="kode_prodi">
                                Kode Prodi
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="kode_prodi"
                                name="kode_prodi"
                                value={data.kode_prodi}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Pilih Prodi</option>
                                {prodiOptions.map((prodi) => (
                                    <option key={prodi} value={prodi}>{prodiMapping[prodi]}</option>
                                ))}
                            </select>
                            {errors.kode_prodi && <p className="text-red-500 text-xs italic">{errors.kode_prodi}</p>}
                        </div>
                    </div>
                   
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="kapasitas">
                                Kapasitas
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="kapasitas"
                                type="number"
                                name="kapasitas"
                                value={data.kapasitas}
                                onChange={handleInputChange}
                            />
                            {errors.kapasitas && <p className="text-red-500 text-xs italic">{errors.kapasitas}</p>}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Tambah Ruang
                        </button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
};