import React, { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Link, Head, usePage, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import TextInput from '@/Components/TextInput';
import { FaCircleUser } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { User } from '@/types';
import { FormEventHandler, useState } from 'react';
import { Toaster } from '@/Components/ui/toaster';
import { Separator } from '@/Components/ui/separator';
import { Avatar } from '@/Components/ui/avatar';



export default function PageLayout({
    user,
    back,
    children,
    sidebarChildren,
    header,
    
}: PropsWithChildren<{ user: User; back: ReactNode;  sidebarChildren? : ReactNode, header?: string  }>) {
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
            <div className="flex-col font-medium hidden w-full min-h-screen bg-primary-bg md:flex sm:flex-row overflow-x-hidden overflow-y-hidden">
                <div className="flex flex-col w-full sm:w-2/5 lg:w-3/12 bg-transparent mt-4 mb-10 ml-4 items-center">

                {/* Sidebar Parent */}
                    <div className="flex flex-col items-center w-full h-screen min-h-screen justify-between  overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dark-500 scrollbar-hidden z-5 mt-12">
                        
                        <div className='flex flex-col items-center justify-between'>
                            {/* Magistra Logo */}
                            <div className='flex w-full items-center justify-center text-3xl text-white'>
                                <h1 className=' font-semibold   '>
                                    MAGISTRA
                                </h1>
                            </div>
                            {/* Sidebar Menu */}
                            <div className="flex flex-col items-start  mt-8 text-center justify-center space-y-2 font-sans">
                                

                                    
                            <div
                                            className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                                                url === `/${user.role}/dashboard` ? "" : " text-white opacity-100"
                                            }
                                            `}
                                        >
                                            <TbAppsFilled className='w-8 h-8'/>
                                            
                                            
                                            <Link href={route(`${user.role}.dashboard`)}>Dashboard</Link>
                                            
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
                            <div className={`flex h-12 items-center justify-between space-x-4 flex-row text-white mr-12 text-xl
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
                
                <div className=' flex flex-col items-center justify-center w-full m-4  bg-white md:w-[2000px] h-full rounded-3xl overflow-x-hidden '>

                    <div className="flex flex-col text-left items-center justify-start w-full h-screen  bg-white z-10 rounded-3xl ">
                        <div className="flex flex-row items-start justify-between w-full bg-white">
                            <div className="flex flex-row items-start justify-start mr-9 w-full mt-2 bg-white ">
                                {back}

                            </div>
                            
                            <div className='flex flex-row items-end justify-end mr-10 w-full bg-white gap-12'>
                                <TextInput
                                    className="flex flex-row items-start justify-start w-4/12 mt-6 "
                                    placeholder="Search"
                                    // icon="search"
                                />
                                <Avatar className='bg-black flex items-center justify-center mt-6'/>
                            </div>
                            
                           
                        </div>
                        
                        
                        <Separator className="bg-black bg-opacity-60 mt-2 "/>
                        <h2 className="self-start ml-10 text-3xl font-bold leading-tight  text-primary-bg">
                            {header}
                        </h2>
                        
                        
                        {children}
                        <Toaster/>
                            
                            
                       
                        
                       
                    </div>
                  
                </div>
            </div>
            
        </>
    );
};