import React, { useState, useEffect } from 'react';
import { usePage, Link, Head } from "@inertiajs/react";
import PenyusunanJadwalLayout from "@/Layouts/PenyusunanJadwalLayout";
import TableComponent from '@/Components/Table';

import { FaThList } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

interface Dosen {
    id: number;
    nama: string;
}

interface Prodi {
  id: number;
  kode_prodi: string;
  nama: string;
}

interface Jadwal {
    id: number;
    hari: string;
    waktu_mulai: string;
    waktu_akhir: string;
    kelas: string;
    ruang: string;
    kode_mk: string;
    mata_kuliah: string;
    sks: number;
    jenis: string;
    kuota: number;
    dosen: string;
}

const RingkasanJadwal: React.FC = () => {
    const [jadwal, setJadwal] = useState<Jadwal[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showInput, setShowInput] = useState(false);
    const [prodiList, setProdiList] = useState<Prodi[]>([]);
    const [selectedProdi, setSelectedProdi] = useState(''); 
    const daysPriority = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    // Fungsi edit jadwal
    const handleEdit = (item: any) => {
      const editData = {
          kelas: item.kelas,
          hari: item.hari,
          ruang: item.ruang,
          waktu_mulai: item.waktu_mulai,
          waktu_akhir: item.waktu_akhir,
          kode_mk: item.kode_mk,
          sks: item.sks,
          semester: item.semester,
      };
      sessionStorage.setItem("editData", JSON.stringify(editData)); // Simpan data di sessionStorage
      window.location.href = "/kaprodi/penyusunan-jadwal/edit-jadwal"; 
  };

    // Fungsi hapus jadwal
    const handleDelete = (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
          fetch(`/jadwal/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "", 
            },
          })
            .then(async (response) => {
              const data = await response.json();
              console.log("Response status:", response.status);
              console.log("Response data:", data);
      
              if (response.ok) {
                setJadwal((prev) => prev.filter((item) => item.id !== id));
                alert("Jadwal berhasil dihapus!");
              } else {
                alert(data.message || "Gagal menghapus jadwal!");
              }
            })
            .catch((err) => {
              console.error("Error:", err);
              alert("Terjadi kesalahan saat menghapus jadwal!");
            });
        }
      };
  
    const columnConfig = [
        { header: "Hari", accessor: "hari" },
        {
            header: "Waktu",
            accessor: (item: any) => (
              <div
                style={{
                  width: "90px", 
                }}
              >
                {`${item.waktu_mulai.slice(0, 5)} - ${item.waktu_akhir.slice(0, 5)}`} {/* Format Waktu */}
              </div>
            ),
          },
        { header: "Ruang", accessor: "ruang" },
        { header: "Kelas", accessor: "kelas" },
        {
            header: "Mata Kuliah",
            accessor: (item: any) => {
              const { semester, kode_mk, mata_kuliah, sks } = item; 
              return (
                <div
                  style={{
                    width: "250px", 
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <div className='text-primary-dark' style={{ fontSize: "15px" }}>{mata_kuliah}</div> 
                  <div className="text-gray-500 text-sm">{`${kode_mk}, ${sks} SKS`}</div> 
                </div>
              );
            },
          },
        { header: "Kuota", accessor: "kuota" },
        {
            header: "Dosen",
            accessor: (item: any) => {
              const dosenString = typeof item.dosen === "string" ? item.dosen : "-"; 
              return (
                <div
                  style={{
                    maxWidth: "300px",
                    fontSize: "13px",
                    textAlign: "left",
                    whiteSpace: "pre-wrap", 
                  }}
                > 
                  {dosenString}
                </div>
              );
            },
          },
          {
            header: "Aksi",
            accessor: (item: any) => (
              <div className="flex items-center gap-2">
                {/* Edit */}
                <button
                  onClick={() => handleEdit(item)}
                  className="text-primary-bg hover:to-button-hv_blue"
                  title="Edit Jadwal"
                >
                  <FaPen/>
                </button>
          
                {/* Hapus */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-button-red hover:text-button-hv_red"
                  title="Hapus Jadwal"
                >
                <FaTrash/>
                </button>
              </div>
            ),
          },
    ];
  
    const sortJadwal = (jadwal: Jadwal[]) => {
        return jadwal.sort((a, b) => {
          // Urutkan berdasarkan hari menggunakan index dari daysPriority
          const dayDiff = daysPriority.indexOf(a.hari) - daysPriority.indexOf(b.hari);
          if (dayDiff !== 0) {
            return dayDiff;
          }
          // Jika hari sama, urutkan berdasarkan waktu_mulai
          return a.waktu_mulai.localeCompare(b.waktu_mulai);
        });
      };

    const handleAjukanKeDekan = () => {
      if (!selectedProdi) {
        alert("Silakan pilih program studi!");
        return;
      }
    
      const jadwalIds = jadwal.map((item) => item.id); 
      fetch('/ajukan-ke-dekan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ jadwal_ids: jadwalIds, kode_prodi: selectedProdi }), 
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(`Jadwal berhasil diajukan ke dekan! Kode Jadwal Prodi: ${data.kode_jadwal_prodi}`);
            setShowInput(false); 
            setSelectedProdi("");
          } else {
            alert('Gagal mengajukan jadwal ke dekan!');
          }
        })
        .catch((err) => {
          console.error('Error:', err);
          alert('ERRORRRR');
        });
    };
      
    useEffect(() => {
    fetch("/jadwal")
        .then((response) => response.json())
        .then((data) => {
        if (data.success) {
            const sortedJadwal = sortJadwal(data.data); 
            setJadwal(sortedJadwal);
        } else {
            setError("Gagal mengambil data.");
        }
        })
        .catch((err) => {
        setError(err.message);
        console.error(err);
        })

      const fetchProdi = async () => {
        try {
          const response = await fetch('/daftar-prodi');
          const data = await response.json();
    
          if (response.ok && data.success) {
            setProdiList(data.data); 
          } else {
            alert('Gagal mengambil daftar prodi.');
          }
        } catch (error) {
          console.error('Error fetching prodi:', error);
          alert('Terjadi kesalahan saat memuat daftar prodi.');
        }
      };
    
      fetchProdi();
    }, []);
    
    return (
      <PenyusunanJadwalLayout
        currentPage={
          <div className="flex flex-row items-center gap-2">
            <FaThList className="w-6 h-6 text-primary-dark" />
            <span>Ringkasan Jadwal</span>
          </div>
        }
      >
      <Head title='Ringkasan Jadwal'/>
       <div className="flex flex-col justify-start ml-8">
        <div className="flex flex-row items-center justify-start text-gray-400 font-light text-sm mb-2">
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              disabled={jadwal.length === 0} 
              className={`gap-2 px-3 py-1 rounded-md text-sm font-medium flex items-center ${
                jadwal.length === 0
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "bg-button-green hover:bg-button-hv_green text-white" 
              }`}
            >
              Ajukan ke Dekan
              <IoSendSharp />
            </button>
          ) : (
              <div className="flex flex-col gap-2">
                <select
                  value={selectedProdi}
                  onChange={(e) => setSelectedProdi(e.target.value)} 
                  className="border rounded px-3 py-2 text-gray-700 text-sm w-64"
                >
                  <option value="">Pilih Program Studi</option>
                  {prodiList.map((prodi) => (
                    <option key={prodi.id} value={prodi.kode_prodi}>
                      {prodi.nama}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAjukanKeDekan} 
                  className="gap-2 bg-button-green hover:bg-button-hv_green text-white px-3 py-1 rounded-md text-sm font-medium flex justify-between items-center"
                >
                  Kirim
                  <IoSendSharp />
                </button>
              </div>
            )}
          </div>
            {jadwal.length === 0 ? (
            <div className="flex items-center justify-center mt-40 ml-64"> 
              <p className="text-gray-300 text-center font-thin text-3xl">
                Ringkasan jadwal belum tersedia
              </p>
            </div>
          ) : (
            <TableComponent data={jadwal} columns={columnConfig} />
          )}
        </div>
        
      </PenyusunanJadwalLayout>
    );
  };
  
  export default RingkasanJadwal;