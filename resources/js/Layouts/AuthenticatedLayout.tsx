import React, { ReactNode } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import TextInput from '@/Components/TextInput';
import { FaCircleUser } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { FaBell } from "react-icons/fa";

interface AuthenticatedLayoutProps {
    header?: ReactNode;
    header1?: ReactNode;
    header2?: ReactNode;
   
    children?: ReactNode;
    childrenSideBar?: ReactNode;
}

<<<<<<< HEAD
const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ header, header1, children, childrenSideBar }) => {
=======

export default function AuthenticatedLayout({
    user,
    header,
    header1,
    children,
    SideBarChildren,
}: PropsWithChildren<{ user: User; header?: ReactNode; header1?: ReactNode; SideBarChildren?: ReactNode; }>) {
>>>>>>> refs/remotes/origin/main
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex-col hidden w-full min-h-screen bg-primary-bg md:flex sm:flex-row">
                <div className="flex flex-col w-full sm:w-2/5 lg:w-1/5 bg-transparent mt-4 mb-10 ml-4 items-center">

                {/* Sidebar Parent */}
                    <div className="flex flex-col items-center w-full h-screen min-h-screen justify-between overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dark-500 scrollbar-hidden z-5 mt-12">
                        
                        <div className='flex flex-col items-center justify-between'>
                            {/* Magistra Logo */}
                            <div className='flex w-full items-start justify-center text-2xl text-white'>
                                <h1 className='font-semibold'>
                                    MAGISTRA
                                </h1>
                            </div>

<<<<<<< HEAD
                            {/* Sidebar Menu */}
                            <div className="flex flex-col items-start mt-8 text-center justify-center">
                                <div
                                    className={`flex h-12 items-start justify-between space-x-4 flex-row text-white ${
                                            url == "/dashboard" ? "text-white opacity-50" : " text-white opacity-100"}
                                `}>
                                    <TbAppsFilled className='w-6 h-6'/>  
                                    <Link href={route("dashboard")}>Dashboard</Link>
                                </div>
                                <div
                                    className={`flex h-12 items-start justify-between space-x-4 flex-row text-white ${
                                    url == "/profil" ? "" : " text-white opacity-50"}
                                `}>
                                    <FaCircleUser className='w-6 h-6'/>
                                    <Link href={route("dashboard")}>Profil</Link>
                                </div>
                                {childrenSideBar}
=======
                                    
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
>>>>>>> refs/remotes/origin/main
                            </div>
                        </div>
                        <div className='flex mb-24'>
                            <div className={`flex h-12 items-center justify-between space-x-4 flex-row text-white mr-12 text-xl
                                    ${url == "/" ? "": "text-white opacity-50"}
                                `}>
                                <RxExit className='w-6 h-6' />
                                <Link href={(route("logout"))} method="post" className="">
                                    Keluar
                                </Link>
                            </div>           
                        </div>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-start w-full m-4 min-h-full bg-white md:w-[2000px] rounded-3xl'>
                    <div className="flex flex-col items-center justify-start w-4/5 min-h-full bg-white z-10 rounded-3xl">
                       {/* Dashboard (Current Page) */}
                        <div className="flex flex-row items-start justify-between w-full mt-12 bg-white h-full">
                            <h2 className="mb-2 ml-10 text-3xl font-semibold leading-tight text-primary-dark">
                                {header}
                            </h2>
                            {/* Cari */}
                            <div>
                                <TextInput
                                    className="w-64 mx-10"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        
                        {/* Informasi Profil */}
                        <div className='flex flex-row w-11/12 items-center justify-start bg-secondary-bg h-[200px] rounded-xl m-4 p-8'>
                            <div className="flex w-40 h-40 rounded-full bg-primary-dark"/>
                            <div className='flex flex-col items-start justify-center mx-10 text-primary-dark'>
                                <h3 className='text-md'>
                                    Selamat datang,
                                </h3>
                                <h1 className='text-3xl mb-3 font-medium'>
                                    {auth.user.name}
                                </h1>
                                <h3>
                                    NIDN: {auth.user.id}
                                    {/* NIDS: {auth.user.nids} */}
                                </h3>
                                <h3>
                                    Email: {auth.user.email}
                                    {/* Email: {auth.user.email} */}
                                </h3>
<<<<<<< HEAD
                                <h3>
                                    Nomor Telepon: {auth.user.id }
                                    {/* Nomor: {auth.user.nomor} */}
                                </h3>
                            </div>
                            
                        </div>
                        {/* Menu */}
                        <div className='flex flex-row flex-wrap w-full md:w-11/12 items-start justify-start bg-secondary-bg h-auto md:h-[420px] rounded-xl m-4 p-4 md:p-8'>
                            <div className='flex flex-col items-start justify-center mx-2 w-full md:w-auto'>
                                {children}
                            </div>
=======
                            </div>
                            
                        </div>
                        <div className='flex flex-row w-11/12 items-center justify-start bg-secondary-bg h-[330px] rounded-xl m-4 p-8'>
                        
                            {children}
                            
                            
>>>>>>> refs/remotes/origin/main
                        </div>
                    </div>

                    <div className='flex flex-col items-start pl-8 justify-start bg-primary-fg w-2/6 min-h-full rounded-tr-3xl rounded-br-3xl'>
                        <div className="flex flex-row items-center space-x-3 mt-14">
                            {/* Notifikasi */}
                            <h2 className="text-2xl font-medium leading-tight text-primary-dark ">
                                {header1} 
                            </h2>
<<<<<<< HEAD
                            <FaBell className='w-6 h-6 text-primary-dark'/>
=======
                           
                        </div>
                        <div className='flex flex-col items-center justify-center w-full'>
                                <div>
                                {notification && (
                                    <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 z-20 text-white text-center">
                                        {notification}
                                    </div>
                                )}
                                </div>
                            
>>>>>>> refs/remotes/origin/main
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default AuthenticatedLayout;