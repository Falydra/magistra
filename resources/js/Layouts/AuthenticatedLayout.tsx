import React, { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import TextInput from '@/Components/TextInput';

interface AuthenticatedLayoutProps {
    header?: ReactNode;
    header1?: ReactNode;
   
    children?: ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ header, header1, children }) => {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex-col hidden w-full min-h-screen bg-blue-400 md:flex sm:flex-row">
                <div className="flex flex-col w-full sm:w-2/5 lg:w-1/5 bg-transparent mt-4 mb-10 ml-4 items-center">
                    <div className="flex flex-col items-center w-full h-screen min-h-screen py-12 overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dcf-dark-500 scrollbar-hidden">
                        <div className="flex w-32 h-32 rounded-full bg-orange-300"/>
                        <h1 className="pt-4 text-2xl font-bold text-center text-white">
                            {auth.user.name}
                        </h1>
                        <h3 className="text-sm font-light text-center text-white">
                            {auth.user.email}
                        </h3>
                        <div className="flex flex-col items-center w-full mt-8 text-center">
                            
                        </div>
                    </div>
                    
                </div>
                
                <div className=' flex flex-row items-center justify-start w-full m-4 min-h-full bg-white'>

                    <div className="flex flex-col items-center justify-start w-4/5 min-h-full bg-white">
                        <div className="flex flex-row items-start justify-between w-full mt-12 bg-white h-full">
                            <h2 className="mb-3 ml-10 text-3xl font-bold leading-tight text-transparent text-gray-800 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text">
                                {header}
                            </h2>
                            <div>
                                <TextInput
                                    className="w-64 mx-10"
                                    placeholder="Search"
                                    // icon="search"
                                />
                            </div>
                        </div>
                        <div className='flex flex-row w-11/12 items-center justify-start bg-orange-200 h-[200px] rounded-xl  m-4 p-8'>
                            <div className="flex w-32 h-32 rounded-full bg-black"/>
                            <div className='flex flex-col items-start justify-center mx-8'>
                                <h3>
                                    Selamat datang,
                                </h3>
                                <h1>
                                    {auth.user.name}
                                </h1>
                                <h3>
                                    {/* NIDS: {auth.user.nids} */}
                                    Email: {auth.user.email}
                                    {/* Nomor: {auth.user.nomor} */}
                                </h3>
                            </div>
                            
                        </div>
                        <div className='flex flex-row w-11/12 items-center justify-start bg-orange-200 h-[330px] rounded-xl m-4 p-8'>
                        
                            <div className='flex flex-col items-start justify-center mx-8'>
                              
                            </div>
                            
                        </div>
                        
                        {/* <main className="w-full h-full px-4">{children}</main> */}
                    </div>
                    <div className='flex flex-col items-center justify-start bg-blue-200 w-2/6 min-h-full'>
                    <div className="flex flex-row items-start justify-between w-full mt-12 h-full">
                            <h2 className="mb-3 ml-10 text-3xl font-bold leading-tight text-transparent text-gray-800 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text">
                                {header1}
                            </h2>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="min-h-screen">
                    <div className="flex flex-row items-center justify-between w-full mt-4 bg-transparent h-fit">
                        <h2 className="mb-3 ml-4 text-3xl font-bold leading-tight text-transparent text-gray-800 bg-gradient-to-r from-dcf-orange-500 to-dcf-orange-300 bg-clip-text">
                            {header}
                        </h2>
                    </div>
                    <div className="p-4 mb-20">

                        {children}
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default AuthenticatedLayout;