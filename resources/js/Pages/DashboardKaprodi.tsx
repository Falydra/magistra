import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";

export default function KaprodiDashboard() {
    const sideBarContent = (
        <div className='flex flex-col items-start justify-start min-w-max text-white opacity-50 space-y-6'>
            <div className='flex items-center space-x-4'>
                <FaCalendarAlt className='w-6 h-6'/>
                <div className='flex flex-col text-left'>
                    <span>Penyusunan</span>
                    <span>Jadwal</span>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <MdMonitor className='w-6 h-6'/>
                <div className='flex flex-col text-left'>
                    <span>Monitoring IRS</span>
                </div>
            </div>
        </div>
    );    

    return (
        <Authenticated 
            header1="Notifikasi"
            header="Dashboard"
            childrenSideBar={sideBarContent}
        >
            {/* Container untuk menu */}
            <div className="flex flex-col gap-4 w-full">
                {/* Penyusunan Jadwal */}
                <div className='flex items-start justify-start bg-primary-light h-1/3 rounded-xl md:p-4'>
                    <div>
                        <img src="/images/calendar.png" alt="Penyusunan Jadwal" className='w-24 h-24' />
                    </div>
                    <div className='items-start justify-start mt-4 mx-6 text-primary-dark'>
                        <h1 className='text-2xl font-semibold'> Penyusunan Jadwal </h1>
                        <h1 className='text-sm font-light'> Susun jadwal program studi selama 1 semester di sini! </h1>
                    </div>
                </div>

                {/* Monitoring IRS */}
                <Link href={route("monitoring_irs")}>
                    <div className='flex items-start justify-start bg-primary-light h-1/3 rounded-xl md:p-4'>
                        <div>
                            <img src="/images/eye.png" alt="Monitoring IRS" className='w-24 h-24' />
                        </div>
                        <div className='items-start justify-start mt-3 mx-8 text-primary-dark'>
                            <h1 className='text-2xl font-semibold'> Monitoring IRS </h1>
                            <h1 className='text-sm font-light'> Pantau proses verifikasi IRS seluruh perwalian mahasiswa program studi di sini! </h1>
                        </div>
                    </div>
                </Link>
            </div>
        </Authenticated>
    );
}
