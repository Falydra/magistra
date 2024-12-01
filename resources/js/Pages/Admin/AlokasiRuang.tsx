    import PageLayout from "@/Layouts/PageLayout";
    import {PageProps} from "@/types";
    import { Link } from "@inertiajs/react";
    import { usePage } from "@inertiajs/react";
    import { useEffect, useState } from "react";
    import { MdOutlineArrowBackIos } from "react-icons/md";
    import TextInput from "@/Components/TextInput";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
    import  { Inertia }  from "@inertiajs/inertia";
    import { HiBuildingLibrary } from "react-icons/hi2";
    import { filter } from "framer-motion/client";
    import { FaPlus } from "react-icons/fa6";
    import { FaCheck, FaTrashAlt } from "react-icons/fa";
    

    interface RuangProps {
        id: number;
        kode_ruang: string;
        kode_gedung: string;
        kode_prodi: string;
        kode_fakultas: string;
        kapasitas: number;
        is_verif: boolean;
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
        filters: {
            filter_gedung: string;
            filter_prodi: string;
        };

        
    }


    export default function AlokasiRuang({auth} : {auth: any} ) {
        const {url} = usePage().props;
        const { ruang, filters } = usePage<PaginationProps>().props;
    
        const [filterGedung, setFilterGedung] = useState<string>(filters.filter_gedung || '');
        const [filterProdi, setFilterProdi] = useState<string>(filters.filter_prodi || '');
        const [filteredRuang, setFilteredRuang] = useState<RuangProps[]>(ruang.data);
        const [showModal, setShowModal] = useState<boolean>(false);
        const [selectedRuang, setSelectedRuang] = useState<RuangProps | null>(null);

        


        const handlePageChange = (url: string | null) => {
            if (url) {
                Inertia.get(url, {filter_gedung: filterGedung, filter_prodi: filterProdi}); // Navigate to the page
            }
        };

        useEffect(() => {
            let filteredData = ruang.data;

            if (filterGedung) {
                filteredData = filteredData.filter(ruang => ruang.kode_gedung.toLowerCase().includes(filterGedung.toLowerCase()));
            }

            if (filterProdi) {
                filteredData = filteredData.filter(ruang =>ruang.kode_prodi.toLowerCase().includes(filterProdi.toLowerCase()));
            }

            setFilteredRuang(filteredData);
        }, [filterGedung, filterProdi, ruang.data]);


        const prodiMapping: { [key: string]: string } = {
            '01': 'Matematika',
            '02': 'Biologi',
            '03': 'Kimia',
            '04': 'Fisika',
            '05': 'Statistika',
            '06': 'Informatika',
        };






        
        
        
        const handleFilterChangeGedung = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setFilterGedung(event.target.value);
            // console.log("Filter Gedung:", value);
            Inertia.get(route('admin.alokasiruang'),{ filter_gedung: event.target.value, filter_prodi: filterProdi });
        };

        const handleFilterChangeProdi = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setFilterProdi(event.target.value);
            Inertia.get(route('admin.alokasiruang'), { filter_gedung: filterGedung, filter_prodi: event.target.value });
        };

        const handleStatusChange = (id: number, updatedVerif: string) => {
            setFilteredRuang((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, is_verif: updatedVerif === '1' } : item
                )
            );
        };

        const handleEdit = (ruang: RuangProps) => {
            setSelectedRuang(ruang);
            // Open modal or navigate to edit page
        };

        

        const gedungOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        const prodiOptions = Object.keys(prodiMapping);
        console.log(ruang)

        const handleDeleteAll = () => {
            Inertia.delete(route('admin.deleteAllruang'), {
                onSuccess: () => {
                    setFilteredRuang([]);
                    setShowModal(false);
                }
            });
        };
        const handleDelete = (id: number) => {
            Inertia.delete(route('admin.deleteuang', id), {
                onSuccess: () => {
                    setFilteredRuang((prevData) => prevData.filter((item) => item.id !== id));
                }
            });
        };

        return (
            <PageLayout
            
            user={auth.user}
            back = {
                <Link href={route("admin.dashboard")}>
                    <h2 className="mb-4 ml-10 text-3xl font-bold leading-tight text-primary-dark">
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                        Alokasi ruang
                    </h2>
                </Link>
            }
            sidebarChildren = {
                <div
                    className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                        ${
                            url == "/admin/alokasiruang" ? "" : " text-white opacity-100"
                        }
                        `}
                >       
                    <HiBuildingLibrary className='w-8 h-8'/>
                    
                    <Link href={route("admin.alokasiruang")}>Alokasi Ruang</Link>
                
                </div>
            } 
            >
                <div className="flex flex-col w-11/12 items-center justify-center mx-12 my-8">
                    
                    <div className="flex flex-row w-full items-center justify-center gap-4">
                        <h2 className="w-32">
                            Program Studi
                        </h2>
                        <div className="flex w-full justify-center my-4 items-start flex-col">
                        
                            <select
                                className='bg-white border border-gray-300 rounded-md shadow-sm w-1/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                                defaultValue=""
                                value={filterProdi}
                                onChange={handleFilterChangeProdi}
                            >
                                <option value="" disabled>Pilih Program Studi</option>
                                {prodiOptions.map((prodi) => (
                                    <option key={prodi} value={prodi}>{prodiMapping[prodi]}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row w-full items-center justify-center gap-4">
                        <h2 className="w-32">
                            Gedung
                        </h2>
                        <div className="flex w-full justify-center my-4 items-start flex-col">
                            
                            <select
                                className='bg-white border border-gray-300 rounded-md shadow-sm w-1/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                                defaultValue=""
                                value={filterGedung}
                                onChange={handleFilterChangeGedung}
                            >
                                <option value="" disabled>Filter Gedung</option>
                                {gedungOptions.map((gedung) => (
                                    <option key={gedung} value={gedung}>{gedung}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row w-full items-end justify-center gap-4">
                
                       <div className="flex w-3/6 justify-center h-4/6 my-4 items-center flex-row text-white"/>
                        <div className="flex w-3/6 justify-center h-4/6 my-4 items-center flex-row bg-primary-dark gap-2 text-white">
                            <FaCheck className='w-5 h-5'/>
                            <Link className="" href={route('admin.tambahruang')} >
                                
                                Ajukan Ruang
                            </Link>
                        </div>
                        <div className="flex w-5/12 justify-center h-4/6 my-4 items-center flex-row bg-primary-dark gap-2 text-white">
                            <FaTrashAlt className='w-4 h-4'/>
                            <button className="text-white" onClick={() => setShowModal(true)}>
                                Ajukan Semua Ruang
                            </button>
                        </div>
                        <div className="flex w-4/12 justify-center h-4/6 my-4 items-center flex-row bg-primary-dark gap-1 text-white">
                            <FaPlus className='w-6 h-6'/>
                            <Link className="" href={route('admin.tambahruang')} >
                                
                                Tambah Ruang
                            </Link>
                        </div>
                        
                        <div className="flex w-5/12 justify-center h-4/6 my-4 items-center flex-row bg-primary-red gap-2 text-white">
                            <FaTrashAlt className='w-4 h-4'/>
                            <button className="text-white" onClick={() => setShowModal(true)}>
                                Hapus Semua Ruang
                            </button>
                        </div>
                        
                        {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete all rooms?</h2>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleDeleteAll}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setShowModal(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                    </div>
                    <div className='w-full overflow-x-auto scrollbar-hidden'>
                <table className="min-w-full text-center border table-fixed">
                    <thead className='p-10'>
                        <tr className='p-10'>
                            <th className='py-3 border'>No</th>
                            <th className='py-3 border'>Kode Ruang</th>
                            <th className='py-3 border '>Kapasitas</th>
                            <th className='py-3 border '>Kode Gedung</th>
                            <th className='py-3 border '>Prodi</th>
                            <th className='py-3 border '>Kode Fakultas</th>
                            <th className='py-3 border '>Status</th>
                            <th className='py-3 border '>Aksi</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {Array.isArray(ruang.data) && ruang.data.length > 0 ? (
                            ruang.data.map((item, index) => (
                                <tr key={item.id} className='text-center'>
                                    <td className='px-8 border'>{(ruang.current_page - 1) * 5 + index + 1}</td>
                                    <td className='px-8 text-left border'>{item.kode_ruang}</td>
                                    <td className='px-8 border'>{item.kapasitas}</td>
                                    <td className='px-8 border'>{item.kode_gedung}</td>
                                    <td className='px-8 border'>{prodiMapping[item.kode_prodi] ||"Prodi tidak ditemukan"}</td>
                                    <td className='px-8 border'>{item.kode_fakultas ? "Sains dan Matematika" : "Fakultas tidak ditemukan"}</td>
                                    <td className='px-8 border '>
                                        {item.is_verif ? 'Belum Diajukan' : 'Sudah Diajukan'}
                                    </td>
                                    <td className='px-8 border flex-row flex gap-2'>
                                        <button className="text-white bg-primary-dark w-16 h-8 my-1" onClick={() => setShowModal(true)}>
                                            Edit
                                        </button>
                                        {/* <Link
                                            href={route('admin.editruang', item.id)}
                                            onClick={() => handleEdit(item)}
                                            className='bg-primary-dark text-white px-4 py-2 rounded'
                                        >
                                            Edit
                                        </Link> */}
                                        <Link href={route('admin.deleteruang', { id: item.id } )} className="flex flex-col items-center justify-center">
                                            <FaTrashAlt className='w-6 h-6   text-red-500'/>
                                        </Link>
                                       
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
                
            </PageLayout>
        )
    }