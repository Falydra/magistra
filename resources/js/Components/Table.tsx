import React, { useState } from 'react';

interface DataItem {
    [key: string]: any;
}

interface Column {
    header: string;
    accessor: string;
}

interface TableComponentProps {
    data: DataItem[];
    columns: Column[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nim?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-8 mr-16">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/* Checkbox */}
                        <th scope="col" className="p-2 text-center align-middle">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600" />
                        </th>
                        {/* No */}
                        <th scope="col" className="px-2 py-3 text-left align-middle">No</th>
                        {/* No */}
                        {columns.map((column, index) => (
                            <th key={index} scope="col" className="px-4 py-3">{column.header}</th>
                        ))}
                        {/* <th scope="col" className="px-4 py-3">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            {/* Checkbox */}
                            <td className="w-4 p-2 text-center align-middle">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600" />
                            </td>
                            <td className="px-2 py-4 text-left align-middle">{index + 1}</td>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-4 py-4">
                                    {item[column.accessor] || "-"}
                                </td>
                            ))}
                            {/* <td className="px-4 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
