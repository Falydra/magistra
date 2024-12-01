import React, { useState, useEffect } from 'react';
import PenyusunanJadwalLayout from "@/Layouts/PenyusunanJadwalLayout";

import { FaRegCalendarPlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IoEyeSharp } from "react-icons/io5";
import { MdNoteAdd } from "react-icons/md";

// =======================================================================================================
// |                                                 DEKLARASI                                           | 
// =======================================================================================================

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

// =====================================================================================================
// |                                                 VARIABEL                                           | 
// =====================================================================================================

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

  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [isActive, setIsActive] = useState(false); // Status tombol
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);

// =====================================================================================================
// |                                               FETCH DATA                                           | 
// =====================================================================================================

  useEffect(() => {
      fetch('/mata-kuliah') // Pastikan endpoint backend sesuai
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((item: any) => ({
            label: `${item.kode_mk} - ${item.nama}`,
            value: item.nama,
            nama: item.nama,
            kode_mk: item.kode_mk,
            sks: item.sks,
            semester: Number(item.semester), // Konversi semester ke number
          }));
          setMataKuliahList(formattedData);
        })
        .catch((error) => console.error('Error fetching mata kuliah:', error));

      // Fetch Kelas data
      fetch('/kelas')
      .then(response => response.json())
      .then(data => setKelasList(data));

    // Fetch Ruang data
    fetch('/ruang')
      .then(response => response.json())
      .then(data => setRuangList(data));

    // Fetch waktu mulai
    fetch('/waktu')
    .then((response) => response.json())
    .then((data) => {
      console.log('Waktu List:', data); // Debug log
      setWaktuList(data);
    })
    .catch((error) => console.error('Error fetching waktu:', error));
  }, []);

useEffect(() => {
  fetch('/cek-jadwal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ruang_id: selectedRuang,
      kelas: selectedKelas,
      hari: selectedHari,
      waktu_mulai: selectedStartTime,
      waktu_akhir: endTime,
      mata_kuliah: selectedMataKuliah,
    }),
  })
})

console.log({
  ruang_id: selectedRuang,
  kelas: selectedKelas,
  hari: selectedHari,
  waktu_mulai: selectedStartTime,
  waktu_akhir: endTime,
  mata_kuliah: selectedMataKuliah,
});

  useEffect(() => {
    if (filteredSemester) {
      const filtered = mataKuliahList.filter(
        (mk) => mk.semester === Number(filteredSemester) // Konversi filteredSemester menjadi number
      );
      setFilteredMataKuliah(filtered);
    } else {
      setFilteredMataKuliah(mataKuliahList); // Tampilkan semua jika semester belum dipilih
    }
  }, [filteredSemester, mataKuliahList]);

// ===================================================================================================
// |                                                 FUNGSI                                           | 
// ===================================================================================================

// Fungsi untuk mendapatkan SKS dari mata kuliah yang dipilih
const getSksFromMataKuliah = (mataKuliah: string) => {
  const selectedMk = mataKuliahList.find((item) => item.value === mataKuliah);
  return selectedMk ? selectedMk.sks : 0; // Return 0 jika tidak ditemukan
};

  // Fungsi untuk menghitung waktu akhir
  const calculateEndTime = (start: string, sks: number) => {
    const timePattern = /^(\d{2}):(\d{2}):(\d{2})$/; // Format waktu 'HH:MM'
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
      // Kosongkan waktu akhir jika data tidak valid
      setEndTime('');
    }
  };

  const handleMataKuliahChange = (value: string) => {
    setSelectedMataKuliah(value); // Update mata kuliah yang dipilih
    if (selectedStartTime) {
      const sks = getSksFromMataKuliah(value); 
      if (sks > 0) {
        const calculatedEndTime = calculateEndTime(selectedStartTime, sks); 
        setEndTime(calculatedEndTime); // Set waktu akhir
      } else {
        setEndTime(''); // Kosongkan jika data tidak valid
      }
    }
  };

  const checkAvailability = async () => {
    if (!selectedRuang || !selectedKelas || !selectedHari || !selectedStartTime || !endTime || !selectedMataKuliah) {
      alert("Lengkapi seluruh data jadwal!");
      return; 
  }

  // Preview
    const selectedMk = mataKuliahList.find((mk) => mk.value === selectedMataKuliah); 
    const sks = selectedMk?.sks || 0; // Ambil SKS
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
    // Format data yang akan dikirim ke backend
    const dataToSend = {
      ruang: selectedRuang,
      kelas: selectedKelas,
      hari: selectedHari,
      waktu_mulai: `${selectedStartTime}`, // Tambahkan detik ke waktu mulai
      waktu_akhir: `${endTime}`, // Pastikan formatnya sesuai
      mata_kuliah: selectedMataKuliah,
    };
  
    // Log data yang akan dikirim ke backend
    console.log("Data yang dikirim ke backend:", JSON.stringify(dataToSend, null, 2));

    try {
      const response = await fetch('/cek-jadwal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          ruang: selectedRuang,
          kelas: selectedKelas,
          hari: selectedHari,
          waktu_mulai: `${selectedStartTime}`,
          waktu_akhir: `${endTime}`,
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

  const handleCreateSchedule = async () => {
    if (!selectedRuang || !selectedKelas || !selectedHari || !selectedStartTime || !endTime || !selectedMataKuliah) {
      alert("Silakan lengkapi semua data sebelum membuat jadwal.");
      return;
    }
  
    // Data yang akan dikirim ke backend
    const dataToSend = {
      ruang: selectedRuang, // kode_ruang
      kelas: selectedKelas, // nama kelas
      hari: selectedHari, // hari
      waktu_mulai: `${selectedStartTime}`, // waktu mulai dalam format H:i:s
      waktu_akhir: endTime, // waktu akhir dalam format H:i
      mata_kuliah: selectedMataKuliah, // nama mata kuliah
    };
  
    try {
      const response = await fetch('/buat-jadwal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(dataToSend), // Kirim data dalam format JSON
      });
  
      const responseData = await response.json();
  
      if (response.ok && responseData.success) {
        alert("Jadwal berhasil disimpan!");
        // Reset form setelah berhasil menyimpan jadwal
        setSelectedRuang('');
        setSelectedKelas('');
        setSelectedHari('');
        setSelectedStartTime('');
        setEndTime('');
        setSelectedMataKuliah('');
        setAvailabilityMessage('');
        setPreviewData(null);
      } else {
        alert(`Gagal menyimpan jadwal: ${responseData.message || "Terjadi kesalahan."}`);
      }
    } catch (error) {
      console.error("Error saat menyimpan jadwal:", error);
      alert("Terjadi kesalahan saat menyimpan jadwal.");
    }
  };
  

// ===================================================================================================
// |                                                 BODY                                            | 
// ===================================================================================================

  return (
    <PenyusunanJadwalLayout currentPage={
      <div className="flex flex-row items-center gap-2">
        <FaRegCalendarPlus className="w-6 h-6 text-primary-dark" />
        <span>Buat Jadwal</span>
      </div>
    }>
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

        {/* Wrapper for responsive layout */}
        <div className="flex flex-col h-full w-full border border-gray-400 rounded-md p-4 gap-4">
          {/* Row 1: Mata Kuliah, Kode MK, SKS */}
          <div className="flex flex-wrap w-full">
            <div className="flex flex-col w-full md:w-[60%]">
              <span className="text-lg font-medium">Mata Kuliah</span>
              <select
                className="border rounded px-4 py-2"
                value={selectedMataKuliah}
                onChange={(e) => handleMataKuliahChange(e.target.value)}
              >
                <option value="">-- Pilih Mata Kuliah --</option>
                {filteredMataKuliah.map((mk) => (
                  <option key={mk.id} value={mk.nama}>
                    {mk.kode_mk} - {mk.nama}
                  </option>
                ))}
              </select>

            </div>
            <div className="flex flex-row items-end justify-center w-full md:w-2/5">
              <div className="flex w-[55%] items-start rounded-full justify-start bg-gray-200 py-2 px-6 font-medium text-gray-700 text-sm">
              {mataKuliahList.find(item => item.value === selectedMataKuliah)
                ?.kode_mk || 
                'Kode MK'}
              </div>

              <div className="flex z-10 -ml-8 w-1/3 items-center justify-center rounded-full font-medium bg-gray-300 py-2 text-gray-700 text-sm">
              {mataKuliahList.find(item => item.value === selectedMataKuliah)?.sks 
                ? `${mataKuliahList.find(item => item.value === selectedMataKuliah)?.sks} SKS` 
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
                {ruangList.map((ruang: any) => (
                  <option key={ruang.id} value={ruang.kode_ruang}>
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
            onClick={handleCreateSchedule}
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