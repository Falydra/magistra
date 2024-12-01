import React, { useState } from 'react';
import KaprodiLayout from '@/Layouts/KaprodiLayout';
import TableComponent from '@/Components/Table';
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const MonitoringIRS: React.FC = () => {
  const IRSMhs = [
    { nama: "Sherli Arninda", nim: "24060122120028", angkatan: "2021", ipk: "4.0", sksk: "21" },
    { nama: "Sausan Berliana Arrizqi", nim: "24060122130092", angkatan: "2022", ipk: "3.9", sksk: "21" },
    { nama: "Daffa Aly Meganendra", nim: "24060122140140", angkatan: "2023", ipk: "3.8", sksk: "21" },
    { nama: "Raden Rico Dwianda", nim: "24060122140184", angkatan: "2024", ipk: "3.7", sksk: "19" },
    { nama: "Sherli Arninda", nim: "24060122120028", angkatan: "2021", ipk: "4.0", sksk: "21" },
    { nama: "Sausan Berliana Arrizqi", nim: "24060122130092", angkatan: "2022", ipk: "3.9", sksk: "21" },
    { nama: "Daffa Aly Meganendra", nim: "24060122140140", angkatan: "2023", ipk: "3.8", sksk: "21" },
    { nama: "Raden Rico Dwianda", nim: "24060122140184", angkatan: "2024", ipk: "3.7", sksk: "19" },
    { nama: "Sherli Arninda", nim: "24060122120028", angkatan: "2021", ipk: "4.0", sksk: "21" },
    { nama: "Sausan Berliana Arrizqi", nim: "24060122130092", angkatan: "2022", ipk: "3.9", sksk: "21" },
    { nama: "Daffa Aly Meganendra", nim: "24060122140140", angkatan: "2023", ipk: "3.8", sksk: "21" },
    { nama: "Raden Rico Dwianda", nim: "24060122140184", angkatan: "2024", ipk: "3.7", sksk: "19" },
  ];

  const columnConfig = [
    { header: "Nama", accessor: "nama" },
    { header: "NIM", accessor: "nim" },
    { header: "Angkatan", accessor: "angkatan" },
    { header: "IPK", accessor: "ipk" },
    { header: "SKSk", accessor: "sksk" },
    { header: "Status", accessor: "status"}
  ];

  return (
    <div>
      <KaprodiLayout currentPage='Monitoring IRS'>
        <div className='flex flex-col items-start justify-between ml-8'>
          
          <div className="flex flex-row items-center mb-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white text-sm font-medium rounded-md px-4 py-1.5 focus:ring-4 me-4 mb-2 bg-button-green hover:bg-button-hv_green focus:ring-green-500"
            >
              Setujui IRS
              <FaCheckCircle className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white text-sm font-medium rounded-md px-3 py-1.5 focus:ring-4 me-4 mb-2 bg-button-red hover:bg-button-hv_red focus:ring-red-500"
            >
              Batalkan IRS
              <MdCancel className="w-5 h-5" />
            </button>
          </div>
          
          {/* Table with dynamic entries per page */}
        <TableComponent data={IRSMhs} columns={columnConfig} />
        </div>

        
      </KaprodiLayout>
    </div>
  );
};

export default MonitoringIRS;
