import React, { ReactNode, useState } from "react";
import { Head, Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCircleCheck, faCircleXmark, faKey } from '@fortawesome/free-solid-svg-icons';
import PersetujuanIRSLayout from '@/Layouts/PersetujuanIRSLayout';
import { PageProps } from "@/types";
import { Inertia } from "@inertiajs/inertia";
import Modal from '@/Components/Modal';

interface IRS {
  status: string; 
  total_sks: number; 
  semester: number; 
}

interface Student {
  id: number; 
  nama: string; 
  nim: string; 
  ips: number;
  semester: number; 
  tahun_masuk: string; 
  latest_irs?: IRS; 
}

interface PaginatedStudents {
  links: any;
  data: Student[]; 
  current_page: number; 
  per_page: number; 
  total: number; 
}

interface Props {
  auth: PageProps; 
  students: PaginatedStudents; 
  angkatanPerwalian: string[]; 
}

export default function PersetujuanIRS({ auth, students, angkatanPerwalian }: Props) {
  const { url } = usePage<PageProps>().props;
  const [selectedAngkatan, setSelectedAngkatan] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  

  const filteredStudents = selectedAngkatan
  ? students.data.filter((student) => student.tahun_masuk === selectedAngkatan)
  : students.data;

  const selectAngkatan = (angkatan: string) => {
    setSelectedAngkatan(angkatan);
    setIsDropdownOpen(false);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(filteredStudents.map((_: any, index: number) => index.toString()));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (index: string) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };


  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      alert("Pilih setidaknya satu mahasiswa untuk disetujui.");
      return;
    }
  
    const selectedData = selectedItems.map((index) => {
      const student = filteredStudents[parseInt(index)];
      return { nim: student.nim, semester: student.semester };
    });
  
    if (selectedData.length === 0) {
      alert("Tidak ada data mahasiswa yang valid untuk disetujui.");
      return;
    }
  
    console.log("Data yang dikirim ke backend untuk approve:", { students: JSON.stringify(selectedData) });
  
    if (confirm("Apakah Anda yakin ingin menyetujui IRS untuk mahasiswa yang dipilih?")) {
      Inertia.post(
        '/approve-irs',
        { students: JSON.stringify(selectedData) }, 
        {
          onSuccess: () => {
            setSelectedItems([]);
            Inertia.visit('/pembimbing/persetujuanIRS');
          },
          onError: (error) => {
            console.error("Terjadi error saat menyetujui IRS:", error);
          }
        }
      );
    }
  };


  const handleCancel = () => {
    if (selectedItems.length === 0) {
      alert("Pilih setidaknya satu mahasiswa untuk dibatalkan.");
      return;
    }
  
    const selectedData = selectedItems.map((index) => {
      const student = filteredStudents[parseInt(index)];
      return { nim: student.nim, semester: student.semester };
    });
  
    if (selectedData.length === 0) {
      alert("Tidak ada data mahasiswa yang valid untuk dibatalkan.");
      return;
    }
  
    console.log("Data yang dikirim ke backend untuk cancel:", { students: JSON.stringify(selectedData) });
  
    if (confirm("Apakah Anda yakin ingin membatalkan IRS untuk mahasiswa yang dipilih?")) {
      Inertia.post(
        '/cancel-irs',
        { students: JSON.stringify(selectedData) }, 
        {
          onSuccess: () => {
            alert("IRS berhasil dibatalkan!");
            setSelectedItems([]); 
            Inertia.visit('/pembimbing/persetujuanIRS');
          },
          onError: (error) => {
            console.error("Terjadi error saat membatalkan IRS:", error);
            alert("Terjadi kesalahan. Silakan coba lagi.");
          }
        }
      );
    }
  };
  
  const backPage = (
    <Link href={route("pembimbing.dashboard")}>
      <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
        Persetujuan IRS
      </h2>
    </Link>
  );
  
  return (
    <PersetujuanIRSLayout user={auth.user} Back={backPage}>
      <Head title="Persetujuan IRS" />
      <div className="flex flex-col items-center justify-start w-full min-h-full bg-white z-10 rounded-3xl">
        <div className="flex flex-col items-start w-full px-8 mt-5">

          {/* Dropdown for Angkatan */}
          <div className="relative mb-5">
            <button
              id="angkatanDropdown"
              className="w-auto bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedAngkatan || "Pilih Angkatan"}
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={`ml-2 transform transition-transform inline-block ${isDropdownOpen ? "rotate-90" : "-rotate-90"}`}
              />
            </button>

            {isDropdownOpen && (
              <ul className="absolute z-10 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 py-1 overflow-auto text-sm left-0">
                {angkatanPerwalian.map((angkatan) => (
                  <li
                    key={angkatan}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectAngkatan(angkatan)}
                  >
                    {angkatan}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-start space-x-4 mb-4">
            <button onClick={handleSubmit} className="bg-button-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
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
          </div>

          {/* Table for Students */}
          <div className="relative overflow-x-auto sm:rounded-lg w-full">
            <table className="w-full text-md text-left text-black dark:text-gray-400">
              <thead className="text-md text-primary-bg uppercase bg-table-head dark:bg-gray-700 dark:text-gray-400 border-primary-bg border-y-2">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleSelectAll}
                        checked={selectedItems.length === filteredStudents.length}
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">No</th>
                  <th scope="col" className="px-6 py-3">Nama</th>
                  <th scope="col" className="px-6 py-3">NIM</th>
                  <th scope="col" className="px-6 py-3">Semester</th>
                  <th scope="col" className="px-6 py-3">Angkatan</th>
                  <th scope="col" className="px-6 py-3">IPS</th>
                  <th scope="col" className="px-6 py-3">SKS Diambil</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                <tr>
                <td colSpan={10} className="text-center py-4">Tidak ada mahasiswa yang ditemukan.</td>
              </tr>
            ) : (
              filteredStudents.map((student: Student, index: number) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${index}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={() => handleSelectItem(index.toString())}
                        checked={selectedItems.includes(index.toString())}
                      />
                      <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <td className="px-6 py-4">{(students.current_page - 1) * students.per_page + index + 1}</td>
                  <td className="px-6 py-4">
                    <Link href={route('pembimbing.detailMahasiswa', student.id)} className="text-blue-500 hover:underline">
                      {student.nama}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{student.nim}</td>
                  <td className="px-6 py-4">{student.semester}</td>
                  <td className="px-6 py-4">{student.tahun_masuk}</td>
                  <td className="px-6 py-4">{student.ips || 0}</td>
                  <td className="px-6 py-4">{student.latest_irs ? student.latest_irs.total_sks : 0}</td>
                  <td className="px-6 py-4 font-semibold">
                    {student.latest_irs ? (
                      <span
                        className={`${
                          student.latest_irs.status === "Disetujui"
                            ? "text-green-600"
                            : student.latest_irs.status === "Belum Disetujui" || student.latest_irs.status === "Dibatalkan"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      >
                        {student.latest_irs.status === "Belum Disetujui" ? "Belum Disetujui" : student.latest_irs.status}
                      </span>
                    ) : (
                      <span className="text-gray-600">Belum Mengajukan</span>
                    )}
                  </td>
                </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Links */}
          <div className="flex justify-end mt-5 space-x-3">
            {students.links.map((link: any, index: number) => (
              <Link
                key={index}
                href={link.url}
                className={`px-4 py-2 rounded-md ${link.active ? 'bg-primary-bg text-white' : 'bg-gray-200 text-gray-700'}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </div>
      </div>
    </PersetujuanIRSLayout>
  );
}
