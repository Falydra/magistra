import React, { ReactNode } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import TextInput from '@/Components/TextInput';
import { FaCircle, FaBell } from "react-icons/fa";
import { TbAppsFilled } from "react-icons/tb";
import { RxExit } from "react-icons/rx";

interface AuthenticatedLayoutProps {
    user: User;
    header?: ReactNode;
    header1?: ReactNode;
    children?: ReactNode;
    childrenSideBar?: ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
    user,
    header,
    header1,
    children,
    childrenSideBar,
}) => {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex-col hidden w-full min-h-screen bg-primary-bg md:flex sm:flex-row">
                {/* Sidebar */}
                <div className="flex flex-col w-full sm:w-2/5 lg:w-1/5 bg-transparent mt-4 mb-10 ml-4 items-center">
                    <div className="flex flex-col items-center w-full h-screen justify-between overflow-y-auto lg:fixed lg:w-1/5 sm:w-2/5 bg-dark-500 scrollbar-hidden z-5 mt-12">
                        {/* Logo */}
                        <div className="flex w-full items-start justify-center text-2xl text-white">
                            <h1 className="font-semibold">MAGISTRA</h1>
                        </div>

                        {/* Sidebar Menu */}
                        <div className="flex flex-col items-start mt-8 text-center">
                            <div
                                className={`flex h-12 items-center space-x-4 text-white ${
                                    url === "/dashboard" ? "opacity-50" : "opacity-100"
                                }`}
                            >
                                <TbAppsFilled className="w-6 h-6" />
                                <Link href={route("dashboard")}>Dashboard</Link>
                            </div>
                            <div
                                className={`flex h-12 items-center space-x-4 text-white ${
                                    url === "/profil" ? "opacity-100" : "opacity-50"
                                }`}
                            >
                                <FaCircle className="w-6 h-6" />
                                <Link href={route("profile.edit")}>Profil</Link>
                            </div>
                            {childrenSideBar}
                        </div>

                        {/* Logout */}
                        <div className="flex mb-24">
                            <div
                                className={`flex h-12 items-center space-x-4 text-white ${
                                    url === "/" ? "opacity-100" : "opacity-50"
                                }`}
                            >
                                <RxExit className="w-6 h-6" />
                                <Link href={route("logout")} method="post">
                                    Keluar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-row w-full m-4 bg-white md:w-[2000px] rounded-3xl">
                    <div className="flex flex-col w-4/5 bg-white z-10 rounded-3xl">
                        {/* Header */}
                        <div className="flex items-start justify-between w-full mt-12">
                            <h2 className="ml-10 text-3xl font-semibold text-primary-dark">{header}</h2>
                            <TextInput className="w-64 mx-10" placeholder="Search" />
                        </div>

                        {/* Profile Info */}
                        <div className="flex items-center w-11/12 bg-secondary-bg h-[200px] rounded-xl m-4 p-8">
                            <div className="w-40 h-40 rounded-full bg-primary-dark" />
                            <div className="flex flex-col mx-10 text-primary-dark">
                                <h3 className="text-md">Selamat datang,</h3>
                                <h1 className="text-3xl mb-3 font-medium">{auth.user.name}</h1>
                                <h3>NIDN: {auth.user.id}</h3>
                                <h3>Email: {auth.user.email}</h3>
                                <h3>Nomor Telepon: {auth.user.id}</h3>
                            </div>
                        </div>

                        {/* Children Content */}
                        <div className="flex flex-row flex-wrap w-full md:w-11/12 bg-secondary-bg rounded-xl m-4 p-8">
                            {children}
                        </div>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex flex-col items-start pl-8 bg-primary-fg w-2/6 min-h-full rounded-tr-3xl rounded-br-3xl">
                        <div className="flex items-center space-x-3 mt-14">
                            <h2 className="text-2xl font-medium text-primary-dark">{header1}</h2>
                            <FaBell className="w-6 h-6 text-primary-dark" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthenticatedLayout;
