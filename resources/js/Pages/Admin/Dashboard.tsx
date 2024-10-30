import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function AdminDashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <Authenticated
            // title="Admin Dashboard"
            header={<h1 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h1>}
        >
            <Head title="Admin Dashboard" />

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