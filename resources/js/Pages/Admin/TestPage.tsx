import PageLayout from "@/Layouts/PageLayout";
import react from "react";
import { PageProps } from "@/types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, usePage } from "@inertiajs/react";
import { HiBuildingLibrary } from "react-icons/hi2";



export default function TestPage({auth}: PageProps) {
    const {url} = usePage().props;

    return (
        <PageLayout
        user = {auth.user}
        back = {
            <Link href={route("pembimbing.dashboard")}>
                <h2 className="mb-3 ml-10 mt-5 text-3xl font-bold leading-tight text-primary-dark">
                    <FontAwesomeIcon icon={faChevronLeft} className="mr-3" />
                    Persetujuan IRS
                </h2>
            </Link>
        }
        sidebarChildren = {
            <div
                className={`flex h-12 items-center justify-between space-x-4 flex-row text-white text-xl
                    ${
                        url == "/admin/alokasiruang" ? "" : " text-white opacity-100"
                    }
                    `}
                
            
            >       
                <HiBuildingLibrary className='w-8 h-8'/>
                
                <Link href={route("admin.alokasiruang")}>Alokasi Ruang</Link>
            
            </div>
        }
        >



        </PageLayout>
    )


}