import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {DekanProps} from "@/types";

import { HiBuildingLibrary } from "react-icons/hi2";
import { FaMoneyBills } from 'react-icons/fa6';

export default function DekanDashboard({auth, dekan }: DekanProps) {
    const {url} = usePage().props;
   
    
    console.log(dekan);
    return (
        <Authenticated
           
            user={auth.user}
            header="Dashboard dekan"    
            header1="Notifikasi"
            attrChildren = {
                <>
                    <h5 className='w-full'>
                       NIP: {dekan.nip}
                        
                    </h5>
                    <h5 className='w-full'>
                        Tahun Periode : {dekan.tahun_periode}
                    </h5>
                    

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
                <HiBuildingLibrary className='w-8 h-8'/>
                
                <Link href={route("dekan.jadwal")}>Persetujuan Jadwal</Link>
            
            </div>
    
            </>
           
            
           }

        >
            <Head title="Dashboard" />

            <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-row items-start justify-center">
                    <Link href={route('dekan.ruang')} className='w-full'>

                        <div className="bg-white flex w-full flex-row items-center justify-center h-[100px]">
                            <HiBuildingLibrary className='w-16 h-16 ml-8'/>
                            <div className=' flex flex-col w-full items-center justify-center'>

                                <div className=" text-gray-900">Persetujuan Ruang</div>
                                <h1> Manajemen dan Alokasi ruangan</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex w-full flex-row items-start justify-center">
                    <Link href={route('dekan.jadwal')} className='w-full'>

                        <div className="bg-white flex w-full flex-row items-center justify-center h-[100px]">
                            <HiBuildingLibrary className='w-16 h-16 ml-8'/>
                            <div className=' flex flex-col w-full items-center justify-center'>

                                <div className=" text-gray-900">Persetujuan Jadwal</div>
                                <h1> Manajemen Jadawl</h1>
                            </div>
                        </div>
                    </Link>
                </div>  
            </div>
        </Authenticated>
    );
}