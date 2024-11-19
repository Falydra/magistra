import React, { useState } from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function AdminDashboard({auth}: PageProps) {
    const dataDummy = [
        // Sample data (can be populated later)
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    // Handle year selection
    const handleYearSelect = (year: string) => {
        setSelectedYear(year);
        setIsDropdownOpen(false); // Close the dropdown after selection
    }

    return (
        <Authenticated
            user={auth.user}
            header="Dashboard Akademik"
            header1="Notifikasi"
        >
            <Head title="Dashboard" />
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                <div>
                    <button 
                        id="dropdownActionButton" 
                        onClick={toggleDropdown}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    >
                        {selectedYear ? `Selected Year: ${selectedYear}` : "Select Year"}
                    </button>
                    
                    {/* Dropdown menu */}
                    <div 
                        id="dropdownAction" 
                        className={`z-10 ${isDropdownOpen ? '' : 'hidden'} bg-white divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 dark:divide-gray-600`}
                    >
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                            {['2021', '2022', '2023', '2024'].map(year => (
                                <li key={year}>
                                    <a 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleYearSelect(year);
                                        }}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {year}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Example section for content based on selected year */}
            {selectedYear && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">Data for {selectedYear}</h2>
                    {/* Render data for the selected year */}
                    <div>
                        {/* Replace this with real data content */}
                        <p>Displaying data for year {selectedYear}...</p>
                    </div>
                </div>
            )}
        </Authenticated>
    );
}
