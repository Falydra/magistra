import PageLayout from "@/Layouts/PageLayout";
import { PageProps } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FaUserSlash } from "react-icons/fa6";
import { HiAcademicCap } from "react-icons/hi2";
import { FaMoneyBills } from "react-icons/fa6";
import { LuFilePlus2 } from "react-icons/lu";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { MahasiswaProps } from "@/types";


export default function registrasi({auth, mahasiswa}: MahasiswaProps) {
    
    const {url} = usePage().props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);
    

    const handleStatusChange = (kode_registrasi: string) => {
        Inertia.patch(route("mahasiswa.updatestatus"), {kode_registrasi});
    }

    

    

    return (
        <PageLayout
        user={auth.user}
        back = {
            <Link href={route("mahasiswa.dashboard")}>
                    <h2 className="mb-4 ml-10 text-3xl font-bold leading-tight text-primary-dark">
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                        Registrasi
                    </h2>
                </Link>
        }

        sidebarChildren = {
            <>
                 <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/registrasi" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <HiAcademicCap className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.registrasi")}>Registrasi</Link>
            
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/pembayaran" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <FaMoneyBills className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.pembayaran")}>Pembayaran</Link>
            
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/irs" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <LuFilePlus2 className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.irs")}>IRS</Link>
            
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/khs" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <HiBuildingLibrary className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.khs")}>KHS</Link>
            
            </div>
            </>
        }
        
        >
            <div className="flex w-full flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mt-12">Pilih Status Akademik</h1>
                <h3>Pilih status akademik untuk perkuliahan semester ini</h3>
                <div className="flex w-full flex-row items-center justify-center gap-12 mt-4">
                    <div className="bg-gray-400 bg-opacity-40 flex w-4/12 flex-col items-center justify-center h-[150px] border-2 border-black rounded-2xl">
                        <div className="flex w-full flex-row items-center justify-center">
                            <HiBuildingLibrary className="w-16 h-16 mx-4" />
                            <div className="flex flex-col w-full items-start justify-center">
                                <h1 className="text-gray-900 text-2xl font-semibold">Aktif</h1>
                                <h1> Mengikuti kegiatan perkuliahan 
                                pada semster ini.</h1>
                            </div>
                        </div>
                        <div className="flex flex-row w-full items-center justify-end mr-8 mt-2">
                            <button 
                            onClick={() => setShowModal(true)} 
                            disabled={mahasiswa.kode_registrasi === '001'}
                            
                            className={`w-24 h-8 bg-primary-dark rounded-lg items-center justify-center flex-col flex text-white ${
        mahasiswa.kode_registrasi === '001' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                Pilih
                            </button>
                        </div>
                        {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Apakash sudah yakin?</h2>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleStatusChange('100')}
                                  
                                   
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
                    <div className="bg-gray-400 bg-opacity-40 flex w-4/12 flex-col items-center justify-center h-[150px] border-2 border-black rounded-2xl">
                        <div className="flex w-full flex-row items-center justify-center">
                            <FaUserSlash className="w-16 h-16 mx-4" />
                            <div className="flex flex-col w-full items-start justify-center">
                                <h1 className="text-gray-900 text-2xl font-semibold">Cuti</h1>
                                <h1> Tidak mengikuti kegiatan perkuliahan pada semester ini.</h1>
                            </div>
                        </div>
                        <div className="flex flex-row w-full items-center justify-end mr-8 mt-2">
                            <button 
                            onClick={() => setShowModal2(true)} 
                            disabled={mahasiswa.kode_registrasi === '100'}
                            className={`w-24 h-8 bg-primary-dark rounded-lg items-center justify-center flex-col flex text-white ${
        mahasiswa.kode_registrasi === '100' ? 'opacity-50 cursor-not-allowed' : ''
    }`}>
                                Pilih
                            </button>
                        </div>
                    </div>
                    {showModal2 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Apakash sudah yakin? Setelah melakukan registrasi, maka tidak dapat diganti</h2>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleStatusChange('001')}
                                    disabled={mahasiswa.kode_registrasi === '100'}
                                >
                                    Yes
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setShowModal2(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                </div>
            </div>




        </PageLayout>
    );

}