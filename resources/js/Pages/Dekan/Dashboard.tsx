import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {DekanProps} from "@/types";

import { HiBuildingLibrary } from "react-icons/hi2";

export default function MahasiswaDashboard({auth, dekan }: DekanProps) {
    const {url} = usePage().props;
   
    

    return (
        <Authenticated
           
            user={auth.user}
            header="Dashboard dekan"
            header1="Notifikasi"
            attrChildren = {
                <>
                    <h5 className='w-full'>
                        NIM: {dekan.nip}
                        
                    </h5>
                    <h5 className='w-full'>
                        Tahun Periode : {dekan.tahun_periode}
                    </h5>
                    

                </>
            }
           sidebarChildren = {
            <>
                
    
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