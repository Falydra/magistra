import React from 'react';
import KaprodiLayout from '@/Layouts/KaprodiLayout';
import TableComponent from '@/Components/Table';
import { header } from 'framer-motion/client';

const MonitoringIRS: React.FC = () => {
  const IRSMhs = [
    { nama: "Sherli Arninda", nim: "24060122120028", angkatan: "2022", ipk: "4.0", sksk: "21" },
    { nama: "Sausan Berliana Arrizqi", nim: "24060122130092", angkatan: "2022", ipk: "3.9", sksk: "21" },
    { nama: "Daffa Aly Meganendra", nim: "24060122140140", angkatan: "2022", ipk: "3.8", sksk: "21" },
    { nama: "Raden Rico Dwianda", nim: "24060122140184", angkatan: "2022", ipk: "3.7", sksk: "19" },
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
        <div className='flex flex-row ml-8'>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
        </div>
         <TableComponent data={IRSMhs} columns={columnConfig} />
      </KaprodiLayout>
    </div>
  );
};

export default MonitoringIRS;


// import React, { useEffect, useState } from 'react';
// import KaprodiLayout from '@/Layouts/KaprodiLayout';
// import TableComponent from '@/Components/Table';
// import axios from 'axios';

// interface IRSData {
//   no: string;
//   nama: string;
//   nim: string;
//   angkatan: string;
//   ipk: string;
//   sks: string;
// }

// const MonitoringIRS: React.FC = () => {
//   const [IRSMhs, setIRSMhs] = useState<IRSData[]>([]);
//   const [loading, setLoading] = useState(true);

//   const columnConfig = [
//     { header: "No", accessor: "no" },
//     { header: "Nama", accessor: "nama" },
//     { header: "NIM", accessor: "nim" },
//     { header: "Angkatan", accessor: "angkatan" },
//     { header: "IPK", accessor: "ipk" },
//     { header: "SKS", accessor: "sks" },
//   ];

//   useEffect(() => {
//     const fetchIRSMhs = async () => {
//       try {
//         const response = await axios.get('/api/irs'); // Adjust the endpoint as needed
//         setIRSMhs(response.data);
//       } catch (error) {
//         console.error("Error fetching IRS data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIRSMhs();
//   }, []);

//   return (
//     <div>
//       <KaprodiLayout currentPage='Monitoring IRS'>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <TableComponent data={IRSMhs} columns={columnConfig} />
//         )}
//       </KaprodiLayout>
//     </div>
//   );
// };

// export default MonitoringIRS;
