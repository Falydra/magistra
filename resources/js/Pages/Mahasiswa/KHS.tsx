import PageLayout from "@/Layouts/PageLayout";
import { PageProps } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { FaMoneyBills } from "react-icons/fa6";
import { HiAcademicCap, HiBuildingLibrary } from "react-icons/hi2";
import { LuFilePlus2 } from "react-icons/lu";

export default function KHS({auth}: PageProps) {
    
    const {url} = usePage().props;

    return (
        <PageLayout
        user={auth.user}
        back = {
            <Link href={route("mahasiswa.dashboard")}>
                    <h2 className="mb-4 ml-10 text-3xl font-bold leading-tight text-primary-dark">
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                        Registrasi
                    </h2>
                </Link>
        }

        sidebarChildren = {
            <>
                 <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/registrasi" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <HiAcademicCap className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.registrasi")}>Registrasi</Link>
            
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/pembayaran" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <FaMoneyBills className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.pembayaran")}>Pembayaran</Link>
            
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/irs" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <LuFilePlus2 className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.irs")}>IRS</Link>
            
            </div>
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/mahasiswa/khs" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <HiBuildingLibrary className='w-8 h-8'/>
                
                <Link href={route("mahasiswa.khs")}>KHS</Link>
            
            </div>
            </>
        }
        
        
        
        
        >




        </PageLayout>
    );

}