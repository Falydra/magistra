import React, { useState } from "react";
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import PersetujuanIRSLayout from '@/Layouts/PersetujuanIRSLayout';

interface Student {
  no: number;
  nama: string;
  nim: string;
  semester: string;
  angkatan: string;
  ips: string;
  sksDiambil: string;
  status: string;
}

export default function PersetujuanIRS({ auth }: PageProps) {
  const { url } = usePage<PageProps>().props;
  const angkatanOptions = ["2021", "2022", "2023"];
  const [selectedAngkatan, setSelectedAngkatan] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const backPage = (
    <Link href={route("pembimbing.dashboard")}>
      <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
        Persetujuan IRS
      </h2>
    </Link>
  );

  const students: Student[] = [
    { no: 1, nama: "John Doe", nim: "123456789", semester: "5", angkatan: "2020", ips: "3.75", sksDiambil: "18", status: "Aktif" },
    { no: 2, nama: "Jane Smith", nim: "987654321", semester: "6", angkatan: "2019", ips: "3.60", sksDiambil: "20", status: "Aktif" },
    // Add more students here
  ];

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(students.map((_, index) => index.toString()));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (index: string) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  const selectAngkatan = (angkatan: string) => {
    setSelectedAngkatan(angkatan);
  };

  return (
    <PersetujuanIRSLayout 
    user={auth.user}
    Back = {backPage}
    >
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
              {angkatanOptions.map((angkatan) => (
                <li
                  key={angkatan}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    selectAngkatan(angkatan);
                    setIsDropdownOpen(false);
                  }}
                >
                  {angkatan}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons and Table Container */}
        <div className="w-full">
          <div className="flex items-center justify-start space-x-4 mb-4">
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

          {/* Table for displaying students */}
          <div className="relative overflow-x-auto sm:rounded-lg">
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
                        checked={selectedItems.length === students.length}
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
                  <th scope="col" className="px-6 py-3">KHS</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
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
                    <td className="px-6 py-4">{student.no}</td>
                    <td className="px-6 py-4">
                        {/* Nama yang bisa diklik */}
                        <Link href={route("pembimbing.detailMahasiswa")} className="text-blue-500 hover:underline">
                        {student.nama}
                        </Link>
                    </td>
                    <td className="px-6 py-4">{student.nim}</td>
                    <td className="px-6 py-4">{student.semester}</td>
                    <td className="px-6 py-4">{student.angkatan}</td>
                    <td className="px-6 py-4">{student.ips}</td>
                    <td className="px-6 py-4">{student.sksDiambil}</td>
                    <td className="px-6 py-4">{student.status}</td>
                    <td className="px-6 py-4">
                        {/* Nama yang bisa diklik */}
                        <Link href={route("pembimbing.khsMahasiswa")} className="text-blue-500 hover:underline">
                        lihat khs
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </PersetujuanIRSLayout>
  );
}
