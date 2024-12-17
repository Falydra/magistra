import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import PageLayout from "@/Layouts/PageLayout";
import { MahasiswaProps } from "@/types";
import { FaMoneyBills } from "react-icons/fa6";
import { Link, usePage } from "@inertiajs/react";
import { url } from "inspector";
import { HiAcademicCap, HiBuildingLibrary } from "react-icons/hi2";
import { LuFilePlus2 } from "react-icons/lu";

export default function Pembayaran({ auth, mahasiswa }: MahasiswaProps) {
    // State untuk status pembayaran
    const {url} = usePage().props;
    const [paymentStatus, setPaymentStatus] = useState("Belum Lunas");

    // Fungsi untuk menangani perubahan status
    const handleBayar = () => {
        setPaymentStatus("Lunas");
    };

    return (
        <PageLayout
            user={auth.user}
            back={
                <div className="ml-10 mt-8 text-black">
                    <h1>Dashboard / Pembayaran</h1>
                </div>
            }
            sidebarChildren={
                <>
                    <div
                        className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                            url == "/mahasiswa/registrasi" ? "" : " text-white opacity-100"
                        }`}
                    >
                        <HiAcademicCap className="w-8 h-8" />
                        <Link href={route("mahasiswa.registrasi")}>Registrasi</Link>
                    </div>
                    <div
                        className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                            url == "/mahasiswa/pembayaran" ? "" : " text-white opacity-100"
                        }`}
                    >
                        <FaMoneyBills className="w-8 h-8" />
                        <Link href={route("mahasiswa.pembayaran")}>Pembayaran</Link>
                    </div>
                    <div
                        className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                            url == "/mahasiswa/irs" ? "" : " text-white opacity-100"
                        }`}
                    >
                        <LuFilePlus2 className="w-8 h-8" />
                        <Link href={route("mahasiswa.irs")}>IRS</Link>
                    </div>
                    <div
                        className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${
                            url == "/mahasiswa/khs" ? "" : " text-white opacity-100"
                        }`}
                    >
                        <HiBuildingLibrary className="w-8 h-8" />
                        <Link href={route("mahasiswa.khs")}>KHS</Link>
                    </div>
                </>
            }
        >
            <div className="w-full ml-24 flex flex-col items-start justify-start h-screen space-y-8 mt-12">
                <div className="flex flex-col border-2 border-black w-4/12 items-start justify-start space-y-2 pl-4 h-2/5">
                    <div className="flex flex-row w-full items-center justify-between">
                        <h1 className="text-md font-semibold mt-2">Tagihan Pembayaran</h1>
                        <Button
                            onClick={handleBayar}
                            className="border-primary-dark text-primary-dark font-semibold mt-2 mr-2"
                            size="sm"
                            variant="outline"
                        >
                            <FaMoneyBills className="mr-2" />
                            Bayar
                        </Button>
                    </div>
                    <h3>Billkey: {mahasiswa.nim}</h3>
                    <h3>Nama: {mahasiswa.nama}</h3>
                    <h3>Semester: {mahasiswa.semester}</h3>
                    <h3 className="flex-row flex">
                        Status:
                        <div
                            className={`ml-4 text-center items-center flex-col w-[125px] rounded-md flex justify-center ${
                                paymentStatus === "Lunas"
                                    ? "bg-green-500 bg-opacity-70"
                                    : "bg-red-500 bg-opacity-70"
                            }`}
                        >
                            <h3 className="rounded-md">{paymentStatus}</h3>
                        </div>
                    </h3>
                </div>
                <div className="flex flex-col border-2 border-black w-4/12 items-start justify-start space-y-2 h-1/4">
                    <table className="min-w-full text-center border table-fixed">
                        <thead className="p-2">
                            <tr className="p-2">
                                <th className="py-3 border">No</th>
                                <th className="py-3 border">UKT</th>
                                <th className="py-3 border">Tagihan</th>
                                <th className="py-3 border">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td className="py-3 border">{mahasiswa.semester}</td>
                                <td className="py-3 border">III</td>
                                <td className="py-3 border">Rp. 3.000.000</td>
                                <td className="py-3 border">
                                    <div
                                        className={`ml-4 rounded-md ${
                                            paymentStatus === "Lunas"
                                                ? "bg-green-500 bg-opacity-70"
                                                : "bg-red-500 bg-opacity-70"
                                        }`}
                                    >
                                        {paymentStatus}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </PageLayout>
    );
}
