import React, { useState } from 'react';
import PenyusunanJadwalLayout from "@/Layouts/PenyusunanJadwalLayout";

import Dropdown from '@/Components/Dropdown';
import TextInput from '@/Components/TextInput';
import { GrPowerReset } from "react-icons/gr";
import { MdNoteAdd } from "react-icons/md";

const TambahMatkul: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [dropdowns, setDropdowns] = useState<string[]>([""]);
    const [error, setError] = useState<string | null>(null);
    const [matkul, setMatkul] = useState<string>(''); 
    const [kodeMatkul, setKodeMatkul] = useState<string>(""); // Untuk input Kode Mata Kuliah
    const [sks, setSks] = useState<number | "">(""); // Untuk input SKS
    const [jumlahKelas, setJumlahKelas] = useState<number | "">(""); // Untuk input Jumlah Kelas
    const [kuotaKelas, setKuotaKelas] = useState<number|"">(""); // Untuk input Kuota Kelas

    // Fungsi untuk menambah dropdown baru
    const handleTambahDosen = () => {
        setDropdowns([...dropdowns, ""]);
    };

    // Fungsi untuk mengupdate nilai pada dropdown tertentu
    const handleDropdownSelection = (index: number, value: string) => {
        const updatedDropdowns = [...dropdowns];
        updatedDropdowns[index] = value;
        setDropdowns(updatedDropdowns);
        if (error && index === 0 && value) setError(null); // Reset error jika Dropdown pertama sudah dipilih
        console.log(`Dropdown ${index + 1} selected: ${value}`);
    };

    const handleReset = () => {
        // setSelectedValue(""); // Reset nilai mata kuliah
        setDropdowns([""]); // Reset dropdown dosen pengampu
        setMatkul("");
        setKodeMatkul(""); // Reset input kode mata kuliah
        setSks(""); // Reset input SKS
        setJumlahKelas(""); // Reset input jumlah kelas
        setKuotaKelas(""); // Reset input kuota kelas
        setError(null); // Reset error
      };

    const handleSubmit = () => {
        if (!dropdowns[0]) {
          setError("Dosen pertama wajib dipilih!");
          return;
        }
        console.log("Data submitted:", dropdowns.filter((value) => value !== ""));
      };
      
    return(
        <PenyusunanJadwalLayout
        currentPage={
            <div className="flex flex-row items-center gap-2">
                <span className='font-extrabold text-3xl'>+</span>
                <span>Tambah Mata Kuliah Baru</span>
            </div>
        }>
            <div className='ml-8 flex flex-col justify-start'>
                <div className="flex flex-col gap-4 w-full mb-4">
                    <TextInput 
                        className="border border-gray-300 rounded-md p-2 w-full placeholder-gray-200"
                        placeholder="Masukkan nama mata kuliah"
                        value={matkul|| ''}
                        onChange={(e) => setMatkul(e.target.value)}
                    />
                </div>
            <div className="border border-gray-400 w-full rounded-md px-4 py-4">
                <div className="flex flex-col gap-3">
                    <div className='flex flex-row items-center justify-start w-full gap-x-8 text-gray-600'>
                        <span>Semester Wajib</span>
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                            <Dropdown
                            label= "-- Pilih Semester --"
                            items={[
                                { label: '-- Pilih Semester --', value: '' }, 
                                { label: 'Semester 1', value: 'Semester 1' },
                                { label: 'Semester 2', value: 'Semester 2' },
                                { label: 'Semester 3', value: 'Semester 3' },
                                { label: 'Semester 4', value: 'Semester 4' },
                                { label: 'Semester 5', value: 'Semester 5' },
                                { label: 'Semester 6', value: 'Semester 6' },
                                { label: 'Semester 7', value: 'Semester 7' },
                                { label: 'Semester 8', value: 'Semester 8' },
                                { label: 'Pilihan Genap', value: 'Pilihan Genap' },
                                { label: 'Pilihan Ganjil', value: 'Pilihan Ganjil' },
                            ]}
                            // onFilterSelect={(value) => handleMenuSelection(value)}            
                            /> 
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
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                            <input
                                type="number"
                                id="jumlah-kelas"
                                className="border border-gray-400 rounded-md p-2 w-full text-gray-700"
                                min="1"
                                max="4"
                                defaultValue=""
                                value={sks}
                                onChange={(e) => setSks(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                            </div>  
                    </div>

                    <div className='flex flex-row items-center justify-start w-full gap-x-12 text-gray-600'>
                        <span>Jumlah Kelas</span>
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                            <input
                                type="number"
                                id="jumlah-kelas"
                                className="border border-gray-400 rounded-md p-2 w-full text-gray-700"
                                min="1"
                                max="5"
                                defaultValue=""
                                value={jumlahKelas}
                                onChange={(e) => setJumlahKelas(e.target.value === "" ? "" : Number(e.target.value))}
                            /> 
                            </div>  
                    </div>

                    <div className='flex flex-row items-center justify-start w-full gap-x-16 text-gray-600'>
                        <span>Kuota Kelas</span>
                        <div className="flex flex-col justify-center w-[65%] gap-2">
                        <TextInput 
                            className="border border-gray-300 rounded-md p-2 w-full"
                            placeholder="Masukkan kuota kelas"
                            value={kuotaKelas === "" ? "" : kuotaKelas}
                            onChange={(e) => setKuotaKelas(e.target.value ? Number(e.target.value) : "")}
                        />                          
                        </div>  
                    </div>

                    <div className='flex flex-col gap-y-2 w-[97%] text-gray-600'>
                        Dosen Pengampu
                        {dropdowns.map((selectedValue, index) => (
                        <div key={index} className="flex flex-col gap-y-1">
                            <Dropdown
                            key={index}
                            buttonLabel={`-- Pilih Dosen Pengampu ${index + 1} --`}
                            items={[
                                { label: "-- Pilih Dosen Pengampu --", value: "" },
                                { label: "Sandy Kurniawan S.Kom., M.Kom.", value: "Sandy Kurniawan S.Kom., M.Kom." },
                                { label: "Adhe Setya Pramayoga, M.T.", value: "Adhe Setya Pramayoga, M.T." },
                                { label: "Henri Tantyoko, S.Kom., M.Kom.", value: "Henri Tantyoko, S.Kom., M.Kom." },
                            ]}
                            onValueSelect={(value) => handleDropdownSelection(index, value)}
                            />
                            {index === 0 && error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                        ))}

                        {/* Tombol Tambah Dosen Pengampu */}
                        <button
                            className="flex mt-2 items-center gap-2 text-primary-dark text-sm hover:underline"
                            onClick={handleTambahDosen}
                        >
                            <span className="text-lg font-bold">+</span> 
                            Tambah dosen pengampu
                        </button>
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