import React, { useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import PageLayout from "@/Layouts/PageLayout";
import { PageProps, MahasiswaProps, IRSProps, JadwalProps, IRSJadwalProps } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import { FaMoneyBills } from 'react-icons/fa6';
import { HiAcademicCap, HiBuildingLibrary } from 'react-icons/hi2';
import { LuFilePlus2 } from 'react-icons/lu';
import { IoSendSharp } from "react-icons/io5";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/Components/ui/breadcrumb';
import { Inertia } from '@inertiajs/inertia';
import { toast } from '@/hooks/use-toast';

export default function CheckIRS({ mahasiswa, irsJadwal, irs, mahasiswaDetail }: MahasiswaProps & IRSJadwalProps & IRSProps) {
    const { url } = usePage().props;
    const { auth } = usePage().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const selectedJadwalIds = irsJadwal.map(j => j.id);

    console.log(irs);
    console.log(mahasiswa);
    console.log(irsJadwal);

    const handleSubmit = async () => {
        const conflicts = selectedJadwalIds.some((id, index) => {
            const jadwal1 = irsJadwal.find(j => j.id === id);
            return selectedJadwalIds.some((otherId, otherIndex) => {
                if (index !== otherIndex) {
                    const jadwal2 = irsJadwal.find(j => j.id === otherId);
                    if (jadwal1 && jadwal2) {
                        return (
                            jadwal1.hari === jadwal2.hari &&
                            jadwal1.waktu_mulai < jadwal2.waktu_akhir &&
                            jadwal1.waktu_akhir > jadwal2.waktu_mulai
                        );
                    }
                }
                return false;
            });
        });

        if (conflicts) {
            toast({
                variant: 'destructive',
                title: 'Konflik Jadwal',
                description: 'Ada konflik jadwal, silahkan pilih jadwal yang tidak bertabrakan.',
                className: 'bg-primary-red',
            });
            return;
        }

        Inertia.post(route('mahasiswa.submitIRS'), {
            mahasiswa_nim: mahasiswa.nim,
            irs_id: irs[0].id,
            jadwal_ids: selectedJadwalIds,
        });
    };

    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printableContent = printRef.current;
        if (!printableContent) {
            alert("Bagian yang akan dicetak tidak ditemukan!");
            return;
        }

        const originalContent = document.body.innerHTML;
        const printContent = printableContent.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); 
    };

    console.log(selectedJadwalIds);
    

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
                            <BreadcrumbPage>Check IRS</BreadcrumbPage>
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
            <div className="flex flex-col w-11/12 items-center justify-center mx-12 my-8 overflow-y-auto">
                <div className="w-full overflow-y-auto overflow-x-auto" ref={printRef} id='printable-section'>
                    <table className="w-full mb-6 border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Nama</td>
                                <td className="border px-2 py-1">{mahasiswa.nama}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">NIM</td>
                                <td className="border px-2 py-1">{mahasiswa.nim}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Program Studi</td>
                                <td className="border px-2 py-1">{mahasiswa.prodi}</td>
                            </tr>
                            {irs.map((irs) => (
                                <tr key={irs.id}>
                                    <td className="border px-2 py-1 font-semibold">Semester</td>
                                    <td className="border px-2 py-1">{irs.semester}</td>
                                </tr>
                            ))}
                            {irs.map((irs) => (
                                <tr key={irs.id}>
                                    <td className="border px-2 py-1 font-semibold">Total SKS</td>
                                    <td className="border px-2 py-1">{irs.total_sks}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Maksimum SKS</td>
                                <td className="border px-2 py-1">
                                    {mahasiswa.ips >= 3.0 ? 24 : 20} SKS
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">IPS Sebelumnya</td>
                                <td className="border px-2 py-1">{mahasiswa.ips}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Dosen Pembimbing Akademik</td>
                                <td className="border px-2 py-1">{mahasiswa.dosen_pembimbing ?? 'Tidak ada dosen pembimbing'}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Status</td>
                                <td
                                    className={`border px-2 py-1 font-semibold ${
                                        mahasiswa.status_irs === "Disetujui"
                                            ? " bg-primary-green text-green-600"
                                            : mahasiswa.status_irs === "Belum Disetujui" || mahasiswa.status_irs === "Dibatalkan"
                                            ? " bg-primary-yellow text-yellow-600"  :  mahasiswa.status_irs === "Diajukan"
                                            ? " bg-button-hv_yellow bg-opacity-25 text-yellow-600"
                                            : " bg-primary-red text-red-600"
                                    }`}
                                >
                                    {mahasiswa.status_irs}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="min-w-full text-center border table-fixed">
                        <thead className='p-8 '>
                            <tr className='p-8'>
                                <th className='py-3 border'>No</th>
                                <th className='py-3 border'>Kode MK</th>
                                <th className='py-3 border'>Mata Kuliah</th>
                                <th className='py-3 border'>SKS</th>
                                <th className='py-3 border'>Kelas</th>
                                <th className='py-3 border'>Ruang</th>
                                <th className='py-3 border'>Jadwal</th>
                            </tr>
                        </thead>
                        <tbody className='text-center  '>
                            {irsJadwal.map((jadwal, index) => (
                                <tr key={jadwal.id} className='border'>
                                    <td className='py-3 border'>{index + 1}</td>
                                    <td className='py-3 border'>{jadwal.kode_mk}</td>
                                    <td className='py-3 border'>{jadwal.nama}</td>
                                    <td className='py-3 border'>{jadwal.sks}</td>
                                    <td className='py-3 border'>{jadwal.kelas}</td>
                                    <td className='py-3 border'>{jadwal.kode_ruang}</td>
                                    <td className='py-3 border'>{jadwal.hari} {jadwal.waktu_mulai} - {jadwal.waktu_akhir}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='w-full flex flex-row items-center justify-between'>
                    <button 
                            onClick={handlePrint}
                            className='w-60 h-12 mt-4 text-white bg-primary-bg flex-row flex justify-center items-center rounded-lg self-end'>
                            <LuFilePlus2 className='w-6 h-6 text-white '/>   
                            Cetak IRS
                        </button>
                        <button 
                            onClick={handleSubmit}
                            className='w-60 h-12 mt-4 text-white bg-primary-green flex-row flex justify-center items-center rounded-lg self-end'>
                            Ajukan ke Pembimbing
                            <IoSendSharp className='w-6 h-6 ml-2 text-white '/>   
                        </button>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}