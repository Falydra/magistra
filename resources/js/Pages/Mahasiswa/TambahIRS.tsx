import { Button } from "@/Components/ui/button";
import PageLayout from "@/Layouts/PageLayout";
import { IRSProps, JadwalProps, KelasProps, MahasiswaProps, MatakuliahProps, PageProps, RuangProps } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaMoneyBills, FaPlus } from "react-icons/fa6";
import { HiAcademicCap, HiBuildingLibrary } from "react-icons/hi2";
import { LuFilePlus2 } from "react-icons/lu";
import { toast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/Components/ui/breadcrumb";

interface FormData {
  id_jadwal: number[];
  total_sks: number;
}

interface SessionData extends PageProps {
  session: {
    selected_ids: number[];
    total_sks: number;
  };
}

export default function IRSMahasiswa({ mahasiswa, irs, matakuliah, jadwal, kelas, ruang }: MahasiswaProps & IRSProps & MatakuliahProps & JadwalProps & KelasProps & RuangProps) {
  const { url } = usePage().props;
  const { auth } = usePage().props;
  const { session } = usePage<SessionData>().props;
  const [filteredJadwal, setFilteredJadwal] = useState(jadwal);
  const [filterSKS, setFilterSKS] = useState<number | null>(null);
  const [filterSemester, setFilterSemester] = useState<number | null>(null);
  const [filterJenis, setFilterJenis] = useState<string | null>(null);
  const [selectedKelas, setSelectedKelas] = useState<{ [key: string]: string | null }>({});
  const semester = [1, 2, 3, 4, 5, 6, 7, 8];
  const jenis = ["Wajib", "Pilihan"];

  const { data, setData, post, errors } = useForm<FormData>({
    id_jadwal: session?.selected_ids || [],
    total_sks: session?.total_sks || 0,
  });

  useEffect(() => {
    const filteredData = jadwal.filter((item) => {
      const matchSemester = filterSemester === null || item.semester === filterSemester;
      const matchSKS = filterSKS === null || item.sks === filterSKS;
      const matchJenis = filterJenis === null || item.jenis === filterJenis;
  
      return matchSemester && matchSKS && matchJenis;
    });
  
    setFilteredJadwal(filteredData);
  }, [filterSemester, filterSKS, filterJenis, jadwal]);
  

  const Paginateprops = ["5", "10", "25", "50"];

  const handleFilterChangeSemester = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSemester(e.target.value ? parseInt(e.target.value) : null);
  };

  const handleFilterChangeSKS = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSKS(e.target.value ? parseInt(e.target.value) : null);
  };

  const handleFilterChangeJenis = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterJenis(e.target.value);
  };

  const handlePageChange = (url: string | null) => {
    if (url) {
      Inertia.get(url);
    }
  };

  const handleInputChange = (id: number, sks: number) => {
    const isSelected = data.id_jadwal.includes(id);

    // Tentukan array id_jadwal yang baru
    const newIdJadwal = isSelected
      ? data.id_jadwal.filter((item) => item !== id) // Hapus id jika sudah dipilih
      : [...data.id_jadwal, id]; // Tambahkan id jika belum dipilih

    // Hitung total SKS baru
    const newTotalSKS = isSelected ? data.total_sks - sks : data.total_sks + sks;

    // Jika total SKS melebihi maksimum, beri peringatan dan batalkan perubahan
    if (newTotalSKS > maxSKS) {
      toast({
        variant: "destructive",
        title: "SKS Mencapai Batas Maksimum",
        className: "bg-primary-red",
        description: `Total SKS: ${data.total_sks}`,
        duration: 2500,
      });
      return;
    }

    if (newTotalSKS > maxSKS) {
      toast({
        variant: "destructive",
        title: "SKS Mencapai Batas Maksimum",
        className: "bg-primary-red",
        description: `Total SKS: ${data.total_sks}`,
        duration: 2500,
      });
      return;
    }

    // Jika total SKS kurang dari 0, beri peringatan dan batalkan perubahan
    if (newTotalSKS < 0) {
      toast({
        variant: "destructive",
        title: "SKS Tidak Boleh Negatif",
        className: "bg-primary-red",
        description: `Total SKS: ${data.total_sks}`,
        duration: 2500,
      });
      return;
    }

    

    // Perbarui data
    setData({
      id_jadwal: newIdJadwal,
      total_sks: newTotalSKS,
    });

    // Beri notifikasi sukses
    toast({
      variant: "default",
      title: `Total SKS: ${newTotalSKS}`,
      className: "bg-primary-green",
      description: `Sisa SKS: ${maxSKS - newTotalSKS}`,
      duration: 2500,
    });
  };

  const handleSelectKelas = (kodeMk: string, kelas: string) => {
    setSelectedKelas((prev) => ({
      ...prev,
      [kodeMk]: prev[kodeMk] === kelas ? null : kelas, // Deselect if the same class is selected again
    }));

    const selectedJadwal = jadwal.find((j) => j.kode_mk === kodeMk && j.kelas === kelas);
    if (selectedJadwal) {
      setData((prevData) => ({
        ...prevData,
        id_jadwal: prevData.id_jadwal.filter((id) => jadwal.find((j) => j.id === id)?.kode_mk !== kodeMk),
      }));

      if (selectedKelas[kodeMk] !== kelas) {
        setData((prevData) => ({
          ...prevData,
          id_jadwal: [...prevData.id_jadwal, selectedJadwal.id],
        }));
      }
    }
  };
  console.log("Data dikirim:", data); // Debug sebelum pengiriman
  console.log("Cek Validitas ROute:", mahasiswa.hasMadeIRS);
  console.log(mahasiswa.nim);
 

  const handleSubmit = () => {
    console.log("Data dikirim:", data); // Debug sebelum pengiriman
    const currentSemesterIRS = irs.find((item) => item.semester === mahasiswa.semester);
    const routeName = currentSemesterIRS ? "mahasiswa.updateIRS" : "mahasiswa.storeirs";
    post(route(routeName, { id: currentSemesterIRS?.id }), {
      id_jadwal: data.id_jadwal,
      total_sks: data.total_sks,
      totalSKS: 0,
    } as Record<string, any>);
  };

  const maxSKS = mahasiswa.ips > 3.0 ? 24 : 20;

  useEffect(() => {
    // Memuat data dari session jika tersedia
    const savedIds = session?.selected_ids || [];
    const savedTotalSKS = session?.total_sks || 0;

    // Set nilai default jika data tidak ada
    setData({
      id_jadwal: savedIds,
      total_sks: savedTotalSKS,
    });

    // Tandai kelas yang telah dipilih berdasarkan data sesi
    const savedKelas: Record<string, string> = {};
    savedIds.forEach((id) => {
      const jadwalItem = jadwal.find((j) => j.id === id);
      if (jadwalItem) {
        savedKelas[jadwalItem.kode_mk] = jadwalItem.kelas;
      }
    });
    setSelectedKelas(savedKelas);
  }, [jadwal, session]);

  

 

  //Console log data.id_jadwal tetapi di mapping
  

  return (
    <PageLayout user={auth.user} back={
      <>
        <Breadcrumb className="ml-10 mt-8 text-black">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/mahasiswa/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>IRS</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </>
    } sidebarChildren={
      <>
        <div className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${url == "/mahasiswa/registrasi" ? "" : " text-white opacity-100"}`}>
          <HiAcademicCap className="w-8 h-8" />
          <Link href={route("mahasiswa.registrasi")}>Registrasi</Link>
        </div>
        <div className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${url == "/mahasiswa/pembayaran" ? "" : " text-white opacity-100"}`}>
          <FaMoneyBills className="w-8 h-8" />
          <Link href={route("mahasiswa.pembayaran")}>Pembayaran</Link>
        </div>
        <div className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${url == "/mahasiswa/irs" ? "" : " text-white opacity-100"}`}>
          <LuFilePlus2 className="w-8 h-8" />
          <Link href={route("mahasiswa.irs")}>IRS</Link>
        </div>
        <div className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl ${url == "/mahasiswa/khs" ? "" : " text-white opacity-100"}`}>
          <HiBuildingLibrary className="w-8 h-8" />
          <Link href={route("mahasiswa.khs")}>KHS</Link>
        </div>
      </>
    }>
      <div className="flex flex-col w-full items-start justify-start space-y-2 overflow-y-auto ">
        <div className="flex w-full flex-row items-center justify-start ml-10 mt-2 text-primary-bg">
          <h1 className="text-2xl font-semibold">{mahasiswa.nama} |</h1>
          <h1 className="text-2xl font-semibold">| {mahasiswa.nim}</h1>
        </div>
        <div className="flex flex-row w-11/12 text-sm font-sans bg-primary-bg p-4 rounded-lg text-white h-16 ml-10 items-center justify-around ">
          <div className="w-full items-center justify-center flex-col flex">
            <h3 className="text-base">IPs</h3>
            <h1 className="text-2xl">{mahasiswa.ips}</h1>
          </div>
          <div className="w-full items-center justify-center flex-col flex">
            <h3 className="text-base">Maks SKS</h3>
            <h1 className="text-2xl">{maxSKS}</h1>
          </div>
          <div className="w-full items-center justify-center flex-col flex">
            <h3 className="text-base">Total SKS</h3>
            <h1 className="text-2xl">{data.total_sks}</h1>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-between pl-10 space-x-4">
          <div className="flex items-center space-x-4">
            Semester
            <select id="filterSemester" className="w-36 h-10 border-2 border-primary-dark rounded-md" value={filterSemester || ''} onChange={handleFilterChangeSemester}>
              <option value="" disabled>Semester</option>
              {semester.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
            
            SKS
            <select id="filterSKS" className="w-32 h-10 border-2 border-primary-dark rounded-md ml-4" value={filterSKS || ''} onChange={handleFilterChangeSKS}>
              <option value="" disabled>SKS</option>
              {[1, 2, 3, 4].map((sks) => (
                <option key={sks} value={sks}>
                  {sks} SKS
                </option>
              ))}
            </select>
            Jenis
            <select id="filterJenis" className="w-32 h-10 border-2 border-primary-dark rounded-md" value={filterJenis || ''} onChange={handleFilterChangeJenis}>
              <option value="" disabled>Semua</option>
              {jenis.map((jen) => (
                <option key={jen} value={jen}>
                  {jen}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="">
              Total SKS: {data.total_sks} / {maxSKS}
            </div>
            
            <button type="submit" className="rounded-md bg-primary-bg w-42 h-12 mr-10 flex text-center items-center justify-center text-white gap-2" onClick={handleSubmit}>
              <FaPlus className="w-6 h-6 self-center" />
              <h1 className="self-center">Tambah MataKuliah</h1>
            </button>
          </div>
        </div>
        <div className='w-full overflow-x-hidden overflow-y-auto pl-10 pr-6 '>
          <table className="min-w-full text-center border table-fixed">
            <thead className='p-8 '>
              <tr className='p-8'>
                <th className='py-3 border'>Pilih</th>
                <th className='py-3 border'>Kode MK</th>
                <th className='py-3 border'>Mata Kuliah</th>
                <th className='py-3 border '>Semester</th>
                <th className='py-3 border '>SKS</th>
                <th className='py-3 border '>Dosen Pengampu </th>
                <th className='py-3 border '>Kelas</th>
                <th className='py-3 border '>Hari, Jam</th>
                <th className='py-3 border '>Ruang </th>
                <th className='py-3 border '>Sisa Kuota</th>
              </tr>
            </thead>
            <tbody className='text-center scrollbar-hidden overflow-y-auto min-h-[4000px] '>
              {filteredJadwal.map((jadwalItem, index) => {
                const isFirstOccurrence = index === 0 || jadwalItem.kode_mk !== filteredJadwal[index - 1].kode_mk;

                return (
                  <tr key={jadwalItem.id} className="border">
                    {isFirstOccurrence && (
                      <>
                        <td className="py-3 border" rowSpan={filteredJadwal.filter(j => j.kode_mk === jadwalItem.kode_mk).length}>
                          <input type="checkbox" checked={data.id_jadwal.includes(jadwalItem.id)} onChange={() => handleInputChange(jadwalItem.id, jadwalItem.sks)} />
                        </td>
                        <td className="py-3 border" rowSpan={filteredJadwal.filter(j => j.kode_mk === jadwalItem.kode_mk).length}>
                          {jadwalItem.kode_mk}
                        </td>
                        <td className="py-3 border" rowSpan={filteredJadwal.filter(j => j.kode_mk === jadwalItem.kode_mk).length}>
                          {jadwalItem.nama}
                        </td>
                        <td className="py-3 border" rowSpan={filteredJadwal.filter(j => j.kode_mk === jadwalItem.kode_mk).length}>
                          {jadwalItem.semester}
                        </td>
                        <td className="py-3 border" rowSpan={filteredJadwal.filter(j => j.kode_mk === jadwalItem.kode_mk).length}>
                          {jadwalItem.sks}
                        </td>
                        <td className="py-3 border" rowSpan={filteredJadwal.filter(j => j.kode_mk === jadwalItem.kode_mk).length}>
                          <span>
                            {jadwalItem.dosen_1}<br />
                            {jadwalItem.dosen_2}<br />
                            {jadwalItem.dosen_3}
                          </span>
                        </td>
                      </>
                    )}
                    <td className="py-3 border">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center justify-center gap-1">
                          <input type="radio" name={`kelas-${jadwalItem.kode_mk}`} checked={selectedKelas[jadwalItem.kode_mk] === jadwalItem.kelas} onChange={(e) => handleSelectKelas(jadwalItem.kode_mk, jadwalItem.kelas)} />
                          <span>{jadwalItem.kelas}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 border">
                      {jadwalItem.hari}, {jadwalItem.waktu_mulai} - {jadwalItem.waktu_akhir}
                    </td>
                    <td className="py-3 border">
                      <div className="flex flex-col w-25">
                        <span>{jadwalItem.kode_ruang}</span>
                      </div>
                    </td>
                    <td className="py-3 border">
                      <div className="flex flex-col">
                        <span>{matakuliah.find(m => m.kuota === jadwalItem.kuota)?.kuota}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}