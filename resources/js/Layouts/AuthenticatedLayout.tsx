import React, { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface AuthenticatedLayoutProps {
    header?: ReactNode;
   
    children?: ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ header, children }) => {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex-col hidden w-full min-h-screen bg-blue-400 md:flex sm:flex-row">
                <div className="flex flex-col w-full sm:w-2/5 lg:w-1/5 bg-white mt-10 mb-10 ml-10 items-center">
                    <div className="flex flex-col items-center w-full h-screen min-h-screen py-12 overflow-y-auto lg:fixed lg:w-1/5 sm:w2/5 bg-dcf-dark-500 scrollbar-hidden">
                        <div className="flex w-32 h-32 rounded-full bg-dcf-orange-300"></div>
                        <h1 className="pt-4 text-2xl font-bold text-center text-white">
                            {auth.user.name}
                        </h1>
                        <h3 className="text-sm font-light text-center text-white">
                            {auth.user.email}
                        </h3>
                        <div className="flex flex-col items-center w-full mt-8 text-center">
                            {/* <ul className="flex flex-col items-center justify-center w-full text-center">
                                <div
                                    className={`flex w-full h-12 items-center justify-center text-white ${
                                        url == "/dashboard" ? "bg-dcf-orange-300" : ""
                                    }`}
                                >
                                    <li>
                                        <Link href={route("dashboard")}>Dashboard</Link>
                                    </li>
                                </div>
                                <div
                                    className={`flex w-full h-12 items-center justify-center text-white ${
                                        url == "/dashboard/perlombaan" ? "bg-dcf-orange-300" : ""
                                    }`}
                                >
                                    <li>
                                        <Link href={route("dashboard.perlombaan")}>
                                            Perlombaan
                                        </Link>
                                    </li>
                                </div>
                                <div
                                    className={`flex w-full h-12 items-center justify-center text-white ${
                                        url == "/dashboard/seminar" ? "bg-dcf-orange-300" : ""
                                    }`}
                                >
                                    <li>
                                        <Link href={route("dashboard.seminar")}>
                                            Seminar
                                        </Link>
                                    </li>
                                </div>
                                <div
                                    className={`flex w-full h-12 items-center justify-center text-white ${
                                        url == "/profil" ? "bg-dcf-orange-300" : ""
                                    }`}
                                >
                                    <li>
                                        <Link href={route("profil.edit")}>
                                            Profil
                                        </Link>
                                    </li>
                                </div>
                                <div
                                    className={`flex w-full h-12 items-center justify-center text-white`}
                                >
                                    <li>
                                        <Link href={(route("logout"))} method="post" className="text-orange-500">
                                            Log Out
                                        </Link>
                                    </li>
                                </div>
                            </ul> */}
                        </div>
                    </div>
                    
                </div>
                
                
                <div className="flex flex-col items-center justify-start w-4/5 min-h-screen px-2">
                    <div className="flex flex-row items-center justify-between w-full mt-12 bg-transparent h-fit">
                        <h2 className="mb-3 ml-4 text-3xl font-bold leading-tight text-transparent text-gray-800 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text">
                            {header}
                        </h2>
                    </div>
                    <main className="w-full px-4">{children}</main>
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