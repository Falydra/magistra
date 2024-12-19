import { Button } from "@/Components/ui/button";
import PageLayout from "@/Layouts/PageLayout";
import { IRSProps, MahasiswaProps, PageProps, IRS } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaMoneyBills, FaPlus } from "react-icons/fa6";
import { HiAcademicCap, HiBuildingLibrary } from "react-icons/hi2";
import { LuFilePlus2 } from "react-icons/lu";
import { FaPen } from "react-icons/fa6";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/Components/ui/breadcrumb";
import { toast } from "@/hooks/use-toast";

interface DataIRS extends PageProps {
    irs: IRS[]
}

export default function IRSMahasiswa({ auth, mahasiswa }: MahasiswaProps) {
    const { url } = usePage().props;
    const { irs } = usePage<DataIRS>().props;

    const Paginateprops = ["5", "10", "25", "50"];

    const handlePageChange = (url: string | null) => {
        if (url) {
            Inertia.get(url);
        }
    };

    

    const handleDelete = (id: number) => {
        Inertia.delete(route("mahasiswa.deleteIRS", { id }),
    {
        onSuccess: () => {
            // Reset all selected IDs, checkboxes, radio buttons, and total SKS
            toast({
                variant: "default",
                className: "bg-green-500",
                title: "Berhasil",
                description: "IRS berhasil dihapus",
                duration: 2500,
               
            })
        }
    })
        
        ;
    };

    const currentSemesterIRS = irs.find((item) => item.semester === mahasiswa.semester);
    const canAddIRS = !currentSemesterIRS;

    console.log(irs);

    // Belum melakukan registrasi
    if (mahasiswa.kode_registrasi === "000") {
        return (
            <PageLayout
                user={auth.user}
                back={
                    <>
                        <Breadcrumb className="ml-10 mt-8 text-black">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
                                        </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            
                                        <BreadcrumbItem>
                                    <BreadcrumbPage>IRS</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </>
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
                <div className="flex w-full flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-semibold text-primary-dark">
                        Anda belum melakukan registrasi.
                    </h1>
                    <h1 className="text-2xl font-semibold text-primary-dark">
                        Silahkan lakukan registrasi terlebih dahulu.
                    </h1>
                    <Button
                        variant="outline"
                        className="w-32 h-12 border-primary-dark mt-8 text-lg border-2"
                        onClick={() => {
                            //Route to Registrasi
                            Inertia.get(route("mahasiswa.registrasi"));
                        }}
                    >
                        Registrasi
                    </Button>
                </div>
            </PageLayout>
        );
    }

    // Ambil Cuti
    if (mahasiswa.kode_registrasi === "001") {
        return (
            <PageLayout
                user={auth.user}
                back={
                    <>
                        <Breadcrumb className="ml-10 mt-8 text-black">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
                                        </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            
                                        <BreadcrumbItem>
                                    <BreadcrumbPage>IRS</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </>
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
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <h1 className="text-2xl font-semibold text-primary-dark">
                        Anda sebagai mahasiswa dengan status Cuti tidak dapat melakukan
                        pengambilan IRS.
                    </h1>
                </div>
            </PageLayout>
        );
    }

    // Jika kode_registrasi adalah 100 (atau Aktif), tampilkan halaman dengan tabel CRUD
    return (
        <PageLayout
            user={auth.user}
            back={
                <>
                <Breadcrumb className="ml-10 mt-8 text-black">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/mahasiswa/dashboard">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    
                                <BreadcrumbItem>
                            <BreadcrumbPage>IRS</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </>
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
            <div className="flex flex-col w-full h-screen items-start justify-start space-y-2">
                <div className="flex w-full flex-row items-center justify-start ml-10 mt-2   text-primary-bg">
                    <h1 className="text-2xl font-semibold">{mahasiswa.nama} |</h1>
                    <h1 className="text-2xl font-semibold">| {mahasiswa.nim}</h1>
                </div>
                <div className="flex w-full flex-row items-center justify-between pl-10 space-x-4">
                    <div className="flex items-center space-x-4">
                        Tampilkan
                        <select className="w-20 h-10 ml-2 border-2 border-primary-dark rounded-md">
                            {Paginateprops.map((paginate) => (
                                <option key={paginate} value={paginate}>
                                    {paginate}
                                </option>
                            ))}
                        </select>
                        <div className="flex w-1/12 flex-row items-center justify-between">
                            <select className="w-full h-10 border-2 border-primary-dark rounded-md">
                                <option value="Filter" disabled>
                                    Filter
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                    </div>
                    {canAddIRS && (
                        <div>
                            <Button
                                variant="default"
                                className="rounded-md bg-primary-green w-32 h-10 mr-10 flex text-center  items-center justify-center text-white"
                                onClick={() => Inertia.get(route("mahasiswa.tambahirs"))}
                            >
                                <FaPlus className="w-6 h-6 self-start" />
                                Tambah IRS
                            </Button>
                        </div>
                    )}
                </div>
                <div className='w-full overflow-x-auto scrollbar-hidden px-10'>
                    <table className="min-w-full text-center border table-fixed">
                        <thead className='p-8'>
                            <tr className='p-8'>
                                <th className='py-3 border'>Nama</th>
                                <th className='py-3 border'>NIM</th>
                                <th className='py-3 border '>Angkatan</th>
                                <th className='py-3 border '>Semester</th>
                                <th className='py-3 border '>Total SKS</th>
                                <th className='py-3 border '>Status</th>
                                <th className='py-3 border '>IRS</th>
                                <th className='py-3 border '>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {irs.length > 0 ? (
                                irs.map((item, index) => (
                                    <tr key={index} className="border">
                                        <td className="py-3 border">{mahasiswa.nama}</td>
                                        <td className="py-3 border">{mahasiswa.nim}</td>
                                        <td className="py-3 border">{mahasiswa.tahun_masuk}</td>
                                        <td className="py-3 border">{item.semester}</td>
                                        <td className="py-3 border">{item.total_sks}</td>
                                        <td className="py-3 border">{item.status}</td>
                                        <td className="py-3 border">
                                            <Link href={route("mahasiswa.checkIRS", { semester: item.semester })}>
                                                <Button variant="default" className="bg-primary-dark items text-white">
                                                    <FaPen className="mr-4" />
                                                    Detail
                                                </Button>
                                            </Link>
                                        </td>
                                        <td className=" border space-x-2 items-center flex-col justify-center text-white">
                                            {item.status === "Disetujui" || item.status === "Dibatalkan" ?
                                              <Button variant="default" className="bg-yellow-400 cursor-not-allowed" disabled>Edit</Button>
                                                :
                                                 <Button variant="default" className="bg-yellow-400" onClick={() => Inertia.visit('/mahasiswa/tambahirs')}>Edit</Button>
                                            }
                                         

                                            {item.status === "Disetujui" ?
                                                <Button variant="default" className="bg-red-500 text-white cursor-not-allowed" disabled>
                                                    <FaTrashAlt />
                                                </Button>
                                                :
                                                <Button variant="default" className="bg-red-500 text-white"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <FaTrashAlt />
                                                </Button>
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-3 border">
                                        Tidak ada data IRS yang tersedia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageLayout>
    );
}