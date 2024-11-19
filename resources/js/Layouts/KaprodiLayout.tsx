import React, {useState} from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { FaCircleUser } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import TextInput from '@/Components/TextInput';
import { head } from 'framer-motion/client';

interface KaprodiLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const KaprodiLayout: React.FC<KaprodiLayoutProps> = ({ children, currentPage }) => {
    const { url } = usePage<PageProps>().props;
    const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
    const [searchTerm, setSearchTerm] = useState("");

    const handlePeriodChange = (period: string) => {
        setSelectedPeriod(period);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
    <div className="flex flex-col w-full min-h-screen bg-primary-bg md:flex sm:flex-row">
        <div className="flex flex-col w-full sm:w-1/6 lg:w-1/6 mt-4 mb-10 items-center">
        {/* Sidebar Parent */}
        <div className="flex flex-col items-center w-full h-screen min-h-screen justify-between overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dark-500 scrollbar-hidden z-5 mt-12">            
            <div className="flex flex-col items-start justify-center">
                {/* Magistra Logo */}
                <div className="flex w-full items-start justify-center text-2xl text-white">
                    <h1 className='font-semibold'>
                        MAGISTRA
                    </h1>
                </div>

                {/* Sidebar Menu */}
                <div className="flex flex-col items-start mt-8 text-center justify-center">
                    <div
                        className={`flex h-12 items-start justify-between space-x-4 flex-row text-white ${
                                url == "/dashboard" ? "" : " text-white opacity-50"}
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
                </div>
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
            </div>
            <div className="flex mb-24">
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
        
        <div className="flex flex-col flex-grow mt-4 mb-4 mr-4 rounded-3xl bg-white p-6">
          <div className="flex flex-wrap items-center justify-between mt-2">
            {/* Back & Current Page */}
            <div className="flex items-center mt-2 font-semibold text-2xl text-primary-dark gap-2">
                <IoChevronBack className='w-7 h-7'/>
                {currentPage}
            </div>

            <div className="flex flex-wrap items-center justify-between mt-2">   
                {/* Cari */}
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mr-4">
                    <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 ps-10 text-sm text-gray-600 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Cari..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="flex w-12 h-12 rounded-full bg-primary-dark"/>
            </div>
          </div>

        <div className="flex flex-col mt-6">
        {children}
        </div>
    </div>
</div>




  );
};

export default KaprodiLayout;
