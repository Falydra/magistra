import PageLayout from "@/Layouts/PageLayout";
import react, { useEffect } from "react";
import { PageProps, Jadwal, JadwalProps } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage } from "@inertiajs/react";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FaCheck, FaMoneyBills, FaPlus } from "react-icons/fa6";
import { LuFilePlus2 } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";


interface PaginationProps extends PageProps {
    jadwal: {
        data: Jadwal[];
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

export default function TestPage({auth}: JadwalProps) {
    const {url} = usePage().props;
    const {jadwal, filters} = usePage<PaginationProps>().props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectedJadwal, setSelectedJadwal] = useState<Jadwal | null>(null);
    const [filterProdi, setFilterProdi] = useState<string>(filters.filter_prodi || '');
    const [filteredJadwal, setFilteredJadwal] = useState<Jadwal[]>(jadwal.data);
    
    

    console.log(jadwal);
    

    const prodiMapping: { [key: string]: string } = {
        '01': 'Matematika',
        '02': 'Biologi',
        '03': 'Kimia',
        '04': 'Fisika',
        '05': 'Statistika',
        '06': 'Informatika',
    };
    

    const status : { [key: string]: string } = {
        '0': 'Belum Disetujui',
        '1': 'Sudah Disetujui',
        '2': 'Ditolak',
    }


    useEffect(() => {
        let filterData = jadwal.data;

        if (filterProdi) {
            filterData = filterData.filter(jadwal => jadwal.kode_prodi === filterProdi);
        }

        setFilteredJadwal(filterData);  
        

    }, [filterProdi, jadwal.data]);


    const handlePageChange = (url: string | null) => {
        if (url) {
            Inertia.get(url);
        }
    };

    const handleFilterChangeProdi = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterProdi(event.target.value);
        Inertia.get(route('dekan.jadwal'), { filter_prodi: event.target.value });
    };

    const prodiOptions = Object.keys(prodiMapping);
    const statusOptions = Object.keys(status);


    return (
        <PageLayout
        user = {auth.user}
        back = {
            <Link href={route("pembimbing.dashboard")}>
                <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
                    <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                    Persetujuan IRS
                </h2>
            </Link>
        }
        sidebarChildren = {
            <>
          
            <div
              className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                url == "/dekan/persetujuanruang" ? "" : " text-white opacity-100"
              }`}
            >
              <FaMoneyBills className="w-6 h-8" />
              <Link href={route("dekan.ruang")}>Persetujuan Ruang</Link>
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-sm
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
             <div className="flex flex-col w-11/12 items-center justify-center mx-12 my-8 h-screen">
                    
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
                  
                                
                    <div className='w-full overflow-x-auto overflow-y-auto min-h-[750px]'>
                        <table className="min-w-full text-center border table-fixed">
                            <thead className='p-8'>
                                <tr className='p-8'>
                                    <th className='py-3 border'>
                                        <input
                                            type="checkbox"
                                            // checked={selectedIds.length === filteredRuang.length}
                                            // onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className='py-3 border'>No</th>
                                    <th className='py-3 border'>Kode Ruang</th>
                                    
                                    <th className='py-3 border '>Status</th>
                                    <th className='py-3 border '>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {Array.isArray(jadwal.data) && jadwal.data.length > 0 ? (
                                    jadwal.data.map((item, index) => (
                                        <tr key={item.id} className='text-center'>
                                            <td className='px-2 border'>
                                                {/* <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                /> */}
                                            </td>
                                            <td className='px-8 border'>{(jadwal.current_page - 1) * 5 + index + 1}</td>
                                            <td className='px-4 border text-center'>S1 {item.program_studi}</td>
                                            
                                          
                                            <td className='px-8 border'>
                                                {status? 'Belum Disetujui' : 'Sudah Disetujui'}
                                            </td>
                                            <td className='px-8 border flex-row flex gap-2 items-center justify-center'>
                                                <button className="text-white bg-primary-dark w-16 h-8 my-1" onClick={() => setShowModal(true)}>
                                                    Edit
                                                </button>
                
                                                <button className="text-white bg-primary-dark w-16 h-8 my-1"
                                                // onClick={() => handleDeleteConfirmation(item.id)}
                                                >
                                                    Tolak
                                                </button>
                                                
                                                


                                            
                                            </td>
                                            {/* {showModalDeleteSingle && selectedjadwal && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                    <div className="bg-white p-8 rounded-md shadow-md">
                                                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this room?</h2>
                                                        <div className="flex justify-end space-x-4">
                                                            <button
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleDelete(selectedjadwal.id)}
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
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handlePageChange(jadwal.prev_page_url)}
                                disabled={!jadwal.prev_page_url}
                                className={`px-4 py-2 ${jadwal.prev_page_url ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                            >
                                Previous
                            </button>
                            <span>
                                Halaman {jadwal.current_page} dari {jadwal.last_page}
                            </span>
                            <button
                                onClick={() => handlePageChange(jadwal.next_page_url)}
                                disabled={!jadwal.next_page_url}
                                className={`px-4 py-2 ${jadwal.next_page_url ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>


        </PageLayout>
    )


}