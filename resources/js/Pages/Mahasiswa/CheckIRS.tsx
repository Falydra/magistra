import React from 'react';
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


export default function CheckIRS({ mahasiswa, irsJadwal, irs }: MahasiswaProps & IRSJadwalProps & IRSProps) {
    const {url} = usePage().props;
    const { auth } = usePage().props;


    const handleSubmit = async (status: string) => {
        try {
            const response = await fetch('/api/submit-irs', { // Ganti dengan endpoint backend yang sesuai
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mahasiswa_id: mahasiswa.id, // ID mahasiswa untuk referensi
                    status: irs[0].status,                    // Status pengajuan IRS
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const data = await response.json();
    
            if (data.success) {
                alert('IRS berhasil diajukan ke pembimbing.');
                // Tindakan tambahan seperti reload halaman atau update data
            } else {
                alert('Terjadi kesalahan dalam pengajuan IRS.');
            }
        } catch (error) {
            console.error('Error submitting IRS:', error);
            alert('Gagal mengajukan IRS. Silakan coba lagi.');
        }
    };

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
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Semester</td>
                                <td className="border px-2 py-1">{mahasiswa.semester}</td>
                            </tr>
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
                        {irsJadwal.map((irsItem, index) => {
                            const isFirstOccurrence = index === 0 || irsItem.kode_mk !== irsJadwal[index - 1].kode_mk;

                            return (
                                <React.Fragment key={irsItem.id}>
                                    <tr className="border">
                                        {isFirstOccurrence && (
                                            <>
                                                <td className="py-3 border" rowSpan={irsJadwal.filter(j => j.kode_mk === irsItem.kode_mk).length}>
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 border" rowSpan={irsJadwal.filter(j => j.kode_mk === irsItem.kode_mk).length}>
                                                    {irsItem.kode_mk}
                                                </td>
                                                <td className="py-3 border" rowSpan={irsJadwal.filter(j => j.kode_mk === irsItem.kode_mk).length}>
                                                    {irsItem.nama}
                                                </td>
                                                <td className="py-3 border" rowSpan={irsJadwal.filter(j => j.kode_mk === irsItem.kode_mk).length}>
                                                    {irsItem.sks}
                                                </td>
                                                <td className="py-3 border" rowSpan={irsJadwal.filter(j => j.kode_mk === irsItem.kode_mk).length}>
                                                    {irsItem.kelas}
                                                </td>
                                                <td className="py-3 border" rowSpan={irsJadwal.filter(j => j.kode_mk === irsItem.kode_mk).length}>
                                                    {irsItem.kode_ruang}
                                                </td>
                                                <td className="py-3 border" rowSpan={irsJadwal.filter(j => j.kode_mk === irsItem.kode_mk).length}>
                                                {irsItem.hari}, {irsItem.waktu_mulai} - {irsItem.waktu_akhir}
                                                </td>

                                                
                                            </>
                                        )}
                                       
                                    </tr>
                                    {index === 11 && (
                                        <tr className="border">
                                            <td className="py-3 border" colSpan={8}>
                                                {/* //Show the kode_sks from irs */}
                                                Total Sks yang diambil: {irs[0].total_sks}
                                                
                                               
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                <div className='w-full flex flex-row items-center justify-end'>
                    <button 
                    onChange={() => handleSubmit("Belum Disetujui")}
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