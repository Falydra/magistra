import React, {ReactNode} from 'react';
import { usePage, Link } from "@inertiajs/react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { PageProps } from '@/types';
import { FaCircleUser } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";
import { RxExit } from "react-icons/rx";
import { FaBell } from "react-icons/fa";
import TextInput from '@/Components/TextInput';


interface KaprodiDashboardProps {}

const KaprodiDashboard: React.FC<KaprodiDashboardProps> = ({}) => {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage<PageProps>().props;

    return (
    <div className="flex flex-col w-full min-h-screen bg-primary-bg md:flex sm:flex-row">

        {/* Sidebar */}
        <div className="flex flex-col w-full sm:w-1/6 lg:w-1/6 mt-4 mb-10 items-center">
            <div className="flex flex-col items-center w-full h-screen min-h-screen justify-between overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dark-500 z-5 mt-12">
                <div className="flex flex-col items-start justify-center">
                    {/* Magistra Logo */}
                    <div className="flex w-full items-start justify-center text-2xl text-white">
                        <h1 className="font-semibold">MAGISTRA</h1>

                    </div>

                    {/* Sidebar Menu */}
                    <div className="flex flex-col items-start mt-8 text-center justify-center">
                        {/* Dashboard */}
                        <div
                            className={`flex h-12 items-start justify-between space-x-4 flex-row text-white ${
                                url === "/kaprodi/dashboard" ? "text-white" : "opacity-50"
                            } hover:opacity-100 group`}
                        >
                            <TbAppsFilled className="w-6 h-6 group-hover:text-white" />
                            <Link
                                href={route("kaprodi.dashboard")}
                                className={
                                    url === "/kaprodi/dashboard" ? "text-white" : "group-hover:text-white"
                                }
                            >
                                Dashboard
                            </Link>
                        </div>

                        {/* Profil */}
                        <div
                            className={`flex h-12 gap-4 items-start justify-between space-x-4 flex-row text-white ${
                                url === "/profil" ? "text-white" : "opacity-50"
                            } hover:opacity-100 group`}
                        >
                            <FaCircleUser className="w-6 h-6 group-hover:text-white" />
                            {/* <Link
                                href={route("dashboard")}  */}
                                
                                Profil
                            {/* </Link> */}
                        </div>

                        {/* Penyusunan Jadwal */}
                        <Link href={route("kaprodi.buatJadwal")}>
                            <div
                                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white ${
                                    url === "/penyusunanJadwal" ? "text-white" : "opacity-50"
                                } hover:opacity-100 group`}
                            >
                                <FaCalendarAlt className="w-6 h-6 group-hover:text-white" />
                                <div className="flex flex-col text-left group-hover:text-white">
                                    <span className={url === "/penyusunanJadwal" ? "text-white" : ""}>Penyusunan</span>
                                    <span className={url === "/penyusunanJadwal" ? "text-white" : ""}>Jadwal</span>
                                </div>
                            </div>
                        </Link>

                        {/* Monitoring IRS */}
                        <Link href={route("kaprodi.monitoringIRS")}>
                            <div
                                className={`flex h-12 items-center justify-between mt-2 space-x-4 flex-row text-white ${
                                    url === "/kaprodi/monitoring" ? "text-white" : "opacity-50"
                                } hover:opacity-100 group`}
                            >
                                <MdMonitor className="w-6 h-6 group-hover:text-white" />
                                <span
                                    className={
                                        url === "/kaprodi/monitoring"
                                            ? "text-white"
                                            : "group-hover:text-white"
                                    }
                                >
                                    Monitoring IRS
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Logout */}
                <div className="flex mb-24">
                    <div
                        className={`flex h-12 items-center justify-between space-x-4 flex-row text-white mr-12 text-xl ${
                            url === "/" ? "" : "text-white opacity-50"
                        }`}
                    >
                        <RxExit className="w-6 h-6" />
                        <Link href={route("logout")} method="post" className="">
                            Keluar
                        </Link>
                    </div>
                </div>
            </div>
    </div>

    {/* Main Content */}
    <div className="flex flex-col flex-grow mt-4 mb-4 rounded-tl-3xl rounded-bl-3xl bg-white p-6">
        {/* Header */}
        <div className="flex flex-row items-start justify-between w-full mt-4">
            <h2 className="ml-4 text-3xl font-semibold text-primary-dark">Dashboard</h2>
            <TextInput className="w-64 mr-4" placeholder="Search" />
        </div>

        {/* Profile Info */}
        <div className="flex items-center bg-secondary-bg h-[200px] rounded-xl mt-8 m-4 p-8">
            <div className="w-40 h-40 rounded-full bg-primary-dark" />
            <div className="flex flex-col mx-10 text-primary-dark">
                <h3 className="text-md">Selamat datang,</h3>
                <h1 className="text-3xl mb-3 font-medium">{auth.user.name}</h1>
                <h3>NIDN: {auth.user.id}</h3>
                <h3>Email: {auth.user.email}</h3>
                <h3>Nomor Telepon: {auth.user.id}</h3>
            </div>
        </div>

        {/* Menu */}
        <div className="flex flex-row flex-wrap bg-secondary-bg rounded-xl m-4 p-8">
            <div className="flex flex-col gap-4 w-full">
                {/* Penyusunan Jadwal */}
                <Link href={route("kaprodi.buatJadwal")}>
                    <div className='flex items-start justify-start bg-primary-light hover:bg-button-hv_light rounded-xl p-4'>
                        <div>
                            <img src="/images/calendar.png" alt="Penyusunan Jadwal" className='w-24 h-24' />
                        </div>
                        <div className='items-start justify-start mt-4 mx-6 text-primary-dark'>
                            <h1 className='text-2xl font-semibold'> Penyusunan Jadwal </h1>
                            <h1 className='text-sm font-light'> Susun jadwal program studi selama 1 semester di sini! </h1>
                        </div>
                    </div>
                </Link>

                {/* Monitoring IRS */}
                <Link href={route("kaprodi.monitoringIRS")}>
                    <div className='flex items-start justify-start bg-primary-light hover:bg-button-hv_light rounded-xl p-4'>
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
        </div>
    </div>

     {/* Notifikasi */}
     <div className="flex flex-col mt-4 mb-4 mr-4 items-start pl-8 bg-primary-fg w-1/4 rounded-tr-3xl rounded-br-3xl">
        <div className="flex items-center space-x-3 mt-12">
            <h2 className="text-2xl font-medium text-primary-dark">Notifikasi</h2>
            <FaBell className="w-6 h-6 text-primary-dark" />
        </div>
    </div>
</div>
            

    );
};



export default KaprodiDashboard;
