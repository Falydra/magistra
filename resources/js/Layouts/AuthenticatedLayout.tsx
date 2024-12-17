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
    attrChildren,
    sidebarChildren
    
}: PropsWithChildren<{ user: User; header?: ReactNode; header1?: ReactNode; attrChildren?: ReactNode; sidebarChildren? : ReactNode  }>) {
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
            <div className="flex-col hidden w-full min-h-screen bg-primary-bg md:flex sm:flex-row font-medium   ">
                <div className="flex flex-col w-full sm:w-2/5 lg:w-3/12 bg-transparent mt-4 mb-10 ml-4 items-center">

                {/* Sidebar Parent */}
                    <div className="flex font-sans flex-col items-center w-full h-screen min-h-screen justify-between  overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dark-500 scrollbar-hidden z-5 mt-12">
                        
                        <div className='flex flex-col items-center justify-between'>
                            {/* Magistra Logo */}
                            <div className='flex w-full items-center justify-center text-3xl text-white font-sans'>
                                <h1 className=' font-semibold'>
                                    MAGISTRA
                                </h1>
                            </div>
                            {/* Sidebar Menu */}
                            <div className="flex flex-col items-start  mt-8 text-center justify-center space-y-2">
                                

                                    
                                        <div
                                            className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                                                url === `/${user.role}/dashboard` ? "" : " text-white opacity-100"
                                            }
                                            `}
                                        >
                                            <TbAppsFilled className='w-8 h-8'/>
                                            
                                            
                                            <Link href={route(`${user.role}.dashboard`)} className='font-sans'>Dashboard</Link>
                                            
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
                                        
                                        {sidebarChildren}       
                                
                                
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
                
                <div className=' flex flex-row items-center justify-center w-full m-4 bg-white md:w-[2000px]  rounded-3xl font-sans'>

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
                        <div className='flex flex-row w-11/12 items-center font-sans justify-start bg-secondary-bg h-[200px] rounded-xl space-x-4'>
                            <div className="flex w-40 h-32 rounded-full bg-black mx-4"/>
                            <div className='flex w-full items-center justify-centerflex-col'>
                                <div className='flex flex-col items-start justify-center'>
                                    <h3 className=' text-md'>
                                        Selamat datang,
                                    </h3>
                                    <h1 className='text-3xl mb'>
                                        {auth.user.name}
                                    </h1>
                                    {attrChildren}
                                    <h4 className='font-sans'>
                                    
                                        Email: {auth.user.email}
                                        
                                    </h4>
                                    
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex font-sans flex-col w-11/12 items-center justify-start bg-secondary-bg h-[330px] rounded-xl m-4 p-8'>
                        
                            {children}
                            
                            
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