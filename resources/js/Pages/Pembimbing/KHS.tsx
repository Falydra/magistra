import React from "react";
import { Head, Link } from '@inertiajs/react';
import PersetujuanIRSLayout from '@/Layouts/PersetujuanIRSLayout';
import { PageProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleCheck, faCircleXmark, faKey } from "@fortawesome/free-solid-svg-icons";

export default function KHS({ auth }: PageProps) {
    const studentInfo = {
        name: "Raden Rico Dwianda",
        nim: "24060212241084",
        program: "S1 Informatika",
        semester: "5 (Ganjil 2023/2024)",
        jumSKS: 24,
        IPS: 3.7,
        IPK: 3.8
    };

    const backPage = (
        <Link href={route("pembimbing.persetujuanIRS")}>
          <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
            Kartu Hasil Studi
          </h2>
        </Link>
      );

    const courses = [
        { code: "PAIK6501", name: "Pengembangan Berbasis Platform", sks: 3, type: "WAJIB", status: "Baru", nilaiHuruf:"B", bobot:3 },
        { code: "PAIK6702", name: "Teori Bahasa dan Otomata", sks: 3, type: "WAJIB", status: "Baru", nilaiHuruf:"A", bobot:4 },
        { code: "PAIK6504", name: "Proyek Perangkat Lunak", sks: 3, type: "WAJIB", status: "Baru", nilaiHuruf:"B", bobot:3 },
        { code: "PAIK6502", name: "Komputasi Tersebar Paralel", sks: 3, type: "WAJIB", status: "Baru", nilaiHuruf:"B", bobot:3 },
        { code: "PAIK6503", name: "Sistem Informasi", sks: 3, type: "WAJIB", status: "Baru", nilaiHuruf:"A", bobot:4 },
        { code: "PAIK6505", name: "Pembelajaran Mesin", sks: 3, type: "WAJIB", status: "Baru", nilaiHuruf:"B", bobot:3 },
    ];

    return (
        <PersetujuanIRSLayout 
        user={auth.user}
        Back = {backPage}
        >
            <Head title="KHS Mahasiswa" />
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
                            <td className="border px-2 py-1 font-semibold">Jumlah SKS</td>
                            <td className="border px-2 py-1">{studentInfo.jumSKS}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">IPS</td>
                            <td className="border px-2 py-1">{studentInfo.IPS}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">IPK</td>
                            <td className="border px-2 py-1">{studentInfo.IPK}</td>
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
                            <th className="border border-gray-300 px-2 py-1">Jenis</th>
                            <th className="border border-gray-300 px-2 py-1">Status</th>
                            <th className="border border-gray-300 px-2 py-1">Nilai Huruf</th>
                            <th className="border border-gray-300 px-2 py-1">Bobot</th>
                            <th className="border border-gray-300 px-2 py-1">SKS x Bobot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.code}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.name}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.sks}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.type}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.status}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.nilaiHuruf}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.bobot}</td>
                                <td className="border border-gray-300 px-2 py-1">{course.sks * course.bobot}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PersetujuanIRSLayout>
    );
}