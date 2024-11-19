import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { url } from 'inspector';
import { RxExit } from 'react-icons/rx';

export default function AdminDashboard({auth}: PageProps) {
    const {url} = usePage().props;
    

    return (
        <Authenticated
            // title="Admin Dashboard"
            user={auth.user}
            header="Dashboard Akademik"
            header1="Notifikasi"
           
            

        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Welcome to the Admin Dashboard, {auth.user.name}!</div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}