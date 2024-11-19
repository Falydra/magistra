import React from "react";
import { Head, Link } from '@inertiajs/react';
import PersetujuanIRSLayout from '@/Layouts/PersetujuanIRSLayout';
import { PageProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleCheck, faCircleXmark, faKey } from "@fortawesome/free-solid-svg-icons";

export default function PersetujuanIRS({ auth }: PageProps) {
    const studentInfo = {
        name: "Raden Rico Dwianda",
        nim: "24060212241084",
        program: "S1 Informatika",
        semester: "5 (Ganjil 2023/2024)",
        maxSKS: 24,
        previousGPA: 3.7,
        advisor: "Jeremy Sutanto S.T., M.Kom.",
        status: "Belum Disetujui",
    };

    const backPage = (
        <Link href={route("pembimbing.persetujuanIRS")}>
          <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
            {studentInfo.name}
          </h2>
        </Link>
    );

    const courses = [
        { code: "PAIK6501", name: "Pengembangan Berbasis Platform", sks: 3, class: "B", room: "E101", status: "Baru", schedule: "Senin, 13.00-15.30" },
        { code: "PAIK6702", name: "Teori Bahasa dan Otomata", sks: 3, class: "B", room: "A303", status: "Baru", schedule: "Selasa, 07.00-09.30" },
        { code: "PAIK6504", name: "Proyek Perangkat Lunak", sks: 3, class: "B", room: "K202", status: "Baru", schedule: "Rabu, 07.00-09.30" },
        { code: "PAIK6502", name: "Komputasi Tersebar Paralel", sks: 3, class: "B", room: "A303", status: "Baru", schedule: "Rabu, 09.40-12.10" },
        { code: "PAIK6503", name: "Sistem Informasi", sks: 3, class: "B", room: "E101", status: "Baru", schedule: "Kamis, 13.00-15.30" },
        { code: "PAIK6505", name: "Pembelajaran Mesin", sks: 3, class: "B", room: "E102", status: "Baru", schedule: "Jumat, 07.00-09.30" },
    ];

    return (
        <PersetujuanIRSLayout 
        user={auth.user}
        Back={backPage}
        >
            <Head title="Detail Mahasiswa" />
            <div className="w-full p-6 bg-white rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Informasi Mahasiswa</h3>
                <table className="w-full mb-6 border border-gray-300">
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Nama</td>
                            <td className="border px-2 py-1">{studentInfo.name}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">NIM</td>
                            <td className="border px-2 py-1">{studentInfo.nim}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Program Studi</td>
                            <td className="border px-2 py-1">{studentInfo.program}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Semester</td>
                            <td className="border px-2 py-1">{studentInfo.semester}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Maksimum SKS</td>
                            <td className="border px-2 py-1">{studentInfo.maxSKS}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">IPS Sebelumnya</td>
                            <td className="border px-2 py-1">{studentInfo.previousGPA}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Dosen Pembimbing Akademik</td>
                            <td className="border px-2 py-1">{studentInfo.advisor}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Status</td>
                            <td className="border px-2 py-1 text-yellow-600">{studentInfo.status}</td>
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
                            <th className="border border-gray-300 px-2 py-1">Status</th>
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
                                <td className="border border-gray-300 px-2 py-1">{course.status}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.schedule}</td>
                            </tr>
                        ))}
                        <tr className="text-center text-lg font-semibold">
                            <td colSpan={3} className="border border-gray-300 p-2">Total SKS Diambil </td>
                            <td>{courses.reduce((sum, course) => sum + course.sks, 0)} SKS</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-10 flex gap-4 justify-start">
                    <button className="bg-button-btngreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        Setujui IRS
                        <FontAwesomeIcon icon={faCircleCheck} className="ml-2" />
                    </button>

                    <button className="bg-button-btnred hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        Batalkan IRS
                        <FontAwesomeIcon icon={faCircleXmark} className="ml-2" />
                    </button>

                    <button className="bg-primary-bg hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        Izinkan Ubah
                        <FontAwesomeIcon icon={faKey} className="ml-2 transform rotate-95" />
                    </button>
                 </div>
            </div>
        </PersetujuanIRSLayout>
    );
}