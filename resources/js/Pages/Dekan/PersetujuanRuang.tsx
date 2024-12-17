import PageLayout from "@/Layouts/PageLayout";
import react, { useEffect } from "react";
import { PageProps } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useForm, usePage } from "@inertiajs/react";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FaCheck, FaMoneyBills, FaPlus } from "react-icons/fa6";
import { LuFilePlus2 } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { RiRestartLine } from "react-icons/ri";
import { toast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/Components/ui/breadcrumb";


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
    ruangan: {
        data: RuangProps[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };
    filters: {
        filter_prodi: string;
    }
   

    
}

export default function TestPage({auth}: {auth: any}) {
    const {url} = usePage().props;
    const {ruangan, filters} = usePage<PaginationProps>().props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectedruangan, setSelectedruangan] = useState<RuangProps | null>(null);
    const [filterProdi, setFilterProdi] = useState<string>(filters.filter_prodi || '');
    const [filteredRuang, setFilteredRuang] = useState<RuangProps[]>(ruangan.data);
    



    const prodiMapping: { [key: string]: string } = {
        '01': 'Matematika',
        '02': 'Biologi',
        '03': 'Kimia',
        '04': 'Fisika',
        '05': 'Statistika',
        '06': 'Informatika',
    };

    const {data, setData, patch, errors} = useForm({
        selectedIds: [] as number[]
    })

   



    useEffect(() => {
        let filterData = ruangan.data;

        if (filterProdi) {
            filterData = filterData.filter(ruangan => ruangan.kode_prodi.toLowerCase().includes(filterProdi.toLowerCase()));
        }

        setFilteredRuang(filterData);  
        

    }, [filterProdi, ruangan.data]);

   



    const handlePageChange = (url: string | null) => {
        if (url) {
            Inertia.get(url, {filter_prodi: filterProdi, per_page: ruangan.per_page});
        }
    };

    const handleCheckboxChange = (id: number) => {
        const updatedSelectedIds = data.selectedIds.includes(id)
            ? data.selectedIds.filter((selectedId: number) => selectedId !== id)
            : [...data.selectedIds, id];
    
        setData("selectedIds", updatedSelectedIds);
    };
    
    



    const handleFilterChangeProdi = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterProdi(event.target.value);
        Inertia.get(route('dekan.ruang'), { filter_prodi: event.target.value });
    };

    const handleSelectAll = () => {
        const selectedIds = data.selectedIds.length === filteredRuang.length ? [] : filteredRuang.map((ruang) => ruang.id);
        setData("selectedIds", selectedIds);

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.selectedIds.length === 0) {
          alert("Pilih ruang terlebih dahulu.");
          return;
        }
    
        patch(route("dekan.updatestatus"), {
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


      const handleResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.selectedIds.length === 0) {
          alert("Pilih ruang terlebih dahulu.");
          return;
        }
    
        patch(route("dekan.resetstatus"), {
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
        }

        const handleRejectSubmit = (e: React.FormEvent) => {
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
        
            patch(route("dekan.rejectstatus"), {
              data: { selectedIds },
              onSuccess: () => {
                toast({
                    variant: "default",
                    className: "bg-green-500",
                    title: "Berhasil",
                    description: "Berhasil memperbarui status ruang",
                    duration: 2500
                })
                setData("selectedIds", []);
            }
            });
           
          }
      
    

    const prodiOptions = Object.keys(prodiMapping);
    const paginateOptions = [5, 10, 25, 50, 100];

     

    const handlePaginate = (perPage: number) => {
        Inertia.get(route('dekan.ruang'), {
            filter_prodi: filterProdi,
            perPage,
        });
    };

    console.log(filteredRuang);
    console.log(ruangan.data);



    return (
        <PageLayout
        user = {auth.user}
        header="Persetujuan Ruang"
        back = {
            <>
            <Breadcrumb className="ml-10 mt-8 text-black">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dekan/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                   
                            <BreadcrumbItem>
                        <BreadcrumbPage>Persetujuan Ruang</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </>
        }
        sidebarChildren = {
            <>
          
            <div
              className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                url == "/dekan/persetujuanruang" ? "" : " text-white opacity-100"
              }`}
            >
              <FaMoneyBills className="w-8 h-8" />
              <Link href={route("dekan.ruang")}>Persetujuan Ruang</Link>
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl    
                    ${
                        url == "/dekan/persetujuanjadwal" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <HiBuildingLibrary className='w-6 h-8'/>
                
                <Link href={route("dekan.jadwal")}>Persetujuan Jadwal</Link>
            
            </div>
    
            </>
           

        }
        >
             <div className="flex flex-col w-11/12 items-center justify-center mx-12 my-8 overflow-y-auto">
                    
                    <div className="flex flex-col w-full items-center justify-center gap-4">
                        
                            <div className="flex flex-row w-full items-center justify-center gap-4">
                                <h2 className="w-40">
                                    Program Studi
                                </h2>

                                <div className="flex w-full justify-center my-4 items-start flex-col">
                                <select
                                        className='bg-white border border-gray-300 rounded-md shadow-sm w-3/12 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
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
                                <div className="flex w-3/6 justify-start h-4/6 my-4 items-center flex-row text-black gap-2">
                                    <h2 className="w-36 ">
                                        Tampilkan
                                    </h2>
                                    <select
                                    className='bg-white border mr-12 border-gray-300 rounded-md shadow-sm w-3/12 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                                    value={ruangan.per_page}
                                    onChange={(e) => handlePaginate(parseInt(e.target.value))}
                                    >
                                        <option disabled value="" className="self-center">Jumlah Baris</option>
                                        {paginateOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    
                                    </select>
                                </div>
                                <div className="flex w-3/12 justify-center h-3/6 my-4 items-center flex-row bg-primary-dark gap-2 text-white">
                                    <FaCheck className='w-5 h-5'/>
                                    <button className="" 
                                        type="submit"
                                
                                        onClick={handleSubmit}
                                        >
                                            
                                    Setujui Ruang
                                    </button>
                                </div>
                                <div className="flex w-3/12 justify-center h-3/6 my-4 items-center flex-row bg-button-hv_red gap-2 text-white">
                                    <RiRestartLine className='w-4 h-4'/>
                                    <button className="text-white" 
                                    onClick={handleRejectSubmit}
                                    >
                                        Tolak Persetujuan
                                    </button>
                                </div>
                                <div className="flex w-3/12 justify-center h-3/6 my-4 items-center flex-row bg-button-yellow gap-2 text-white">
                                    <RiRestartLine className='w-4 h-4'/>
                                    <button className="text-white" 
                                    onClick={handleResetSubmit}
                                    >
                                        Batalkan Persetujuan
                                    </button>
                                </div>

                            </div>
                   
                    </div>
                  
                                
                    <div className='w-full overflow-x-auto overflow-y-auto'>
                        <table className="min-w-full text-center border table-fixed">
                            <thead className='p-8 bg-primary-bg bg-opacity-35'>
                                <tr className='p-8'>
                                    <th className='py-3 border border-primary-bg'>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length === filteredRuang.length}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className='py-3 border border-primary-bg'>No</th>
                                    <th className='py-3 border border-primary-bg'>Kode Ruang</th>
                                    <th className='py-3 border  border-primary-bg'>Kapasitas</th>
                                    
                                    <th className='py-3 border border-primary-bg'>Status</th>
                                    <th className='py-3 border border-primary-bg'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='text-center items-center'>
                                {Array.isArray(ruangan.data) && ruangan.data.length > 0 ? (
                                    ruangan.data.map((item, index) => (
                                        <tr key={item.id} className='text-center items-center'>
                                            <td className='px-2 border'>
                                                <input
                                                    type="checkbox"
                                                    checked={data.selectedIds.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                />
                                            </td>
                                            <td className='px-8 border'>{(ruangan.current_page - 1) * 5 + index + 1}</td>
                                            <td className='px-8 text-center border'>{item.kode_ruang}</td>
                                            <td className='px-8 border'>{item.kapasitas}</td>
                                          
                                            <td className='px-8 border items-center flex-col justify-center w-3/12 '>
                                            {item.is_verif === '1' ? 
                                                <div className="w-full rounded-md self-center bg-yellow-500 h-8 items-center flex-col flex justify-center text-center bg-opacity-55 text-md ">
                                                    <h2 className="text-center">
                                                        Menunggu Persetujuan
                                                    </h2>
                                                </div> : 
                                                item.is_verif === '2'? 
                                                <div className="w-full rounded-md bg-green-500 h-8 items-center flex-col flex justify-center text-center bg-opacity-55 text-md ">
                                                    <h2 className="text-center">
                                                        Disetujui
                                                    </h2>
                                                </div> : 
                                                 <div className="w-full rounded-md bg-red-500  h-8 items-center flex-col flex justify-center text-center bg-opacity-55 text-md ">
                                                    <h2 className="text-center">
                                                        Ditolak
                                                    </h2>
                                                </div> }
                                            </td>
                                            <td className='px-8 border flex-row flex gap-2 items-center justify-center'>
                                                <button className="text-white bg-primary-dark w-16 h-8 my-1" onClick={() => setShowModal(true)}>
                                                    Edit
                                                </button>
                
                                                <button 
                                                // onClick={() => handleDeleteConfirmation(item.id)}
                                                >
                                                    <FaTrashAlt className='w-6 h-6   text-red-500'/>
                                                </button>
                                                
                                                


                                            
                                            </td>
                                            {/* {showModalDeleteSingle && selectedruangan && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                    <div className="bg-white p-8 rounded-md shadow-md">
                                                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this room?</h2>
                                                        <div className="flex justify-end space-x-4">
                                                            <button
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleDelete(selectedruangan.id)}
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => setShowModalDeleteSingle(false)}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )} */}

                                        </tr>
                                        ))
                                    ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center">Belum ada data.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="flex justify-between items-center mt-4 sticky bottom-0 p-4 bg-white">
                            <button
                                onClick={() => handlePageChange(ruangan.prev_page_url)}
                                disabled={!ruangan.prev_page_url}
                                className={`px-4 py-2 ${ruangan.prev_page_url ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                            >
                                Previous
                            </button>
                            <span>
                                Halaman {ruangan.current_page} dari {ruangan.last_page}
                            </span>
                            <button
                                onClick={() => handlePageChange(ruangan.next_page_url)}
                                disabled={!ruangan.next_page_url}
                                className={`px-4 py-2 ${ruangan.next_page_url ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>


        </PageLayout>
    )


}