import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import KaprodiLayout from "./KaprodiLayout";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { FaThList } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";

interface PenyusunanJadwalLayout {
    children: React.ReactNode;
    currentPage: React.ReactNode;
}

const PenyusunanJadwalLayout: React.FC<PenyusunanJadwalLayout> = ({ children, currentPage }) => {
    const { url } = usePage<PageProps>().props;

    const currentRoute = route().current() || '';
    const isActive = (currentRoute: string | undefined, targetRoutes: string | string[]) => {
        // Pastikan currentRoute tidak undefined
        if (currentRoute === undefined) return false;
    
        if (Array.isArray(targetRoutes)) {
            return targetRoutes.includes(currentRoute);
        }
        return currentRoute === targetRoutes;
    };
    
    
    return (
        <KaprodiLayout currentPage="Penyusunan Jadwal">
            <div className="flex flex-col gap-2 w-full">
                <div className="ml-8 flex flex-row justify-start gap-2 items-start w-full">
                    {/* menu header */}
                    <div className="flex items-center">
                    <Link
                        href={route("kaprodi.buatJadwal")}
                        className={`flex flex-row items-center gap-2 ${
                            isActive(currentRoute, "kaprodi.buatJadwal")
                                ? "text-gray-600 bg-primary-fg" 
                                : "text-gray-500"
                        } hover:bg-primary-fg focus:bg-primary-fg rounded-md text-sm px-2 lg:px-3 py-1 lg:py-1 focus:outline-none`}
                    >
                        <FaRegCalendarPlus className="w-4 h-4" />
                        Buat Jadwal
                    </Link>
                    </div>

                    <div className="flex items-center">
                        <a
                            href={route("kaprodi.ringkasanJadwal")}
                            className={`flex flex-row items-center gap-2 ${
                                isActive(currentRoute,"kaprodi.ringkasanJadwal") 
                                ? " text-gray-600 bg-primary-fg" 
                                : "text-gray-500"
                            } hover:bg-primary-fg focus:bg-primary-fg rounded-md text-sm px-2 lg:px-3 py-1 lg:py-1 focus:outline-none`}
                        >
                            <FaThList className="w-4 h-4" />
                            Ringkasan Jadwal
                        </a>
                    </div>

                    <div className="flex items-center">
                    <Link
                        href={route("kaprodi.aturMK")}
                        className={`flex flex-row items-center gap-2 ${
                            isActive(currentRoute, ["kaprodi.aturMK", "kaprodi.tambahMK"]) 
                                ? "text-gray-600 bg-primary-fg" 
                                : "text-gray-500"
                        } hover:bg-primary-fg focus:bg-primary-fg rounded-md text-sm px-2 lg:px-3 py-1 lg:py-1 focus:outline-none`}
                    >
                        <BsFillPencilFill className="w-4 h-4" />
                        Atur Ketentuan Mata Kuliah
                    </Link>

                    </div>
                </div>
                {/* garis */}
                <hr className="border-t-1 ml-8 border-gray-300" />

                <div className="ml-10 flex flex-row mt-2 text-primary-dark font-medium text-2xl">
                    {currentPage}
                </div>

                <div className="flex w-full ml-2 z-10">
                    {children}
                    </div>
            </div>
        </KaprodiLayout>
    );
};

export default PenyusunanJadwalLayout;
