import PageLayout from "@/Layouts/PageLayout";
import React, { useState } from "react";
import { PageProps, JadwalProdi, JadwalProdiProps } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage } from "@inertiajs/react";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FaCheck, FaMoneyBills } from "react-icons/fa6";
import { LuFilePlus2 } from "react-icons/lu";
import { Inertia } from "@inertiajs/inertia";
import { FaTrashAlt } from "react-icons/fa";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/Components/ui/breadcrumb";

interface PaginationProps extends PageProps {
    jadwal: {
        data: JadwalProdi[];
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

export default function PersetujuanJadwal({ auth, jadwalProdi }: JadwalProdiProps) {
    const { url } = usePage().props;
    const { jadwal, filters } = usePage<PaginationProps>().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const prodiMapping: { [key: string]: string } = {
        '01': 'Matematika',
        '02': 'Biologi',
        '03': 'Kimia',
        '04': 'Fisika',
        '05': 'Statistika',
        '06': 'Informatika',
    };

    const statusMapping: { [key: string]: string } = {
        'Belum Disetujui': 'Belum Disetujui',
        'Disetujui': 'Disetujui',
        'Ditolak': 'Ditolak',
    };

    const handleCheckboxChange = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleApprove = () => {
        Inertia.post(route('dekan.approve'), {
            jadwal_prodi_id: selectedIds,
            kode_prodi: jadwalProdi[0]?.kode_prodi || '', // Contoh: Ambil kode_prodi pertama
        }, {
            onSuccess: () => {
                setSelectedIds([]);
                // Perbarui jadwalProdi setelah Approve
                jadwalProdi.forEach((item) => {
                    if (selectedIds.includes(item.id)) {
                        item.status = 'Disetujui';
                    }
                });
            },
        });
    };
    

    const handlePageChange = (url: string | null) => {
        if (url) {
            Inertia.get(url);
        }
    };

    console.log(jadwalProdi);

    return (
        <PageLayout
            user={auth.user}
            header="Persetujuan Jadwal"
            back={
                <>
            <Breadcrumb className="ml-10 mt-8 text-black">
                <BreadcrumbList>
                    <BreadcrumbItem>
                    {/* //Window back */}
                        <BreadcrumbLink href="/dekan/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                   
                            <BreadcrumbItem>
                        <BreadcrumbPage>Persetujuan Jadwal</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </>
            }
            sidebarChildren={
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
                        className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                            url == "/dekan/persetujuanjadwal" ? "" : " text-white opacity-100"
                        }`}
                    >
                        <HiBuildingLibrary className='w-8 h-8' />
                        <Link href={route("dekan.jadwal")}>Persetujuan Jadwal</Link>
                    </div>
                </>
            }
        >
            <div className="flex flex-col w-11/12 items-center justify-center mx-12 my-2 overflow-y-auto">
            
                <div className="flex flex-row w-full items-center justify-center gap-4">
                    <h2 className="w-36">Program Studi</h2>
                    <div className="flex w-full justify-center my-4 items-start flex-col">
                        <select
                            className='bg-white border border-gray-300 rounded-md shadow-sm w-1/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                            defaultValue=""
                        >
                            <option value="" disabled>Pilih Program Studi</option>
                            {Object.keys(prodiMapping).map((prodi) => (
                                <option key={prodi} value={prodi}>{prodiMapping[prodi]}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='w-full overflow-x-auto overflow-y-auto'>
                    <table className="min-w-full text-center border table-fixed">
                        <thead className='p-8 bg-primary-bg bg-opacity-35'>
                            <tr className='p-8'>
                                <th className='py-3 border border-primary-bg'>No</th>
                                <th className='py-3 border border-primary-bg'>Kode Jadwal</th>
                                <th className='py-3 border border-primary-bg'>Program Studi</th>
                                <th className='py-3 border border-primary-bg'>Status</th>
                                <th className='py-3 border border-primary-bg'>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {jadwalProdi.map((item, index) => (
                                <tr key={item.id} className="border">
                                    <td className="py-3 border">
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(item.id)}
                                            checked={selectedIds.includes(item.id)}
                                        />
                                    </td>
                                    <td className="py-3 border">{item.kode_jadwal_prodi}</td>
                                    <td className="py-3 border">{prodiMapping[item.kode_prodi]}</td>
                                    <td className="py-3 border">
                                        <span className={`px-2 py-1 text-white rounded ${item.status === 'Belum Disetujui' ? 'bg-red-500' : 'bg-green-500 bg-opacity-60 '}`}>
                                            {statusMapping[item.status]}
                                        </span>
                                    </td>
                                    <td className="py-3 border">
                                        {item.status !== 'Disetujui' && (
                                            <>
                                            
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded"
                                                onClick={handleApprove}
                                            >
                                                Setujui
                                            </button>
                                             <button
                                                className="px-4 py-2 bg-green-500 text-white rounded"
                                                onClick={handleApprove}
                                            >
                                                Tolak
                                            </button>
                                            </>
                                            
                                        )}
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded cursor-not-allowed"
                                                onClick={handleApprove}
                                                disabled={item.status === 'Disetujui'}
                                            >
                                                <FaTrashAlt className="w-6 h-6" />
                                            </button>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <div className="flex justify-between items-center mt-4">
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
                    </div> */}
                </div>
            </div>
        </PageLayout>
    );
};