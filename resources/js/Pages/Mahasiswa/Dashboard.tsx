import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {MahasiswaProps} from "@/types";

import { HiBuildingLibrary } from "react-icons/hi2";

export default function MahasiswaDashboard({auth, mahasiswa }: MahasiswaProps) {
    const {url} = usePage().props;
    console.log(mahasiswa.nim);
    

    return (
        <Authenticated
           
            user={auth.user}
            header="Dashboard Mahasiswa"
            header1="Notifikasi"
            attrChildren = {
                <>
                    <h5 className='w-full'>
                        NIM: {mahasiswa.nim}
                        
                    </h5>
                    <h5 className='w-full'>
                        IPK : {mahasiswa.ips}
                    </h5>
                    <h5 className='w-full'>
                        Semester :  {mahasiswa.semester}
                    </h5>

                </>
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
                <HiBuildingLibrary className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.registrasi")}>Registrasi</Link>
            
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/pembayaran" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <HiBuildingLibrary className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.pembayaran")}>Pembayaran</Link>
            
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/irs" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <HiBuildingLibrary className='w-8 h-8'/>
                
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
            <Head title="Dashboard" />

            <div className="flex w-full flex-col items-center justify-center">
                <div className="flex w-full flex-row items-start justify-center">
                    <Link href={route('admin.alokasiruang')} className='w-full'>

                        <div className="bg-white flex w-full flex-row items-center justify-center h-[100px]">
                            <HiBuildingLibrary className='w-16 h-16 ml-8'/>
                            <div className=' flex flex-col w-full items-center justify-center'>

                                <div className=" text-gray-900">Alokasi Ruang</div>
                                <h1> Manajemen dan Alokasi ruangan</h1>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </Authenticated>
    );
}