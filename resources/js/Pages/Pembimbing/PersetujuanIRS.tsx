import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import PembimbingLayout from '@/Layouts/PageLayout'; // Pastikan nama impor sesuai dengan nama file
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/Components/ui/button';
import PageLayout from '@/Layouts/PageLayout';

export default function Dashboard({auth}: PageProps) {
    const { notification } = usePage().props;
    
 
     return (
         <PageLayout
             user={auth.user}
         >
             <Head title="Persetujuan IRS" />
             {/* <div className="flex flex-row items-start justify-between w-full mt-12 bg-white h-full">
                <Link href={route("pembimbing.dashboard")}>
                    
                    <h2 className="mb-3 ml-12 mt-5 text-3xl font-bold leading-tight  text-primary-dark">
                    <FontAwesomeIcon icon={faChevronLeft} className='mr-5'/>
                    Persetujuan IRS
                    </h2>
                </Link>
                <div>
                    <TextInput
                        className="w-64 mx-10 mt-5"
                        placeholder="Search"
                        // icon="search"
                    />
                </div>
            </div> */}
            <div className="flex flex-col items-center justify-start w-4/5 min-h-full bg-white z-10 rounded-3xl">
                <div className="flex flex-row items-start justify-between w-full mt-12 bg-white h-full">
                    <Link href={route("pembimbing.dashboard")}>
                        <h2 className="mb-3 ml-12 mt-5 text-3xl font-bold leading-tight  text-primary-dark">
                        <FontAwesomeIcon icon={faChevronLeft} className='mr-5'/>
                        Persetujuan IRS
                        </h2>
                    </Link>
                    <div className='flex flex-row ml-auto'>
                        <TextInput
                            className="w-64 mx-10 mt-5"
                            placeholder="Search"
                            // icon="search"
                        />
                    </div>
                    <div className='flex flex-row -mr-80 mt-1' >
                    <div className="flex w-16 h-16 rounded-full bg-black"/>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Button className=''>
                            Test
                        </Button>
                    </div>

                </div>
    
            </div>
             
    </PageLayout>
    );
}
 