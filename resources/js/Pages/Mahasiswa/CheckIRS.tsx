import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import PageLayout from "@/Layouts/PageLayout";
import { PageProps, MahasiswaProps, IRSProps, JadwalProps, IRSJadwalProps } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import { FaMoneyBills } from 'react-icons/fa6';
import { HiAcademicCap, HiBuildingLibrary } from 'react-icons/hi2';
import { LuFilePlus2 } from 'react-icons/lu';
import { CiPaperplane } from "react-icons/ci";
import { IoSendSharp } from "react-icons/io5";
import { use } from 'framer-motion/client';

export default function CheckIRS({ mahasiswa, irsJadwal, irs }: MahasiswaProps & IRSJadwalProps & IRSProps) {
    const { url } = usePage().props;
    const { auth } = usePage().props;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const selectedJadwalIds = irsJadwal.map(j => j.id);

    console.log(irs);

    

    const handleSubmit = async () => {
        try {
            const response = await fetch('/submit-irs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mahasiswa_nim: mahasiswa.nim,
                    irs_id: irs[0].id, // ID IRS
                    jadwal_ids: selectedJadwalIds, // Array ID jadwal yang dipilih
                }),
            });
    
            if (!response.ok) {
                // throw new Error(Error: ${response.statusText});
            }
    
            const data = await response.json();
    
            if (data.success) {
                alert(data.message);
                window.location.reload();
            } else {
                alert(data.message || 'Terjadi kesalahan.');
            }
        } catch (error) {
            console.error('Error submitting IRS:', error);
            alert('Gagal mengajukan IRS. Silakan coba lagi.');
        }
    };

    // console.log(irsJadwal);

    return (
        <PageLayout
            user={auth.user}
            back={
                <Link href={route("mahasiswa.dashboard")}>
                    <h2 className="mb-4 ml-10 text-3xl font-bold leading-tight text-primary-dark">
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                        IRS
                    </h2>
                </Link>
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
            <div className="w-full overflow-x-hidden overflow-y-auto px-12 h-screen">
                <div className="w-full overflow-y-auto min-h-[1000px]">
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
                                            ? " bg-primary-yellow text-yellow-600"
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
                    <tbody className='text-center scrollbar-hidden overflow-y-auto '>
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
                <div className='w-full flex flex-row items-center justify-end'>
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