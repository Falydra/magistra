import { useState, PropsWithChildren, ReactNode } from "react";

import { Link, usePage, Head } from "@inertiajs/react";
import { User } from "@/types";
import TextInput from "@/Components/TextInput";
import { url } from "inspector";
import { FaCircleUser } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { TbAppsFilled } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";


export default function ProfileLayout({
    user,
    header,
    children
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const {url} = usePage().props;
    
    return(
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
                                                url == "/dashboard" ? "text-white opacity-1000" : " text-white opacity-50"
                                            }
                                            `}
                                        >
                                            <TbAppsFilled className='w-8 h-8'/>
                                            
                                            
                                            <Link href={route("dashboard")}>Dashboard</Link>
                                            
                                        </div>
                                        <div
                                            className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                                                ${
                                                    url == "/profile/edit" ? "text-white opacity-50" : " text-white opacity-100"
                                                }
                                             `}
                                            
                                        
                                        >       
                                            <FaCircleUser className='w-8 h-8'/>
                                            
                                            <Link href={route("profile.edit")}>Profil</Link>
                                        
                                        </div>
                                    
                                
                                
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

                    <div className="flex flex-col items-center justify-start w-full min-h-full bg-white z-10 rounded-3xl">
                        <div className="flex flex-row items-start justify-between w-full mt-8 bg-white h-full">
                            <h2 className="mb-3 ml-12 text-3xl font-bold leading-tight  text-primary-dark">
                                {header}
                            </h2>
                           
                        </div>

                        <div className='flex flex-col w-3/6 items-center justify-start bg-primary-fg h-5/6 rounded-xl  m-4 p-8 border-2 border-primary-bg'>
                        <div className="flex w-40 h-40 rounded-full bg-[url('images/ffff-removebg-preview.png')] bg-cover bg-black">
                 
                        </div>
                           {children}
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}