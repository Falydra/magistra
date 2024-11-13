import React, { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Link, Head, usePage, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import TextInput from '@/Components/TextInput';
import { FaCircleUser } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { User } from '@/types';
import { FormEventHandler, useState } from 'react';



export default function AuthenticatedLayout({
    user,
    header,
    header1,
    children,
    SideBarChildren,
}: PropsWithChildren<{ user: User; header?: ReactNode; header1?: ReactNode; SideBarChildren?: ReactNode; }>) {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage<PageProps>().props;
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        setNotification(`Welcome, ${user.name}!`);

        const timer = setTimeout(() => {
            setNotification(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [user.name]);
   


    return (
        <>
            <Head title="Dashboard" />
            <div className="flex-col hidden w-full min-h-screen bg-primary-bg md:flex sm:flex-row">
                <div className="flex flex-col w-full sm:w-2/5 lg:w-1/5 bg-transparent mt-4 mb-10 ml-4 items-center">

                {/* Sidebar Parent */}
                    <div className="flex flex-col items-center w-full h-screen min-h-screen justify-between  overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dark-500 scrollbar-hidden z-5 mt-12">
                        
                        <div className='flex flex-col items-center justify-between'>
                            {/* Magistra Logo */}
                            <div className='flex w-full items-center justify-center text-3xl text-white'>
                                <h1 className=' font-thin'>
                                    MAGISTRA
                                </h1>
                            </div>
                            {/* Sidebar Menu */}
                            <div className="flex flex-col items-start  mt-8 text-center justify-center space-y-2">
                                

                                    
                                        <div
                                            className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                                                url == "/dashboard" ? "" : " text-white opacity-100"
                                            }
                                            `}
                                        >
                                            <TbAppsFilled className='w-8 h-8'/>
                                            
                                            
                                            <Link href={route("dashboard")}>Dashboard</Link>
                                            
                                        </div>
                                        <div
                                            className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                                                ${
                                                    url == "/profile/edit" ? "" : " text-white opacity-100"
                                                }
                                             `}
                                            
                                        
                                        >       
                                            <FaCircleUser className='w-8 h-8'/>
                                            
                                            <Link href={route("profile.edit")}>Profil</Link>
                                        
                                        </div>
                                        
                                        {SideBarChildren}       
                                
                                
                                    </div>
                                <div>
                            </div>
                        </div>
                        <div className='flex mb-24'>
                            <div className={`flex h-12 items-center justify-between space-x-4    flex-row text-white mr-12 text-xl
                                    ${url == "/welcome" ? "": "text-white opacity-50"}
                                `}>
                                <RxExit className='w-6 h-6' />
                                <Link href={(route("logout"))} method="post" className="">
                                    Keluar
                                </Link>
                            
                            </div>           
                        </div>
            
                        
                        
                    </div>
                </div>
                
                <div className=' flex flex-row items-center justify-start w-full m-4 min-h-full bg-white md:w-[2000px] rounded-3xl'>

                    <div className="flex flex-col items-center justify-start w-4/5 min-h-full bg-white z-10 rounded-3xl">
                        <div className="flex flex-row items-start justify-between w-full mt-12 bg-white h-full">
                            <h2 className="mb-3 ml-12 text-3xl font-bold leading-tight  text-primary-dark">
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
                            {children}
                            </div>
                            
                        </div>
                        
                        {/* <main className="w-full h-full px-4">{children}</main> */}
                    </div>
                    <div className='flex flex-col items-center justify-start bg-blue-200 w-2/6 min-h-full rounded-tr-3xl rounded-br-3xl'>
                        <div className="flex flex-row items-start justify-between w-full mt-12 h-full ">
                            <h2 className="mb-3 ml-10 text-3xl font-bold leading-tight text-primary-dark ">
                                {header1}
                            </h2>
                           
                        </div>
                        <div className='flex flex-col items-center justify-center w-full'>
                                <div>
                                {notification && (
                                    <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 z-20 text-white text-center">
                                        {notification}
                                    </div>
                                )}
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};
