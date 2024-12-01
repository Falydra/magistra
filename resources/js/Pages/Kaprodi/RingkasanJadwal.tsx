import React, { useState, useEffect } from 'react';
import { usePage, Link } from "@inertiajs/react";
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const daysPriority = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    // Fungsi untuk edit jadwal
    const handleEdit = (item: Jadwal) => {
        // Logika untuk update jadwal, misalnya navigasi ke halaman edit
        console.log("Edit jadwal:", item);
        // Contoh: Navigasi ke halaman update dengan ID jadwal
        // router.push(`/jadwal/edit/${item.id}`);
    };
    
    // Fungsi untuk menghapus jadwal
    const handleDelete = (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
          fetch(`/jadwal/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "", // Ambil CSRF token dari meta tag
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
                {/* Ikon Edit */}
                <button
                  onClick={() => handleEdit(item)}
                  className="text-primary-bg hover:to-button-hv_blue"
                  title="Edit Jadwal"
                >
                  <FaPen />
                </button>
          
                {/* Ikon Hapus */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-button-red hover:text-button-hv_red"
                  title="Hapus Jadwal"
                >
                <FaTrash />
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
        const jadwalIds = jadwal.map((item) => item.id); 
      
        fetch('/ajukan-ke-dekan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
          },
          body: JSON.stringify({ jadwal_ids: jadwalIds }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert(`Jadwal berhasil diajukan ke dekan! Kode Jadwal Prodi: ${data.kode_jadwal_prodi}`);
            } else {
              alert('Gagal mengajukan jadwal ke dekan!');
            }
          })
          .catch((err) => {
            console.error('Error:', err);
            alert('Terjadi kesalahan saat mengajukan jadwal ke dekan.');
          });
      };

    useEffect(() => {
    fetch("/jadwal")
        .then((response) => response.json())
        .then((data) => {
        if (data.success) {
            const sortedJadwal = sortJadwal(data.data); // Sort data di sini
            setJadwal(sortedJadwal);
        } else {
            setError("Gagal mengambil data.");
        }
        })
        .catch((err) => {
        setError(err.message);
        console.error(err);
        })
        .finally(() => setLoading(false));
    }, []);
  
    // if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
  
    return (
      <PenyusunanJadwalLayout
        currentPage={
          <div className="flex flex-row items-center gap-2">
            <FaThList className="w-6 h-6 text-primary-dark" />
            <span>Buat Jadwal</span>
          </div>
        }
      >
        <div className="flex flex-col justify-start ml-8">
            <div className="flex flex-row items-center justify-start text-gray-400 font-light text-sm mb-2">
                <button 
                onClick={handleAjukanKeDekan}
                className="gap-2 bg-button-green hover:bg-button-hv_green text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                    Ajukan ke Dekan
                    <IoSendSharp />
                </button>
            </div>
            <TableComponent data={jadwal} columns={columnConfig} />

            </div>
        
      </PenyusunanJadwalLayout>
    );
  };
  
  export default RingkasanJadwal;