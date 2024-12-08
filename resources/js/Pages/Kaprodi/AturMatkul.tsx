// Kelola Mata Kuliah
import React, { useState, useEffect } from 'react';
import { Link, Head } from "@inertiajs/react";
import PenyusunanJadwalLayout from "@/Layouts/PenyusunanJadwalLayout";
import { BsFillPencilFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { MdNoteAdd } from "react-icons/md";

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

const AturMatkul: React.FC = () => {
    const [selectedMataKuliah, setSelectedMataKuliah] = useState<string>(""); 
    const [mataKuliahList, setMataKuliahList] = useState<MataKuliahItem[]>([]);
    const [dosenList, setDosenList] = useState<{ nip: string; nama: string }[]>([]);
    const [dropdowns, setDropdowns] = useState<string[]>([""]); // Untuk menambah dosen pengampu

    // State input yang dapat diedit
    const [semester, setSemester] = useState<number | null>(null); 
    const [kodeMatkul, setKodeMatkul] = useState<string>("");
    const [sks, setSks] = useState<number | "">("");
    const [jumlahKelas, setJumlahKelas] = useState<number | "">("");
    const [kuota, setKuota] = useState<number | "">("");
    const [dosenUtama, setDosenUtama] = useState<string | null>(null);
    const [dosenKedua, setDosenKedua] = useState<string | null>(null);
    const [dosenKetiga, setDosenKetiga] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMataKuliah = async () => {
            try {
                const response = await fetch("/mata-kuliah"); 
                const data = await response.json();
                setMataKuliahList(data); 
            } catch (error) {
                console.error("Error fetching mata kuliah:", error);
            }
        };

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

        fetchMataKuliah();
    }, []);

 // Fetch detail mata kuliah saat dropdown mata kuliah diubah
 const handleSelectMataKuliah = (kodeMk: string) => {
    setSelectedMataKuliah(kodeMk); 

    if (kodeMk) {
        fetch(`/mata-kuliah/${kodeMk}`) 
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const mk = data.data;
                    // Isi state input dengan data dari backend
                    setSemester(mk.semester || null);
                    setKodeMatkul(mk.kode_mk || "");
                    setSks(mk.sks || "");
                    setJumlahKelas(mk.jumlah_kelas || "");
                    setKuota(mk.kuota || "");
                    setDosenUtama(mk.dosen_utama || "");
                    setDosenKedua(mk.dosen_kedua || "");
                    setDosenKetiga(mk.dosen_ketiga || "");
                } else {
                    console.error(data.message || "Gagal mengambil detail mata kuliah.");
                }
            })
    } else {
        // Reset state jika tidak ada mata kuliah yang dipilih
        setSemester(null);
        setKodeMatkul("");
        setSks("");
        setJumlahKelas("");
        setKuota("");
        setDosenUtama("");
        setDosenKedua("");
        setDosenKetiga("");
    }
};

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
        setSks("");
        setJumlahKelas("");
        setKuota("");
        setSemester(null);
        setError(null);
    };

    const handleUpdateMataKuliah = () => {
        const updateData = {
          kode_mk: selectedMataKuliah,
          semester: semester,
          sks: sks,
          jumlah_kelas: jumlahKelas,
          kuota: kuota,
          dosen_nip: dropdowns[0] || null, // Dosen 1 (wajib)
          dosen_nip_2: dropdowns[1] || null, // Dosen kedua (opsional)
          dosen_nip_3: dropdowns[2] || null, // Dosen ketiga (opsional)
        };
        
        if (!dropdowns[0]) {
            setError("Dosen wajib diisi!");
            return;
        }
        setError(null);

        fetch('/mata-kuliah/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          },
          body: JSON.stringify(updateData),
        })
          .then((response) => response.json())
          .then((data) => {
            // Log response dari backend
            console.log("Response dari backend:", data);
      
            if (data.success) {
              alert(data.message);
            } else {
              alert(data.message || 'Gagal memperbarui mata kuliah.');
            }
          })
          .catch((err) => console.error('Error updating mata kuliah:', err));
      };

    return (
        <PenyusunanJadwalLayout
            currentPage={
                <div className="flex flex-row items-center gap-2">
                    <BsFillPencilFill className="w-6 h-6 text-primary-dark" />
                    <span>Kelola Mata Kuliah</span>
                </div>
            }
        >
            <Head title="Kelola Mata Kuliah" />
            <div className="flex flex-col justify-start ml-8">
                <div className="flex flex-row items-center justify-start text-gray-400 font-light text-sm mb-2">
                    Untuk menambah mata kuliah baru, klik di sini
                    <button className="ml-2 gap-1 bg-button-green hover:bg-button-hv_green text-white px-3 py-1 rounded-md text-xs font-medium flex items-center">
                        <Link href={route("kaprodi.tambahMK")}>Tambah Mata Kuliah Baru</Link>
                    </button>
                </div>

                {/* Dropdown Pilih Mata Kuliah */}
                <div className="flex flex-col gap-4 w-full mb-4">
                    <select
                        className="border rounded px-4 py-2"
                        value={selectedMataKuliah || ""}
                        onChange={(e) => handleSelectMataKuliah(e.target.value)}
                    >
                        <option value="">-- Pilih Mata Kuliah --</option>
                        {mataKuliahList.map((mk) => (
                            <option key={mk.kode_mk} value={mk.kode_mk}>
                                {mk.kode_mk} - {mk.nama}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Form Input */}
                <div className="border border-gray-400 w-full rounded-md px-4 py-4">
                    <div className="flex flex-col gap-3">
                        {/* Semester */}
                        <div className="flex flex-row items-center justify-start w-full gap-x-8 text-gray-600">
                            <span>Semester Wajib</span>
                            <select
                                value={semester || ""} 
                                onChange={(e) => setSemester(e.target.value === "" ? null : Number(e.target.value))}
                                className="border border-gray-300 rounded-md p-2 w-[65%]"
                            >
                                <option value="">-- Pilih Semester --</option>
                                {Array.from({ length: 8 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Semester {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Kode Mata Kuliah */}
                        <div className="flex flex-row items-center justify-start w-full gap-x-4 text-gray-600">
                            <span>Kode Mata Kuliah</span>
                            <input
                                type="text"
                                placeholder="Masukkan kode mata kuliah"
                                value={kodeMatkul}
                                onChange={(e) => setKodeMatkul(e.target.value)}
                                className="border border-gray-400 rounded-md p-2 w-[65%]"
                            />
                        </div>

                        {/* SKS */}
                        <div className="flex flex-row items-center justify-start w-full gap-x-32 text-gray-600">
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

                        {/* Jumlah Kelas */}
                        <div className="flex flex-row items-center justify-start w-full gap-x-12 text-gray-600">
                            <span>Jumlah Kelas</span>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={jumlahKelas}
                                onChange={(e) => setJumlahKelas(Number(e.target.value) || "")}
                                className="border border-gray-400 rounded-md p-2 w-[65%]"
                            />
                        </div>

                        {/* Kuota Kelas */}
                        <div className="flex flex-row items-center justify-start w-full gap-x-16 text-gray-600">
                            <span>Kuota Kelas</span>
                            <input
                                type="number"
                                value={kuota}
                                onChange={(e) => setKuota(Number(e.target.value) || "")}
                                className="border border-gray-400 rounded-md p-2 w-[65%]"
                            />
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
                                        <option value="">-- Pilih {index === 0 ? 'Dosen Pengampu 1' : `Dosen Pengampu ${index + 1}`} --</option>
                                        {dosenList.map((dosen) => (
                                            <option key={dosen.nip} value={dosen.nip}>
                                                {dosen.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {index === 0 && error && <p className="text-red-500 text-sm">{error}</p>}
                                </div>
                            ))}
                            {/* Tombol Tambah Dosen Pengampu */}
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
                    className="flex items-center justify-center gap-2 py-1 rounded-md bg-button-blue hover:bg-button-hv_blue w-[50%] text-center"
                    onClick={handleUpdateMataKuliah}
                >
                    SIMPAN
                    <MdNoteAdd/>
                </button>
            </div>

            </div>

        </PenyusunanJadwalLayout>
    );
};

export default AturMatkul;

