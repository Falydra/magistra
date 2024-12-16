import PageLayout from "@/Layouts/PageLayout";
import { useEffect, useState } from "react";
import { PageProps } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useForm } from "@inertiajs/react";
import { HiBuildingLibrary } from "react-icons/hi2";
import { usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Inertia } from "@inertiajs/inertia";

import { useToast } from "@/hooks/use-toast"

import { ToastAction } from "@/Components/ui/toast"

import 'react-toastify/dist/ReactToastify.css';


interface RuangProps {
    id: number;
    kode_ruang: string;
    kode_gedung: string;
    kode_prodi: string;
    kode_fakultas: string;
    kapasitas: number;
}

interface AlokasiProps extends PageProps {
    ruang: RuangProps[];
    filters: {
        filter_fakultas: string;
        filter_gedung: string;
        filter_prodi: string;
    };
}

interface FormData {
    kode_ruang: string;
    kode_gedung: string;
    kode_prodi: string;
    kode_fakultas: string;
    kapasitas: number;
}

export default function TambahRuang() {
    const { toast } = useToast();
    const { auth } = usePage().props;
    const { url } = usePage().props;
    const { ruang, filters } = usePage<AlokasiProps>().props;

    const [filterFakultas, setFilterFakultas] = useState<string>(filters.filter_fakultas || '');
    const [filterGedung, setFilterGedung] = useState<string>(filters.filter_gedung || '');
    const [filterProdi, setFilterProdi] = useState<string>(filters.filter_prodi || '');
    const [filteredRuang, setFilteredRuang] = useState<RuangProps[]>(ruang);

    const { data, setData, post, errors } = useForm<FormData>({
        kode_ruang: '',
        kode_gedung: '',
        kode_prodi: '',
        kode_fakultas: '',
        kapasitas: 0,
    });

    const handlePageChange = (url: string | null) => {
        if (url) {
            Inertia.get(url); // Navigate to the page
        }
    };

    useEffect(() => {
        let filteredData = ruang;

        if (filterFakultas) {
            filteredData = filteredData.filter((ruang) =>
                ruang.kode_fakultas.toLowerCase().includes(filterFakultas.toLowerCase())
            );
        }

        if (filterGedung) {
            filteredData = filteredData.filter((ruang) =>
                ruang.kode_gedung.toLowerCase().includes(filterGedung.toLowerCase())
            );
        }

        if (filterProdi) {
            filteredData = filteredData.filter((ruang) =>
                ruang.kode_prodi.toLowerCase().includes(filterProdi.toLowerCase())
            );
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        post(route('admin.storeruang'), {
            onError: (errors) => {
                toast({
                    variant: "destructive",
                    title: "Terjadi Kesalahan",
                    description: "Gagal menambahkan ruang. Periksa input Anda.",
                    // action: <ToastAction altText="Coba lagi">Coba Lagi</ToastAction>,
                    duration: 2500,
                });
            },
            onSuccess: () => {
                toast({
                    variant: "default",
                    className: "bg-green-500",
                    title: "Berhasil",
                    description: "Ruang berhasil ditambahkan.",
                    duration: 2500,
                });
            }
        });
    }

    
    const prodiMapping: { [key: string]: string } = {
        '01': 'Matematika',
        '02': 'Biologi',
        '03': 'Kimia',
        '04': 'Fisika',
        '05': 'Statistika',
        '06': 'Informatika',
    };

    const gedungOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    
    const prodiOptions = Object.keys(prodiMapping);

    return (
        <PageLayout
            user={auth.user}
            back={
                <Link href={route("admin.alokasiruang")}>
                    <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                        Alokasi Ruang
                    </h2>
                </Link>
            }
            sidebarChildren={
                <div
                    className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                        ${url == "/admin/alokasiruang" ? "" : " text-white opacity-100"}
                        `}
                >
                    <HiBuildingLibrary className='w-8 h-8' />
                    <Link href={route("admin.alokasiruang")}>Alokasi Ruang</Link>
                </div>
            }
        >
            <div className="flex w-full flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center mt-8 w-full min-h-full bg-white z-10 rounded-3xl">
                   
                    <form onSubmit={handleSubmit} className="w-full items-center justify-center flex flex-col">
                        <div className='flex flex-col w-3/6 items-center justify-start bg-primary-fg h-full rounded-xl m-4 p-8 border-2 border-t-primary-bg border-l-primary-bg border-r-black border-b-black drop-shadow-sm shadow-slate-600 shadow-md'>
                            <h1 className="text-2xl font-semibold">
                                Tambah Ruang
                            </h1>
                            <div className="flex flex-row w-full items-center justify-center mt-5">
                                <div className="flex flex-col w-full items-center justify-center">
                                    <h2 className="w-2/4 items-start justify-center flex flex-col">
                                        Pilih Gedung
                                    </h2>
                                    <div className="flex w-full justify-center my-2 items-center flex-col">
                                        <select
                                            className='bg-white border border-gray-300 rounded-md shadow-sm w-2/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                                            id="kode_gedung"
                                            name="kode_gedung"
                                            value={data.kode_gedung}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>Pilih Gedung</option>
                                            {gedungOptions.map((gedung) => (
                                                <option key={String(gedung)} value={String(gedung)}>{[String(gedung)]}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full items-center justify-center">
                                    <h2 className="w-2/4 items-start justify-center flex flex-col">
                                        Pilih Ruang
                                    </h2>
                                    <div className="flex w-full justify-center my-2 items-center flex-col">
                                        <input
                                            className="bg-white border border-gray-300 rounded-md shadow-sm w-2/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm"
                                            id="kode_ruang"
                                            type="text"
                                            name="kode_ruang"
                                            placeholder="Kode Ruang"
                                            value={data.kode_ruang}
                                            onChange={handleInputChange}
                                        />
                                        {errors.kode_ruang && <p className="text-red-500 text-xs italic">{errors.kode_ruang}</p>}
                                    </div>
                                </div>
                            </div>
                            <h2 className="w-3/4 mt-4 items-start justify-center flex flex-col">
                                Pilih Prodi
                            </h2>
                            <div className="flex w-full justify-center my-2 items-center flex-col">
                                <select
                                    className='bg-white border border-gray-300 rounded-md shadow-sm w-3/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                                    id="kode_prodi"
                                    name="kode_prodi"
                                    value={data.kode_prodi}
                                    onChange={handleInputChange}
                                >
                                    <option value="" disabled>Pilih Program Studi</option>
                                    {prodiOptions.map((prodi) => (
                                        <option key={String(prodi)} value={String(prodi)}>{prodiMapping[String(prodi)]}</option>
                                    ))}
                                </select>
                                {errors.kode_prodi && <p className="text-red-500 text-xs italic">{errors.kode_prodi}</p>}
                            </div>
                            
                            <h2 className="w-3/4 mt-4 items-start justify-center flex flex-col">
                                Masukkan Kapasitas
                            </h2>
                            <div className="flex w-full justify-center my-2 items-center flex-col">
                                <input
                                    type="number"
                                    className='bg-white border border-gray-300 rounded-md shadow-sm w-3/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                                    id="kapasitas"
                                    name="kapasitas"
                                    placeholder="Kapasitas"
                                    value={data.kapasitas}
                                    onChange={handleInputChange}
                                />
                                {errors.kapasitas && <p className="text-red-500 text-xs italic">{errors.kapasitas}</p>}
                            </div>
                            <div className="flex flex-row w-full items-center justify-center space-x-4 text-white font-light">
                                {/* <Button
                                variant="outline"
                                onClick={() => {
                                    toast({
                                    variant: "destructive",
                                    title: "Uh oh! Something went wrong.",
                                    description: "There was a problem with your request.",
                                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                                    })
                                }}
                                >
                                Show Toast
                                </Button> */}
                                <button 
                                    className="bg-primary-dark w-40 h-10 rounded-lg"
                                    type="submit"
                                >
                                    Tambah Ruang
                                </button>
                                <Button className="bg-primary-red w-24 h-10" onClick={() => Inertia.visit(route("admin.alokasiruang"))}>
                                    Batal
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    )
}