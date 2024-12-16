import React, { ReactNode, useRef } from "react";
import { Head, Link } from '@inertiajs/react';
import PersetujuanIRSLayout from '@/Layouts/PersetujuanIRSLayout';
import { PageProps } from "@/types";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleCheck, faCircleXmark, faKey, faPrint } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";

interface IRS {
    status: string;
    jadwal?: Jadwal[]; 
}
interface Ruang{
    kode_ruang:string;
}
interface Waktu{
    waktu_mulai:Date;
}
interface Jadwal {
    kode_mk?: MataKuliah;
    sks?: MataKuliah;
    mata_kuliah?: MataKuliah;
    kelas: string;
    ruang?:Ruang;
    hari: string;
    waktu_mulai?: Waktu;
    waktu_akhir: string;
    kode_ruang: string
}

interface MataKuliah {
    kode_mk: string;
    nama: string;
    sks: number;
    
}
interface Mahasiswa {
    irs: IRS | null;
    kode_prodi: string;
    prodi?: Prodi;
    pembimbing_id?: ReactNode;
    pembimbing?:Pembimbing;
    id: number;
    nama: string;
    nim: string;
    semester: string;
    tahun_masuk: string;
    ips: number;
    sksDiambil: string;
}


interface Prodi {
    kode_prodi: string;
    nama: string;
}

interface Pembimbing{
    dosen?:Dosen;
}
interface Dosen{
    nama : string;
}
export default function DetailMahasiswa({ auth, student, jadwal, semester, irs }: { auth: PageProps; student: Mahasiswa, jadwal: Jadwal[], semester: string, irs: IRS }) {
    console.log("Data mahasiswa:", student);
    console.log(jadwal)
    console.log(irs)



    if (!student) {
        return <div>Data mahasiswa tidak ditemukan.</div>;
}
    const backPage = (
        <Link href={route("pembimbing.persetujuanIRS")}>
            <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
                <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                {student.nama}
            </h2>
        </Link>
    );
    const courses = jadwal?.map((jadwal: Jadwal, index: number) => ({
        code: jadwal.kode_mk || "Tidak tersedia",
        name: jadwal.mata_kuliah || "Tidak tersedia",
        sks: jadwal.sks || 0,
        class: jadwal.kelas || "Tidak tersedia",
        room: jadwal.ruang || "Tidak tersedia",
        status: irs.status || "Tidak tersedia",
        schedule: `${jadwal.hari || "Tidak tersedia"}, ${jadwal.waktu_mulai || "Tidak tersedia"} - ${jadwal.waktu_akhir || "Tidak tersedia"}`,
    })) || [];

    console.log("Jadwal mahasiswa:", courses);
    
    // Approve
    const handleApprove = (studentId: number) => {
        if (irs.status === "Disetujui") {
            alert("IRS untuk mahasiswa ini sudah disetujui!");
            return;
        }
        if (confirm("Apakah Anda yakin ingin menyetujui IRS ini?")) {
            Inertia.post(
                route('irs.approve', { id: studentId }),
                {},
                {
                    onSuccess: () => {
                        alert('IRS telah disetujui!');
                        Inertia.visit(`/pembimbing/detailMahasiswa/${studentId}`);
                    },
                }
            );
        }
    };
    // Batalkan
    const handleCancel = () => {
        if (student.irs?.status === "Dibatalkan") {
            alert("IRS untuk mahasiswa ini sudah dibatalkan!");
            return; 
        }
        if (confirm('Apakah Anda yakin ingin membatalkan IRS ini?')) {
            Inertia.post(route('irs.cancel', { id: student.id }), {}, {
                onSuccess: () => {
                    Inertia.visit('/pembimbing/detailMahasiswa');
                },
            });
        }
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


    return (
        <PersetujuanIRSLayout user={auth.user} Back={backPage}>
            <Head title="Detail Mahasiswa" />
            <div className="w-full p-6 bg-white rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Informasi Mahasiswa</h3>
                <div ref={printRef} id="printable-section">
                    <table className="w-full mb-6 border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Nama</td>
                                <td className="border px-2 py-1">{student.nama}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">NIM</td>
                                <td className="border px-2 py-1">{student.nim}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Program Studi</td>
                                <td className="border px-2 py-1">{student.prodi?.nama}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Semester</td>
                                <td className="border px-2 py-1">{student.semester}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Maksimum SKS</td>
                                <td className="border px-2 py-1">
                                    {student.ips >= 3.0 ? 24 : 22} SKS
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">IPS Sebelumnya</td>
                                <td className="border px-2 py-1">{student.ips}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Dosen Pembimbing Akademik</td>
                                <td className="border px-2 py-1">{student.pembimbing?.dosen?.nama ?? 'Tidak ada dosen pembimbing'}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1 font-semibold">Status</td>
                                <td
                                    className={`border px-2 py-1 font-semibold ${
                                        irs?.status === "Disetujui"
                                        ? "text-green-600"
                                        : irs?.status === "Belum Disetujui" || irs?.status === "Dibatalkan"
                                        ? "text-yellow-600"
                                        : "text-gray-600"
                                    }`}
                                    >
                                    {irs?.status || "Tidak tersedia"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-2 py-1">No</th>
                                <th className="border border-gray-300 px-2 py-1">Kode MK</th>
                                <th className="border border-gray-300 px-2 py-1">Mata Kuliah</th>
                                <th className="border border-gray-300 px-2 py-1">SKS</th>
                                <th className="border border-gray-300 px-2 py-1">Kelas</th>
                                <th className="border border-gray-300 px-2 py-1">Ruang</th>
                                <th className="border border-gray-300 px-2 py-1">Jadwal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {courses.map((course, index) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                            <td className="border border-gray-300 px-2 py-1">{course.code}</td>
                            <td className="border border-gray-300 px-2 py-1">{course.name}</td>
                            <td className="border border-gray-300 px-2 py-1">{course.sks}</td>
                            <td className="border border-gray-300 px-2 py-1">{course.class}</td>
                            <td className="border border-gray-300 px-2 py-1">{course.room}</td>
                            <td className="border border-gray-300 px-2 py-1">{course.schedule}</td>
                        </tr>
                    ))}
                    <tr className="text-center text-lg font-semibold">
                        <td colSpan={3} className="border border-gray-300 p-2">Total SKS Diambil</td>
                        <td>{courses.reduce((sum, course) => sum + course.sks, 0)} SKS</td>
                    </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-10 flex gap-4 justify-start">
                    <button onClick={(e) => handleApprove(student.id)} className="bg-button-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        Setujui IRS
                        <FontAwesomeIcon icon={faCircleCheck} className="ml-2" />
                    </button>

                    <button onClick={handleCancel} className="bg-button-red hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        Batalkan IRS
                        <FontAwesomeIcon icon={faCircleXmark} className="ml-2" />
                    </button>

                    <button className="bg-primary-bg hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        Izinkan Ubah
                        <FontAwesomeIcon icon={faKey} className="ml-2 transform rotate-95" />
                    </button>
                    <button onClick={handlePrint} className="bg-primary-bg hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        Cetak
                        <FontAwesomeIcon icon={faPrint} className="ml-2 transform rotate-95" />
                    </button>
                </div>
            </div>
        </PersetujuanIRSLayout>
    );
}
