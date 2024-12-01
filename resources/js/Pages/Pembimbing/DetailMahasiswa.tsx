import React, { ReactNode } from "react";
import { Head, Link } from '@inertiajs/react';
import PersetujuanIRSLayout from '@/Layouts/PersetujuanIRSLayout';
import { PageProps } from "@/types";  // Pastikan tipe PageProps sudah benar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleCheck, faCircleXmark, faKey } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";

interface IRS {
    status: string;
    jadwal?: Jadwal[]; // Pastikan properti ini sesuai dengan data Anda
}

interface Jadwal {
    mataKuliah: MataKuliah;
    kelas: string;
    ruang: string;
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
}

interface MataKuliah {
    kode_mk: string;
    nama: string;
    sks: number;
} 
interface Mahasiswa {
    irs: IRS | null;
    program: ReactNode;
    pembimbing_id: ReactNode;
    id: number;
    nama: string;
    nim: string;
    semester: string;
    tahun_masuk: string;
    ipk: string;
    sksDiambil: string;// Assuming 'irs' is an array of IRS records
}

export default function DetailMahasiswa({ auth, student }: { auth: PageProps; student: Mahasiswa }) {
    const backPage = (
        <Link href={route("pembimbing.persetujuanIRS")}>
            <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
                <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                {student.nama}
            </h2>
        </Link>
    );

    const courses = student.irs?.jadwal?.map((jadwal: Jadwal) => ({
        code: jadwal.mataKuliah?.kode_mk || "Tidak tersedia",
        name: jadwal.mataKuliah?.nama || "Tidak tersedia",
        sks: jadwal.mataKuliah?.sks || 0,
        class: jadwal.kelas || "Tidak tersedia",
        room: jadwal.ruang || "Tidak tersedia",
        status: student.irs?.status || "Tidak tersedia",
        schedule: `${jadwal.hari || "Tidak tersedia"}, ${jadwal.jam_mulai || ""}}`,
    })) || [];

    const handleSubmit = () => {
        // Mengecek jika status IRS belum dipilih atau tidak sesuai
        if (!student.irs || student.irs.status === "Setujui IRS") {
          alert("IRS sudah disetujui atau status tidak valid.");
          return;
        }
      
        // Mengirimkan request untuk menyetujui IRS
        Inertia.post(
          '/approve-irs',
          { student_id: student.id },
          {
            onSuccess: () => {
              alert('IRS mahasiswa telah disetujui!');
              // Reload halaman atau redirect sesuai kebutuhan
              Inertia.visit('/pembimbing/detailMahasiswa');
            },
            onError: (errors) => {
              console.error("Error:", errors);
              alert('Terjadi kesalahan saat menyetujui IRS.');
            }
          }
        );
      };
      
      const handleCancel = () => {
        // Mengecek jika status IRS tidak sesuai atau sudah dibatalkan
        if (!student.irs || student.irs.status === "Batalkan IRS") {
          alert("IRS sudah dibatalkan atau status tidak valid.");
          return;
        }
      
        // Mengirimkan request untuk membatalkan IRS
        Inertia.post(
          '/cancel-irs',
          { student_id: student.id },
          {
            onSuccess: () => {
              alert('IRS mahasiswa telah dibatalkan!');
              // Reload data atau redirect sesuai kebutuhan
              Inertia.reload({ only: ['students'] });
            },
            onError: (errors) => {
              console.error("Error:", errors);
              alert('Terjadi kesalahan saat membatalkan IRS.');
            }
          }
        );
      };
      

    return (
        <PersetujuanIRSLayout user={auth.user} Back={backPage}>
            <Head title="Detail Mahasiswa" />
            <div className="w-full p-6 bg-white rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Informasi Mahasiswa</h3>
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
                            <td className="border px-2 py-1">{student.program}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Semester</td>
                            <td className="border px-2 py-1">{student.semester}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Maksimum SKS</td>
                            <td className="border px-2 py-1">{student.sksDiambil}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">IPS Sebelumnya</td>
                            <td className="border px-2 py-1">{student.ipk}</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Dosen Pembimbing Akademik</td>
                            <td className="border px-2 py-1">{student.pembimbing_id}</td> {/* Nama pembimbing */}
                        </tr>
                        <tr>
                            <td className="border px-2 py-1 font-semibold">Status</td>
                            <td className="border px-2 py-1 text-yellow-600">{student.irs?.status || "Tidak tersedia"}</td>
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
                    {courses.map((course: any, index: number) => (
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
                            <td>{courses.reduce((sum: number, course: any) => sum + course.sks, 0)} SKS</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-10 flex gap-4 justify-start">
                    <button onClick={handleSubmit} className="bg-button-btngreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                        Setujui IRS
                        <FontAwesomeIcon icon={faCircleCheck} className="ml-2" />
                    </button>

                    <button onClick={handleCancel} className="bg-button-btnred hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
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
