import React, {useState} from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { FaCircleUser } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";

interface KaprodiLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const KaprodiLayout: React.FC<KaprodiLayoutProps> = ({ children, currentPage }) => {
    const { url } = usePage<PageProps>().props;
    const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
    const [searchTerm, setSearchTerm] = useState("");

    const handleBack = () => {
        window.history.back();  // Mengarahkan ke halaman sebelumnya
    };

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
        <div className="flex flex-col items-center w-full h-screen min-h-screen justify-between overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dark-500 z-5 mt-12">
            <div className="flex flex-col items-start justify-center">
                {/* Magistra Logo */}
                <div className="flex w-full items-start justify-center text-2xl text-white">
                    <h1 className='font-semibold'>
                        MAGISTRA
                    </h1>
                </div>

                {/* Sidebar Menu */}
                <div className="flex flex-col items-start mt-8 text-center justify-center">
                    {/* Dashboard */}
                    <div
                        className={`flex h-12 items-start justify-between space-x-4 flex-row text-white ${
                            url == "/kaprodi/dashboard" ? "text-white" : "opacity-50"
                        } hover:opacity-100 group`}
                    >
                        <TbAppsFilled className="w-6 h-6 group-hover:text-white" />
                        <Link href={route("kaprodi.dashboard")} className={`${url == "kaprodi/dashboard" ? "text-white" : "group-hover:text-white"}`}>
                            Dashboard
                        </Link>
                    </div>

                    {/* Profil */}
                    <div
                        className={`flex h-12 items-start justify-between space-x-4 flex-row text-white ${
                            url == "/profil" ? "text-white" : "opacity-50"
                        } hover:opacity-100 group`}
                    >
                        <FaCircleUser className="w-6 h-6 group-hover:text-white" />
                        <Link href={route("dashboard")} className={`${url == "/profil" ? "text-white" : "group-hover:text-white"}`}>
                            Profil
                        </Link>
                    </div>

                    <Link href={route("kaprodi.buatJadwal")}>
                        <div
                            className={`flex h-12 items-center justify-between space-x-4 flex-row text-white ${
                                url == "/kaprodi/penyusunan-jadwal/buat-jadwal" ? "text-white" : "opacity-50"
                            } hover:opacity-100 group`}
                        >
                            <FaCalendarAlt className="w-6 h-6 group-hover:text-white" />
                            <div className="flex flex-col text-left group-hover:text-white">
                                <span className={url == "/kaprodi/penyusunan-jadwal/buat-jadwal" ? "text-white" : ""}>Penyusunan</span>
                                <span className={url == "/kaprodi/penyusunan-jadwal/buat-jadwal" ? "text-white" : ""}>Jadwal</span>
                            </div>
                        </div>
                    </Link>

                    

                    {/* Monitoring IRS */}
                    <Link href={route("kaprodi.monitoringIRS")}>
                        <div
                            className={`flex h-12 items-center justify-between mt-2 space-x-4 flex-row text-white ${
                                url == "/kaprodi/monitoring" ? "text-white" : "opacity-50"
                            } hover:opacity-100 group`}
                        >
                            <MdMonitor className="w-6 h-6 group-hover:text-white" />
                            <span className={url == "/kaprodi/monitoring" ? "text-white" : "group-hover:text-white"}>
                                Monitoring IRS
                            </span>
                        </div>
                    </Link>
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
            <div className="flex items-center mt-2 font-semibold text-3xl text-primary-dark gap-2">
                <IoChevronBack 
                    className="w-7 h-7 cursor-pointer hover:text-button-hv_blue" 
                    onClick={handleBack} 
                />
                {currentPage}
            </div>

            {/* Profil */}
            
            <div className="flex flex-wrap items-center justify-between mt-2">   
                <div className="flex w-12 h-12 rounded-full bg-primary-dark"/>
                </div>
            </div>

        <div className="flex flex-col mt-2 rounded-md">
            {children}
        </div>
    </div>
</div>
  );
};

export default KaprodiLayout;
