import PageLayout from "@/Layouts/PageLayout";
import {PageProps} from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import TextInput from "@/Components/TextInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import  { Inertia }  from "@inertiajs/inertia";
import { HiBuildingLibrary } from "react-icons/hi2";
import { filter } from "framer-motion/client";
import { FaPlus } from "react-icons/fa6";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { RiRestartLine } from "react-icons/ri";
import { toast } from "@/hooks/use-toast";
import { Breadcrumb, 
        BreadcrumbList, 
        BreadcrumbItem, 
        BreadcrumbLink, 
        BreadcrumbSeparator, 
        BreadcrumbEllipsis, 
        BreadcrumbPage } from "@/Components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@/Components/ui/separator";


interface RuangProps {
    id: number;
    kode_ruang: string;
    kode_gedung: string;
    kode_prodi: string;
    kode_fakultas: string;
    kapasitas: number;
    is_verif: string;
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
    const [showModalDeleteSingle, setShowModalDeleteSingle] = useState(false);
    const [selectedRuang, setSelectedRuang] = useState<RuangProps | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    


    const {data, setData, patch, errors} = useForm({
        selectedIds: [] as number[],
    });

    //Map ruang.data
    const ruangData = ruang.data.map((item) => {
        return {
            id: item.id,
            kode_ruang: item.kode_ruang,
            kode_gedung: item.kode_gedung,
            kode_prodi: item.kode_prodi,
            kode_fakultas: item.kode_fakultas,
            kapasitas: item.kapasitas,
            is_verif: item.is_verif,
        };
    });

    console.log(ruangData);
    


    const handlePageChange = (url: string | null) => {
        if (url) {
            Inertia.get(url, {filter_gedung: filterGedung, filter_prodi: filterProdi, per_page: ruang.per_page});
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
        
        Inertia.get(route('admin.alokasiruang'),{ filter_gedung: event.target.value, filter_prodi: filterProdi });
    };

    const handleFilterChangeProdi = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterProdi(event.target.value);
        Inertia.get(route('admin.alokasiruang'), { filter_gedung: filterGedung, filter_prodi: event.target.value });
    };

    
    const handleEdit = (ruang: RuangProps) => {
        setSelectedRuang(ruang);
        // Open modal or navigate to edit page
    };

    const handlePaginate = (perPage: number) => {
    Inertia.get(route('admin.alokasiruang'), {
        filter_gedung: filterGedung,
        filter_prodi: filterProdi,
        perPage,
    });
    };

    

    

    const gedungOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'K'];
    const paginateOptions = [5, 10, 25, 50, 100];
    const prodiOptions = Object.keys(prodiMapping);
    // console.log(ruang)

    const handleDeleteAll = () => {
        Inertia.delete(route('admin.deleteAllruang'), {
            onSuccess: () => {
                setFilteredRuang([]);
                setShowModal(false);
            }
        });
    };
    const handleDelete = (id: number) => {
        Inertia.delete(route('admin.deleteruang', { id }), {
            onSuccess: () => {
                setFilteredRuang((prevData) => prevData.filter((item) => item.id !== id));
                setShowModalDeleteSingle(false);
            },
        });
    };
    
    const handleDeleteConfirmation = (id: number) => {
        setSelectedRuang(filteredRuang.find(item => item.id === id) || null);
        setShowModalDeleteSingle(true);
    };

    const handleSelectAll = () => {
        const selectedIds = data.selectedIds.length === filteredRuang.length ? [] : filteredRuang.map((ruang) => ruang.id);
        setData("selectedIds", selectedIds);

    }


    const handleCheckboxChange = (id: number) => {
        const updatedSelectedIds = data.selectedIds.includes(id)
            ? data.selectedIds.filter((selectedId: number) => selectedId !== id)
            : [...data.selectedIds, id];
    
        setData("selectedIds", updatedSelectedIds);
    };
    
    

    //if selectedId was empty, then handle submit on Error

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.selectedIds.length === 0) {
            toast({
                variant: "destructive",
                className: "bg-red-500",
                title: "Gagal memperbarui status ruang",
                description: "Pilih ruang terlebih dahulu.",
                duration: 2500
            })
        }
    
        patch(route("admin.updatestatus"), {
            data: { selectedIds },
            onSuccess: () => {
            toast({
                variant: "default",
                className: "bg-green-500",
                title: "Berhasil",
                description: "Berhasil mengajukan ruang",
                duration: 2500
            })
            setData("selectedIds", []);
        }
        });
        
        };
    // console.log(selectedIds);

    const handleResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route("admin.resetstatus"), {
            data: { selectedIds },
            onSuccess: () => {
                toast({
                    variant: "default",
                    className: "bg-green-500",
                    title: "Berhasil",
                    description: "Penganjukan ruang dibatalkan",
                    duration: 2500
                })
                setData("selectedIds", []);
            }
        })
        

    };



    // console.log(data.selectedIds);
    console.log(ruang.data);


    
    

    return (
        <PageLayout
        
        user={auth.user}
        header="Alokasi Ruang"
        back = {
            <>
            <Breadcrumb className="ml-10 mt-8 text-black">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                   
                            <BreadcrumbItem>
                        <BreadcrumbPage>Alokasi Ruang</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </>
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
            <div className="flex flex-col w-11/12 items-center justify-center mx-12 my-8 overflow-y-auto">
                
                
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
            
                    <div className="flex w-3/6 justify-start h-4/6 my-4 items-center flex-row text-black space-x-4">
                            <h2>
                                Tampilkan
                            </h2>
                            <select
                            className='bg-white border border-gray-300 rounded-md shadow-sm w-2/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                            value={ruang.per_page}
                            onChange={(e) => handlePaginate(parseInt(e.target.value))}
                            >
                                <option disabled value="" className="self-center">Jumlah Baris</option>
                                {paginateOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            
                            </select>
                    </div>
                        
                            
                        
                        
                        <button 
                        type="submit"

                        //if selected id is_verif = "1", then button is disabled and cursor not allowed
                        disabled={ruang.data.some((ruang) => data.selectedIds.includes(ruang.id) && ruang.is_verif === '2')}
                        className={`text-white flex w-3/6 justify-center h-3/6 my-4 items-center flex-row bg-primary-dark gap-2 ${ruang.data.some((ruang) => data.selectedIds.includes(ruang.id) && ruang.is_verif === '2') ? 'opacity-50 cursor-not-allowed' : ''}`}
                    
                        onClick={handleSubmit}
                        >
                            <FaCheck className='w-5 h-5'/>
                            Ajukan Ruang
                        </button>
                    
                    
                        
                        <button
                            disabled={ruang.data.some((ruang) => data.selectedIds.includes(ruang.id) && ruang.is_verif === '2')}
                        onClick={handleResetSubmit}
                        className={`text-white flex w-5/12 justify-center h-3/6 my-4 items-center flex-row bg-button-hv_green gap-2 ${ruang.data.some((ruang) => data.selectedIds.includes(ruang.id) && ruang.is_verif === '2') ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                                <RiRestartLine className='w-4 h-4'/>
                            Batalkan Pengajuan
                        </button>
                    
                    <div className="flex w-4/12 justify-center h-3/6 my-4 items-center flex-row bg-primary-dark gap-1 text-white">
                        <FaPlus className='w-6 h-6'/>
                        <Link className="" href={route('admin.tambahruang')} >
                            
                            Tambah Ruang
                        </Link>
                    </div>
                    
                    <div className="flex w-5/12 justify-center h-3/6 my-4 items-center flex-row bg-primary-red gap-2 text-white">
                        <FaTrashAlt className='w-4 h-4'/>
                        <button className="text-white" onClick={() => setShowModal(true)}>
                            Hapus Semua Ruang
                        </button>
                    </div>
                    
                    {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Apakah anda yakin?</h2>
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
                <div className='w-full overflow-x-auto overflow-y-auto'>
                    <table className="min-w-full text-center border table-fixed">
                        <thead className='p-8 bg-primary-bg bg-opacity-35'>
                            <tr className='p-8 '>
                                <th className='py-3 border border-primary-bg'>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === filteredRuang.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className='py-3 border border-primary-bg'>No</th>
                                <th className='py-3 border border-primary-bg'>Kode Ruang</th>
                                <th className='py-3 border border-primary-bg'>Kapasitas</th>
                                <th className='py-3 border border-primary-bg'>Kode Gedung</th>
                                <th className='py-3 border border-primary-bg'>Prodi</th>
                                <th className='py-3 border border-primary-bg'>Kode Fakultas</th>
                                <th className='py-3 border border-primary-bg'>Status</th>
                                <th className='py-3 border border-primary-bg'>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {Array.isArray(ruang.data) && ruang.data.length > 0 ? (
                                ruang.data.map((item, index) => (
                                    <tr key={item.id} className='text-center'>
                                        <td className='px-2 border'>
                                            <input
                                                type="checkbox"
                                                checked={data.selectedIds.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                            />
                                        </td>
                                        <td className='px-8 border'>{(ruang.current_page - 1) * 5 + index + 1}</td>
                                        <td className='px-8 text-left border'>{item.kode_ruang}</td>
                                        <td className='px-8 border'>{item.kapasitas}</td>
                                        <td className='px-8 border'>{item.kode_gedung}</td>
                                        <td className='px-8 border'>{prodiMapping[item.kode_prodi] ||"Prodi tidak ditemukan"}</td>
                                        <td className='px-8 border'>{item.kode_fakultas ? "Sains dan Matematika" : "Fakultas tidak ditemukan"}</td>
                                        <td className='px-4 border w-48'>
                                            {item.is_verif === '0' ? 
                                            <div className="w-full rounded-md bg-gray-400 bg-op h-8 items-start flex-col flex justify-center text-center bg-opacity-55 text-md ">
                                                <h2 className="text-center ml-2">
                                                    Belum Disetujui
                                                </h2>
                                            </div> : 
                                            item.is_verif === '1'?  
                                            <div className="w-full rounded-md bg-yellow-400 h-8 items-start flex-col flex justify-center text-center bg-opacity-55 text-md ">
                                                <h2 className="text-center ml-2">
                                                    Sedang diajukan
                                                </h2>
                                            </div> : 
                                            item.is_verif === '2'?  
                                            <div className="w-full rounded-md bg-green-500 h-8 items-start flex-col flex justify-center text-center bg-opacity-55 text-md ">
                                                <h2 className="text-center ml-2">
                                                    Disetujui
                                                </h2>
                                            </div> : 
                                                <div className="w-full rounded-md bg-red-500 h-8 items-start text-center flex-col flex justify-center bg-opacity-35 text-md ">
                                                <h2 className="text-left ml-2">
                                                    Ditolak
                                                </h2>
                                            </div> }
                                        </td>
                                        <td className='px-8 border flex-row flex gap-2'>
                                            <button className="text-white bg-primary-dark w-16 h-8 my-1" onClick={() => setShowModal(true)}>
                                                Edit
                                            </button>
            
                                            <button 
                                            onClick={() => handleDeleteConfirmation(item.id)}
                                            >
                                                <FaTrashAlt className='w-6 h-6   text-red-500'/>
                                            </button>
                                            
                                            


                                        
                                        </td>
                                        {showModalDeleteSingle && selectedRuang && (
                                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                                                <div className="bg-white p-8 rounded-md shadow-md">
                                                    <h2 className="text-xl font-semibold">Apakah anda yakin?</h2>
                                                    <h2 className="text-md font-semibold mb-4">Anda akan membatalkan mata kuliah ini</h2>
                                                    <div className="flex justify-between space-x-4">
                                                        <button
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleDelete(selectedRuang.id)}
                                                        >
                                                            Ya
                                                        </button>
                                                        <button
                                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => setShowModalDeleteSingle(false)}
                                                        >
                                                            Tidak
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </tr>
                                    ))
                                ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">Belum ada data.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4 sticky bottom-0 bg-white p-4 z-9">
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