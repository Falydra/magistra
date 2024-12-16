import React, { useState, useEffect } from 'react';
import PenyusunanJadwalLayout from "@/Layouts/PenyusunanJadwalLayout";

import Dropdown from '@/Components/Dropdown';
import TextInput from '@/Components/TextInput';
import { GrPowerReset } from "react-icons/gr";
import { MdNoteAdd } from "react-icons/md";
import { Head } from '@inertiajs/react';

interface MataKuliahItem {
    id: number;
    nama: string;
    kode_mk: string;
    sks: number;
    semester: number;
    jenis: string;
    kuota: number;
    jumlah_kelas:number;
    dosen_utama: string | null;
    dosen_kedua: string | null;
    dosen_ketiga: string | null;
  }

const TambahMatkul: React.FC = () => {
    const [namaMatkul, setNamaMatkul] = useState<string>("");
    const [dosenList, setDosenList] = useState<{ nip: string; nama: string }[]>([]);
    const [dropdowns, setDropdowns] = useState<string[]>([""]); // Untuk menambah dosen pengampu

    // State input yang dapat diedit
    const [jenis, setJenis] = useState<string>("");
    const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
    const [kodeMatkul, setKodeMatkul] = useState<string>("");
    const [sks, setSks] = useState<number | "">("");
    const [jumlahKelas, setJumlahKelas] = useState<number | "">("");
    const [kuota, setKuota] = useState<number | "">("");
    const [dosenUtama, setDosenUtama] = useState<string | null>(null);
    const [dosenKedua, setDosenKedua] = useState<string | null>(null);
    const [dosenKetiga, setDosenKetiga] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/dosen') 
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setDosenList(data.data); 
            } else {
                console.error(data.message || "Gagal mengambil data dosen.");
            }
        })
        .catch((error) => console.error("Error fetching dosen:", error));
    }, []);

// Fungsi untuk menambah dropdown baru (maksimal 3 dropdown)
const handleTambahDosen = () => {
    if (dropdowns.length < 3) {
        setDropdowns([...dropdowns, ""]);
    }
};

// Fungsi untuk mengatur nilai dropdown berdasarkan urutan (dosen utama, kedua, ketiga)
const handleDropdownSelection = (index: number, value: string) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index] = value;
    setDropdowns(updatedDropdowns);

    // Atur dosen berdasarkan urutan dropdown
    if (index === 0) {
        setDosenUtama(value);
    } else if (index === 1) {
        setDosenKedua(value);
    } else if (index === 2) {
        setDosenKetiga(value);
    }

    // Reset error jika dosen utama dipilih
    if (error && index === 0 && value) setError(null);
};

    // Reset form
    const handleReset = () => {
        setDropdowns([""]);
        setDropdowns([""]); 
        setDosenUtama("");
        setDosenKedua("");
        setDosenKetiga("");
        setKodeMatkul("");
        setNamaMatkul("");
        setSks("");
        setJumlahKelas("");
        setKuota("");
        setSelectedSemester(null);
        setJenis("");
        setError(null);
    };

    // const handleSubmit = async () => {
    //     if (!namaMatkul || !selectedSemester || !jenis || !kodeMatkul || !sks || !jumlahKelas || !kuota || !dropdowns[0]) 
    //     {
    //       alert("Lengkapi seluruh data!");
    //       return;
    //     }

    //     const dataToSend = {
    //       nama: namaMatkul,
    //       semester: selectedSemester,
    //       jenis,
    //       kode_mk: kodeMatkul,
    //       sks,
    //       jumlah_kelas: jumlahKelas,
    //       kuota,
    //       dosen_pengampu: dropdowns.filter((value) => value !== ""),
    //     };
      
    //     console.log("Data yang akan dikirim ke backend:", JSON.stringify(dataToSend, null, 2));
      
    //     try {
    //       const response = await fetch("/tambah-matkul", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "X-CSRF-TOKEN":
    //             document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
    //         },
    //         body: JSON.stringify(dataToSend),
    //       });
      
    //       const result = await response.json();
      
    //       if (response.ok) {
    //         alert("Mata kuliah berhasil ditambahkan!");
    //         handleReset();
    //       } else {
    //         if (result.message.includes("Matkul sudah ada di database")) {
    //           alert("Mata kuliah telah terdaftar! Buat mata kuliah yang belum terdaftar.");
    //         } else {
    //           alert(result.message || "Terjadi kesalahan saat menambahkan mata kuliah.");
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error submitting data:", error);
    //       alert("Terjadi kesalahan saat mengirim data.");
    //     }
    //   };

    const handleSubmit = async () => {
        if (!dropdowns[0]) {
          setError("Dosen utama wajib dipilih!");
          return;
        }
      
        const dataToSend = {
          nama: namaMatkul,
          semester: selectedSemester,
          jenis,
          kode_mk: kodeMatkul,
          sks,
          jumlah_kelas: jumlahKelas,
          kuota,
          dosen_pengampu: dropdowns.filter((value) => value !== ""),
        };
            
        const response = await fetch("/tambah-matkul", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN":
            document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        body: JSON.stringify(dataToSend),
        });
    
        const result = await response.json();
    
        if (response.ok) {
            alert("Mata kuliah berhasil ditambahkan!");
            handleReset();
        } else if (result.errors) {
            const errorMessages = Object.values(result.errors).flat().join("\n");
            alert(errorMessages); 
            handleReset();
        } else {
            alert(result.message); // Error pada validasi db (kode mk dan nama)
        }
      };
      
    return(
        <PenyusunanJadwalLayout
        currentPage={
            <div className="flex flex-row items-center gap-2">
                <span className='font-extrabold text-3xl'>+</span>
                <span>Tambah Mata Kuliah Baru</span>
            </div>
        }>
            <Head title='Tambah Mata Kuliah Baru'/>
            <div className='ml-8 flex flex-col justify-start'>
                {/* Nama Mata Kuliah */}
                <div className="flex flex-col gap-4 w-full mb-4">
                    <input
                        type="text"
                        placeholder="Masukkan nama mata kuliah"
                        value={namaMatkul}
                        onChange={(e) => setNamaMatkul(e.target.value)}
                        className="border border-gray-400 rounded-md p-2"
                    />
                </div>
            <div className="border border-gray-400 w-full rounded-md px-4 py-4">
                <div className="flex flex-col gap-3">
                    <div className='flex flex-row items-center justify-start w-full gap-x-8 text-gray-600'>
                        <span>Semester Wajib</span>
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                            <select
                                value={selectedSemester || ""}
                                onChange={(e) =>
                                setSelectedSemester(e.target.value === "" ? null : Number(e.target.value))
                                }
                                className="border border-gray-400 rounded-md p-2"
                            >
                                <option value="">-- Pilih Semester --</option>
                                {Array.from({ length: 8 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Semester {i + 1}
                                </option>
                                ))}
                            </select>
                        </div>  
                    </div>

                    <div className='flex flex-row items-center justify-start w-full gap-x-28 text-gray-600'>
                        <span>Jenis</span>
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                        <select
                            value={jenis}
                            onChange={(e) => setJenis(e.target.value)}
                            className="border border-gray-400 rounded-md p-2"
                        >
                            <option value="">-- Pilih Jenis --</option>
                            <option value="Wajib">Wajib</option>
                            <option value="Pilihan">Pilihan</option>
                        </select>
                        </div>  
                    </div>
                                
                    <div className='flex flex-row items-center justify-start w-full gap-x-4 text-gray-600'>
                        <span>Kode Mata Kuliah </span>
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                        <TextInput 
                            className="border border-gray-300 rounded-md p-2 w-full placeholder-gray-200"
                            placeholder="Masukkan kode mata kuliah"
                            value={kodeMatkul}
                            onChange={(e) => setKodeMatkul(e.target.value)}
                        />
                        </div>  
                    </div>

                    <div className='flex flex-row items-center justify-start w-full gap-x-32 text-gray-600'>
                        <span>SKS</span>
                        <input
                            type="number"
                            min="1"
                            max="4"
                            value={sks}
                            onChange={(e) => setSks(Number(e.target.value) || "")}
                            className="border border-gray-400 rounded-md p-2 w-[65%]"
                        />
                    </div>
                    

                    <div className='flex flex-row items-center justify-start w-full gap-x-12 text-gray-600'>
                        <span>Jumlah Kelas</span>
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={jumlahKelas}
                            onChange={(e) => setJumlahKelas(Number(e.target.value) || "")}
                            className="border border-gray-400 rounded-md p-2"
                        />
                            </div>  
                    </div>

                    <div className='flex flex-row items-center justify-start w-full gap-x-16 text-gray-600'>
                        <span>Kuota Kelas</span>
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                        <input
                            type="number"
                            value={kuota}
                            onChange={(e) => setKuota(Number(e.target.value) || "")}
                            className="border border-gray-400 rounded-md p-2"
                        />                         
                        </div>  
                    </div>

                    {/* Dosen Pengampu */}
                    <div className="flex flex-col gap-y-2 w-[97%] text-gray-600">
                    <span>Dosen Pengampu</span>
                    {dropdowns.map((value, index) => (
                        <div key={index} className="flex flex-col gap-y-1">
                        <select
                            value={value}
                            onChange={(e) => handleDropdownSelection(index, e.target.value)}
                            className="border border-gray-400 rounded-md p-2"
                        >
                            <option value="">
                            -- Pilih {index === 0 ? "Dosen Utama" : `Dosen Pengampu ${index + 1}`} --
                            </option>
                            {dosenList.map((dosen: any) => (
                            <option key={dosen.nip} value={dosen.nip}>
                                {dosen.nama}
                            </option>
                            ))}
                        </select>
                        {index === 0 && error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                    ))}

                    {/* Tambah Dosen Pengampu */}
                    {dropdowns.length < 3 && (
                        <button
                        onClick={handleTambahDosen}
                        className="text-primary-dark text-sm hover:underline mt-2"
                        >
                        <span className="font-bold text-lg">+</span> Tambah dosen pengampu
                        </button>
                    )}
                    </div>
                </div>
                </div>

            {/* Button Reset dan Simpan */}
            <div className="flex flex-1 w-full justify-between mt-4 font-semibold text-lg gap-x-6 text-white">
                <button
                    className="flex items-center justify-center gap-2 py-1 rounded-md bg-button-red hover:bg-button-hv_red w-[50%] text-center"
                    onClick={handleReset}
                >
                    RESET
                    <GrPowerReset />
                </button>

                <button
                    className="flex items-center justify-center gap-2 py-1 rounded-md bg-button-green hover:bg-button-hv_green w-[50%] text-center"
                    onClick={handleSubmit}
                >
                    TAMBAH MATKUL
                    <span className='font-bold text-2xl'>+</span>
                </button>
            </div>

            </div>

        </PenyusunanJadwalLayout>

    );
};

export default TambahMatkul;