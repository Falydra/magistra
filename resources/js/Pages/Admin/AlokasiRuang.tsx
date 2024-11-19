    import PageLayout from "@/Layouts/PageLayout";
    import { PageProps } from "@/types";
    import { Link } from "@inertiajs/react";
    import { usePage } from "@inertiajs/react";
    import { useState } from "react";
    import { MdOutlineArrowBackIos } from "react-icons/md";
    import TextInput from "@/Components/TextInput";



    interface DummyDataProps {
        id: number;
        name: string;
        email: string;
        instansi: string;
        no_hp: string;
        bukti_bayar: string | null;
        twibbon: string | null;
        is_verif: string;
    }


    interface GedungProps {
        id: number;
        name: string;
        kapasitas: number;
        is_available: boolean;
    }

    export default function AlokasiRuang({auth} : PageProps) {
        const {url} = usePage().props;

        const [dummyData, setDummyData] = useState<DummyDataProps[]>([
            { id: 1, name: 'Alice', email: 'alice@example.com', instansi: 'Instansi A', no_hp: '123456789', bukti_bayar: null, twibbon: null, is_verif: '0' },
            { id: 2, name: 'Bob', email: 'bob@example.com', instansi: 'Instansi B', no_hp: '987654321', bukti_bayar: 'https://example.com/bukti_bayar1', twibbon: 'https://example.com/twibbon1', is_verif: '1' }
        ]);


        const [gedungData, setGedungData] = useState<GedungProps[]>([
            { id: 1, name: 'A', kapasitas: 100, is_available: true },
            { id: 2, name: 'B', kapasitas: 50, is_available: false },
            { id: 3, name: 'C', kapasitas: 75, is_available: true },
            { id: 4, name: 'D', kapasitas: 60, is_available: false },
            { id: 5, name: 'E', kapasitas: 90, is_available: true },
            { id: 6, name: 'F', kapasitas: 70, is_available: false }
        ]);
        


        const handleStatusChange = (id: number, updatedVerif: string) => {
            setDummyData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, is_verif: updatedVerif } : item
                )
            );
        };


        return (
            <PageLayout
            header={"Alokasi Ruang"}
            user={auth.user}
            SideBarChildren =  {
                    
                <div className='flex mb-24'>
                    <div className={`flex h-12 items-center justify-between space-x-4    flex-row text-white mr-12 text-xl ${url == "/admin/alokasiruang" ? "": "text-white opacity-50"} `}>
                        
                        <Link href={(route("admin.alokasiruang"))}>
                                    Alokasi Ruang
                        </Link>
                            
                    </div>           
                </div>
            }

            headerChildren = {
                <div className="flex flex-row w-full items-center justify-center mt-8">
                    <div className="flex flex-row w-full items-start justify-center gap-4">
                        <Link href={(route("admin.dashboard"))} className="flex flex-row items-center justify-center">
            
                            <MdOutlineArrowBackIos className=" blue-500 w-6 h-6" />
                        </Link>
                        <h2 className="text-2xl font-semibold text-center text-primary-bg">Alokasi Ruang</h2>

                    </div>
                    <div className="flex flex-row items-end justify-center w-full">
                        <div className="flex flex-row items-start justify-between w-full mt-12 bg-white h-full">    
                            <div>
                                <TextInput
                                    className="w-64 mx-10"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            }
            >
                <div className="flex flex-col w-full h-full items-center justify-center">
                <div className="flex w-full justify-center my-4">
                    <select
                        className='bg-white border border-gray-300 rounded-md shadow-sm w-1/4 focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                        defaultValue=""
                    >
                        <option value="" disabled>Pilih Gedung</option>
                        {gedungData.map((gedung) => (
                            <option key={gedung.id} value={gedung.name}>{gedung.name}</option>
                        ))}
                    </select>
                </div>
                    <div className='w-full overflow-x-auto scrollbar-hidden'>
                        <table className="min-w-full text-center border table-fixed">
                            <thead className='p-10'>
                                <tr className='p-10'>
                                    <th className='py-3 border'>No</th>
                                    <th className='py-3 border'>Nama</th>
                                    <th className='py-3 border '>Email</th>
                                    <th className='py-3 border '>Instansi</th>
                                    <th className='py-3 border '>Nomor HP</th>
                                    <th className='py-3 border '>Bukti Bayar</th>
                                    <th className='py-3 border '>Twibbon</th>
                                    <th className='py-3 border '>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {dummyData.length > 0 ? (
                                    dummyData.map((item, index) => (
                                        <tr key={item.id} className='text-center'>
                                            <td className='px-8 border'>{index + 1}</td>
                                            <td className='px-8 text-left border'>{item.name}</td>
                                            <td className='px-8 border'>{item.email}</td>
                                            <td className='px-8 border'>{item.instansi}</td>
                                            <td className='px-8 border'>{item.no_hp}</td>
                                            <td className='px-8 border'>
                                                {item.bukti_bayar ? (
                                                    <a href={item.bukti_bayar} target='_blank' className='text-dcf-orange-500'>Lihat</a>
                                                ) : (
                                                    <p className='text-dcf-orange-100'>Belum diunggah</p>
                                                )}
                                            </td>
                                            <td className='px-8 border'>
                                                {item.twibbon ? (
                                                    <a href={item.twibbon} target='_blank' className='text-dcf-orange-500'>Lihat</a>
                                                ) : (
                                                    <p className='text-red'>Belum diunggah</p>
                                                )}
                                            </td>
                                            <td className='px-8 border'>
                                                <select
                                                    value={item.is_verif}
                                                    onChange={(event) => {
                                                        handleStatusChange(item.id, event.target.value);
                                                    }}
                                                    className='bg-white border border-gray-300 rounded-md shadow-sm w-fit focus:outline-none focus:ring-dcf-orange-500 focus:border-dcf-orange-500 sm:text-sm'
                                                >
                                                    <option value='' disabled>Pilih Status</option>
                                                    <option value="1">Terverifikasi</option>
                                                    <option value="0">Belum Terverifikasi</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="text-center">Belum ada data.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </PageLayout>
        )
    }