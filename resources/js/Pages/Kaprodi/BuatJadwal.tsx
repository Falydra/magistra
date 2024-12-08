import React, { useState, useEffect } from 'react';
import PenyusunanJadwalLayout from "@/Layouts/PenyusunanJadwalLayout";

import { FaRegCalendarPlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IoEyeSharp } from "react-icons/io5";
import { MdNoteAdd } from "react-icons/md";
import { Head } from '@inertiajs/react';

// ===============================================================
//                           DEKLARASI                            |
// ===============================================================

interface MataKuliahItem {
  label: string;
  value: string;
  id: number;
  nama: string;
  kode_mk: string;
  sks: number;
  semester: number;
}

interface PreviewData {
  mataKuliah: string | null;
  kodeMk: string | null;
  sks: number | null;
  kelas: string | null;
  hari: string | null;
  ruang: string | null;
  waktu: {
      mulai: string;
      akhir: string;
  } | null;
}

const BuatJadwal: React.FC = () => {

// ===============================================================
//                           VARIABEL                            |
// ===============================================================

  const [filteredSemester, setFilteredSemester] = useState<string | null>(null); 
  const [mataKuliahList, setMataKuliahList] = useState<MataKuliahItem[]>([]);
  const [selectedMataKuliah, setSelectedMataKuliah] = useState<string>('');
  const [filteredMataKuliah, setFilteredMataKuliah] = useState<MataKuliahItem[]>([]);

  const [kelasList, setKelasList] = useState([]);
  const [ruangList, setRuangList] = useState([]);
  const [waktuList, setWaktuList] = useState([]);

  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedRuang, setSelectedRuang] = useState('');
  const [selectedHari, setSelectedHari] = useState<string | null>(null);
  const [jadwalId, setJadwalId] = useState<number | null>(null);

  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);

const formatTime = (time: string): string => {
    if (time.length === 5) {
        return `${time}:00`; // Tambahkan ":00" jika waktu hanya jam dan menit
    }
    return time;
};

// ===============================================================
//                           FETCH DATA                           |
// ===============================================================

  useEffect(() => {
  fetch('/mata-kuliah') 
    .then((response) => response.json())
    .then((data) => {
      const formattedData = data.map((item:any) => ({
        label: `${item.kode_mk} - ${item.nama}`,
        value: item.nama,
        nama: item.nama,
        kode_mk: item.kode_mk,
        sks: item.sks,
        semester: Number(item.semester), // Konversi semester ke integer
        jenis: item.jenis,
        kuota: item.kuota,
      }));
      setMataKuliahList(formattedData); 
    })

    fetch('/ruang/prodi', {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
    })
      .then((response) => response.json())
      .then((data) => setRuangList(data.data))

    // Fetch waktu mulai
    fetch('/waktu')
    .then((response) => response.json())
    .then((data) => setWaktuList(data));

    const editData = sessionStorage.getItem("editData");
    if (editData) {
      const data = JSON.parse(editData);
      setFilteredSemester(data.semester);
      setSelectedMataKuliah(data.kode_mk);
      setSelectedKelas(data.kelas);
      setSelectedHari(data.hari);
      setSelectedRuang(data.ruang);
      setSelectedStartTime(data.waktu_mulai);
      setEndTime(calculateEndTime(data.waktu_mulai, data.sks)); 
      sessionStorage.removeItem("editData"); // Hapus data setelah diambil
    }

    fetch('/cek-jadwal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kode_ruang: selectedRuang,
        kelas: selectedKelas,
        hari: selectedHari,
        waktu_mulai: selectedStartTime,
        waktu_akhir: formatTime(endTime),
        mata_kuliah: selectedMataKuliah,
      }),
    })
  }, []);

  useEffect(() => {
    if (filteredSemester) {
      const filtered = mataKuliahList.filter(
        (mk) => mk.semester === Number(filteredSemester) 
      );
      setFilteredMataKuliah(filtered);
    } else {
      setFilteredMataKuliah(mataKuliahList);
    }
  }, [filteredSemester, mataKuliahList]);

  useEffect(() => {
    if (!selectedMataKuliah) return;

    fetch(`/kelas?kode_mk=${selectedMataKuliah}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setKelasList(data.data);
            } else {
                alert(data.message || 'Gagal mengambil data kelas.');
            }
        })
        .catch((err) => console.error(err));
}, [selectedMataKuliah]);

useEffect(() => {
  fetch(`/get-jadwal?kelas=${selectedKelas}&kode_mk=${selectedMataKuliah}`)
      .then((response) => response.json())
      .then((data) => {
          if (data.success && data.data.length > 0) {
              console.log('Jadwal ID found:', data.data[0].id);
              setJadwalId(data.data[0].id);
          } else {
              setJadwalId(null);
          }
      })
}, [selectedKelas, selectedMataKuliah]);


// ===============================================================
//                           FUNGSI                              |
// ===============================================================

const getSksFromMataKuliah = (mataKuliah: string) => {
  const selectedMk = mataKuliahList.find((item) => item.kode_mk === mataKuliah);
  console.log('Selected mata kuliah:', selectedMk);
  return selectedMk ? selectedMk.sks : 0; 
};

  // Fungsi untuk menghitung waktu akhir
  const calculateEndTime = (start: string, sks: number) => {
    const timePattern = /^(\d{2}):(\d{2}):(\d{2})$/; // Format waktu 'HH:MM:SS'
    const match = start.match(timePattern);
    
    if (!match) {
      console.error('Invalid time format:', start);
      return 'Invalid time format';
    }
  
    const [, hoursStr, minutesStr] = match;
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
  
    if (hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) {
      console.error('Invalid time value:', start);
      return 'Invalid time value';
    }
  
    const totalMinutes = hours * 60 + minutes + sks * 50;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
  
    const formattedEndHours = endHours % 24;
    const result = `${String(formattedEndHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    console.log('Calculated End Time:', result);
    return result;
  };

// Fungsi Button Reset
const handleReset = () => {
  setFilteredSemester(null);
  setSelectedMataKuliah("");
  setSelectedKelas("");
  setSelectedHari("");
  setSelectedRuang("");
  setSelectedStartTime(""); 
  setEndTime("");
  setPreviewData({
    mataKuliah: null,
    sks: null,
    kodeMk: null,
    kelas: null,
    hari: null,
    ruang: null,
    waktu: {mulai:"", akhir:""},
  }); 
};

const handleStartTimeChange = (value: string) => {
  setSelectedStartTime(value);
  const sks = getSksFromMataKuliah(selectedMataKuliah);
  if (sks > 0 && value) {
      const calculatedEndTime = calculateEndTime(value, sks);
      setEndTime(calculatedEndTime);
  } else {
      setEndTime('');
  }
};

  const handleMataKuliahChange = (value: string) => {
    setSelectedMataKuliah(value); // Update mata kuliah 
    if (selectedStartTime) {
      const sks = getSksFromMataKuliah(value); 
      if (sks > 0) {
        const calculatedEndTime = calculateEndTime(selectedStartTime, sks); 
        setEndTime(calculatedEndTime); 
      } else {
        setEndTime('');
      }
    }
  };

  const checkAvailability = async () => {
    if (!selectedRuang || !selectedKelas || !selectedHari || !selectedStartTime || !endTime || !selectedMataKuliah) {
      alert("Lengkapi seluruh data!");
      return; 
  }

    const selectedMk = mataKuliahList.find((mk) => mk.kode_mk === selectedMataKuliah); 
    const sks = selectedMk?.sks || 0; 
    const kodeMk = selectedMk?.label.split(' - ')[0] || 'KODE MK'; 

    // Set preview data sebelum cek ketersediaan
    setPreviewData({
      mataKuliah: selectedMk?.label.split(' - ')[1] || "Nama Mata Kuliah",
      kodeMk,
      sks,
      kelas: String(selectedKelas),
      hari: selectedHari,
      ruang: String(selectedRuang),
      waktu: {
        mulai: selectedStartTime,
        akhir: calculateEndTime(selectedStartTime, sks),
      },
    });

    try {
      const response = await fetch('/cek-jadwal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          id: jadwalId,
          ruang: selectedRuang,
          kelas: selectedKelas,
          hari: selectedHari,
          waktu_mulai: selectedStartTime,
          waktu_akhir: formatTime(endTime),
          mata_kuliah: selectedMataKuliah,
        }),
      });
  
      const data = await response.json();
      if (response.ok && data.success) {
        setAvailabilityMessage("Jadwal tersedia");
      } else {
        setAvailabilityMessage(data.message || "Jadwal tidak tersedia.");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      alert("Terjadi kesalahan saat memeriksa ketersediaan.");
    }
  };

  const getMessageStyle = (): React.CSSProperties => {
    if (!availabilityMessage) return {};
        if (availabilityMessage.includes("Jadwal tersedia")) {
        return { color: 'green', fontSize: 'large' };
    }
    return { color: 'red', fontSize: 'large' };
  };

const handleSubmitJadwal = async () => {
  if (!selectedRuang || !selectedKelas || !selectedHari || !selectedStartTime || !endTime || !selectedMataKuliah) {
      alert("Silakan lengkapi semua data sebelum membuat atau memperbarui jadwal.");
      return;
  }

  // Data yang akan dikirim ke backend
  const dataToSend = {
      id: jadwalId, // Jika ada ID untuk update, null untuk store
      ruang: selectedRuang,
      kelas: selectedKelas,
      hari: selectedHari,
      waktu_mulai: formatTime(selectedStartTime),
      waktu_akhir: formatTime(endTime),
      mata_kuliah: selectedMataKuliah, // kode_mk
  };

  // Debugging data yang dikirim ke backend
  console.log("Data sent to backend:", JSON.stringify(dataToSend, null, 2));

  const url = jadwalId ? '/update-jadwal' : '/buat-jadwal';
  const method = jadwalId ? 'POST' : 'POST';
  try {
      const response = await fetch(url, {
          method,
          headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          },
          body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
          alert(jadwalId ? "Jadwal berhasil diperbarui!" : "Jadwal berhasil dibuat!");
          window.location.href = "/kaprodi/penyusunan-jadwal/ringkasan-jadwal";
      } else {
          alert(`Gagal ${jadwalId ? "memperbarui" : "membuat"} jadwal: ${responseData.message || "Terjadi kesalahan."}`);
      }
  } catch (error) {
      console.error(`Error saat ${jadwalId ? "memperbarui" : "membuat"} jadwal:`, error);
      alert("Terjadi kesalahan saat memproses permintaan.");
  }
};

// ===============================================================
//                            BODY                               |
// ===============================================================

  return (
    <PenyusunanJadwalLayout currentPage={
      <div className="flex flex-row items-center gap-2">
        <FaRegCalendarPlus className="w-6 h-6 text-primary-dark" />
        <span>Buat Jadwal</span>
      </div>
    }>
      <Head title='Buat Jadwal'/>
      {/* Main Content */}
      <div className="flex flex-col gap-4 w-full md:w-3/5 ml-8"> 
      <select
        className="border rounded px-4 py-2"
        value={filteredSemester || ""}
        onChange={(e) => setFilteredSemester(e.target.value)}
      >
        <option value="">-- Pilih Semester --</option>
        {[...Array(8)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            Semester {i + 1}
          </option>
        ))}
      </select>

        {/* Wrapper responsive layout */}
        <div className="flex flex-col h-full w-full border border-gray-400 rounded-md p-4 gap-4">

          {/* Row 1: Mata Kuliah, Kode MK, SKS */}
          <div className="flex flex-wrap w-full">
            <div className="flex flex-col w-full md:w-[60%]">
              <span className="text-lg font-medium">Mata Kuliah</span>
              <select
                className="border rounded px-4 py-2"
                value={selectedMataKuliah || ""}
                onChange={(e) => handleMataKuliahChange(e.target.value)}
              >
                <option value="">-- Pilih Mata Kuliah --</option>
                {filteredMataKuliah.map((mk) => (
                  <option key={mk.kode_mk} value={mk.kode_mk}>
                    {mk.kode_mk} - {mk.nama}
                  </option>
                ))}
              </select>

            </div>
            <div className="flex flex-row items-end justify-center w-full md:w-2/5">
              <div className="flex w-[55%] items-start rounded-full justify-start bg-gray-200 py-2 px-6 font-medium text-gray-700 text-sm">
                {mataKuliahList.find(item => item.kode_mk === selectedMataKuliah)?.kode_mk || 'Kode MK'}
              </div>

              <div className="flex z-10 -ml-8 w-1/3 items-center justify-center rounded-full font-medium bg-gray-300 py-2 text-gray-700 text-sm">
                {mataKuliahList.find(item => item.kode_mk === selectedMataKuliah)?.sks 
                ? `${mataKuliahList.find(item => item.kode_mk === selectedMataKuliah)?.sks} SKS` 
                : 'SKS'}
              </div>
            </div>
          </div>

          {/* Row 2: Kelas, Hari, Ruang */}
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-col w-full sm:w-1/6">
              <span className="text-lg font-medium">Kelas</span>
              <select
                className="border rounded px-4 py-2"
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
              >
                <option value="">Kelas</option>
                {kelasList.map((kelas: any) => (
                  <option key={kelas.id} value={kelas.kelas}>
                    {kelas.kelas}
                  </option>
                ))}
              </select>

            </div>

            <div className="flex flex-col w-full sm:w-1/6">
              <span className="text-lg font-medium">Hari</span>
              <select
                className="border rounded px-4 py-2"
                value={selectedHari || ''}
                onChange={(e) => setSelectedHari(e.target.value)}
              >
                <option value="">Hari</option>
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((hari) => (
                  <option key={hari} value={hari}>
                    {hari}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full sm:w-1/5">
              <span className="text-lg font-medium">Ruang</span>
              <select
                className="border rounded px-4 py-2"
                value={selectedRuang}
                onChange={(e) => setSelectedRuang(e.target.value)}
              >
                <option value="">Ruang</option>
                {ruangList.map((ruang:any) => (
                <option key={ruang.kode_ruang} value={ruang.kode_ruang}>
                  {ruang.kode_ruang}
                </option>
              ))}
              </select>
            </div>
          </div>

          {/* Row 3: Waktu */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col w-full sm:w-1/3">
              <span className="text-lg font-medium">Waktu</span>
              <div className="flex flex-row items-center gap-2 mt-2">

                <select
                  id="start-time"
                  className="border rounded py-2 px-3 text-gray-700"
                  value={selectedStartTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                >
                  <option value="">Mulai</option>
                  {waktuList.map((waktu: any) => (
                    <option key={waktu.id} value={waktu.waktu_mulai}>
                      {waktu.waktu_mulai.slice(0,5)}
                    </option>
                  ))}
                </select>

                <span className="text-gray-600">-</span>

                <div className="flex flex-col items-center rounded-md bg-gray-200 px-4 py-2 text-gray-700">
                  {endTime||'Akhir'}

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button Reset, Submit, Pratinjau */}
        <div className="flex flex-wrap justify-between items-center mt-2 gap-2 w-full">
          <button
            type="button"
            onClick={handleReset}
            className="flex flex-1 items-center justify-center gap-2 text-white text-lg font-semibold rounded-md px-4 py-1 focus:ring-4 bg-button-red hover:bg-button-hv_red focus:ring-red-500 w-full sm:w-auto"
          >
            RESET
            <GrPowerReset className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={checkAvailability}
            className="flex items-center justify-center gap-2 text-white text-lg font-semibold rounded-md px-6 py-1 focus:ring-4 bg-button-yellow hover:bg-button-hv_yellow focus:ring-yellow-500 w-full sm:w-auto"
          >
            CEK KETERSEDIAAN
            <IoEyeSharp className="w-6 h-6" />
          </button>
          
          <button
            type="button"
            onClick={handleSubmitJadwal}
            disabled={availabilityMessage !== "Jadwal tersedia"}
            className={`flex items-center justify-center gap-2 text-white text-lg font-semibold rounded-md px-6 py-1 focus:ring-4 ${
              availabilityMessage === "Jadwal tersedia"
                ? 'bg-button-green hover:bg-button-hv_green focus:ring-green-500'
                : 'bg-gray-400 cursor-not-allowed'
            } w-full sm:w-auto`}
          >
            BUAT JADWAL
            <MdNoteAdd className="w-5 h-5" />
          </button>
        </div>
    <div>
</div>
</div>

        {/* PRATINJAU JADWAL */}
        <div className="flex flex-col rounded-md w-1/3 h-4/5 bg-primary-fg ml-6 text-primary-dark">
          <div className="flex flex-col items-center text-center justify-start px-4 mt-4 text-lg font-medium">
            {previewData?.mataKuliah || "(Nama Mata Kuliah)"}
          </div>

          <div className="flex flex-col items-center text-center justify-start px-4 text-sm font-thin">
            {previewData ? `${previewData.kodeMk} | ${previewData.sks} SKS` : "KODE MK | SKS"}
          </div>

          <div className="flex flex-col items-start text-left justify-start px-8 mt-8 font-light">
            <div>Kelas: {previewData?.kelas || "-"}</div>
            <div>Hari: {previewData?.hari || "-"}</div>
            <div>Jam: {previewData?.waktu ? `${previewData.waktu.mulai.slice(0,5)} - ${previewData.waktu.akhir}` : "-"}</div>
            <div>Ruang: {previewData?.ruang || "-"}</div>
          </div>

          <div className="flex flex-col items-start text-left justify-start px-8 mt-8 font-light">
              {availabilityMessage && 
              <p style={getMessageStyle()}>{availabilityMessage}</p>}
          </div>
        </div>
      
    </PenyusunanJadwalLayout>
    );
};

export default BuatJadwal;