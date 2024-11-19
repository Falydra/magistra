import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import PembimbingLayout from '@/Layouts/PembimbingLayout'; // Pastikan nama impor sesuai dengan nama file
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({auth}: PageProps) {
    const { notification } = usePage().props;
    
 
     return (
         <PembimbingLayout
             user={auth.user}
         >
             <Head title="Dashboard" />
             
             <div className="flex flex-col items-center justify-start w-4/5 min-h-full bg-white z-10 rounded-3xl">
                <div className="flex flex-row items-start justify-between w-full mt-12 bg-white h-full">
                    <h2 className="mb-3 ml-12 text-3xl font-bold leading-tight  text-primary-dark">
                    Dashboard Pembimbing
                    </h2>
                    <div>
                        <TextInput
                            className="w-64 mx-10"
                            placeholder="Search"
                            // icon="search"
                        />
                    </div>
                </div>
                <div className='flex flex-row w-11/12 items-center justify-start bg-secondary-bg h-[200px] rounded-xl  m-4 p-8'>
                    <div className="flex w-40 h-40 rounded-full bg-black"/>
                    <div className='flex flex-col items-start justify-center mx-16 mb-16'>
                        <h3 className=' text-md'>
                            Selamat datang,
                        </h3>
                        <h1 className='text-3xl mb'>
                            {auth.user.name}
                        </h1>
                        <h3 className='pt-4'>
                            {/* NIDS: {auth.user.nids} */}
                            Email: {auth.user.email}
                            {/* Nomor: {auth.user.nomor} */}
                        </h3>
                    </div>
                    
                </div>
                <div className='flex flex-row w-11/12 items-center justify-start bg-secondary-bg h-[330px] rounded-xl m-4 p-8'>
                
                    <div className='flex flex-col items-start justify-center mx-8'>
                        <div className='flex items-start justify-start bg-secondary-light h-1/3 rounded-3xl md:p-6 -mt-60 -mb-10 -ml-5 cursor-pointer'>
                                <div className='mb-5 ml-3'>
                                    <img src="/images/person.png" alt="Persetujuan IRS" className='w-22 h-22' />
                                </div>
                                <div className='items-start justify-start mt-6 ml-20 mx-8 w-[650px] h-[10px]'>
                                <Link href={route("pembimbing.persetujuanIRS")}>
                                    <h1 className='text-2xl font-semibold text-secondary-txt1'> Persetujuan IRS </h1>
                                    <h1 className='text-m font-light text-secondary-txt1'> Setujui IRS mahasiswa di sini! </h1>
                                </Link>
                                </div>
                        </div>
                    </div>
                    
                </div>
    
            </div>
        <div className='flex flex-col items-center justify-start bg-blue-200 w-2/6 min-h-full rounded-tr-3xl rounded-br-3xl'>
        <div className="flex flex-row items-start justify-between w-full mt-12 h-full ">
            <h2 className="mb-3 ml-10 text-3xl font-bold leading-tight text-primary-dark ">
                Notifikasi
            </h2>
        </div>
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome to the Admin Dashboard, {auth.user.name}, {auth.user.role}!
                            <div className="mt-4">
                       
                            </div>
                      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PembimbingLayout>
    );
}
 