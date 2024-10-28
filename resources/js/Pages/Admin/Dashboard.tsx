import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <Authenticated
            user={auth.user}
            title={"Dashboard"}
            header={"Dashboard"}	
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}