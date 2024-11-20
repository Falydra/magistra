import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';


export default function Dashboard({auth}: PageProps) {
   const { notification } = usePage().props;


    return (
        <AuthenticatedLayout

            // user={auth.user}
            header={"Dashboard"}

            user={auth.user}
            header1={"Dashboard User"}

            // header2="Notifikasi"
        >
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome to the Admin Dashboard, {auth.user.name}, {auth.user.role}!
                            <div className="mt-4">
                       
                            </div>
                      
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
