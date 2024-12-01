import React, { useState } from "react";
import EntriesPerPage from "./EntriesPerPage";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface DataItem {
  [key: string]: any;
}

interface Column {
  header: string;
  accessor: string | ((item: any) => string| JSX.Element); 
}

interface TableComponentProps {
  data: DataItem[];
  columns: Column[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  columns,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page

  // Handle input pencarian
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset ke halaman pertama
  };

  // Filter data berdasarkan input pencarian
  const filteredData = Array.isArray(data)
  ? data.filter((item) =>
      columns.some((column) => {
        const value =
          typeof column.accessor === "function"
            ? column.accessor(item)
            : item[column.accessor];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    )
  : [];
  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEntriesPerPageChange = (value: number) => {
    setEntriesPerPage(value);
    setCurrentPage(1); // Reset ke halaman pertama
  };

  return (
    <div className="relative overflow-x-auto mr-16">
      <div className="flex flex-col justify-start items-start space-y-4">
        <div className="flex flex-row justify-between items-center w-full">
          {/* Cari */}
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-600 border border-gray-300 rounded-lg w-60 hover:bg-primary-fg"
              placeholder="Cari"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* EntriesPerPage */}
          <EntriesPerPage
            entriesPerPage={entriesPerPage}
            onChange={handleEntriesPerPageChange}
          />
        </div>

        {/* Tabel */}
        <table className="w-full border border-gray-300 font-light text-left text-gray-700 dark:text-gray-400 rounded-sm">
          <thead className="text-primary-dark border-b border-primary-bg bg-primary-fg dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 text-left align-middle font-medium border border-gray-300" // Border vertikal
              >
                No
              </th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-3 font-medium border border-gray-300" // Border vertikal
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr
                key={index}
                className="text-sm bg-white border-b border-primary-bg dark:bg-gray-800 dark:border-gray-700 hover:bg-primary-fg dark:hover:bg-gray-600"
              >
                <td className="px-2 py-4 text-left align-middle border border-gray-300">
                  {startIndex + index + 1}
                </td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-4 border border-gray-300"> {/* Border vertikal */}
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : item[column.accessor] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="w-full flex flex-row justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 py-2 text-sm bg-primary-fg rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-light"
            }`}
          >
            <IoIosArrowBack />
          </button>
          <span className="text-gray-700 text-md">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 py-2 text-sm bg-primary-fg rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-light"
            }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;