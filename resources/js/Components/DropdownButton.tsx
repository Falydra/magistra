// import React, { ReactNode } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {useState} from 'react';


// interface DropdownButtonProps {
//     title: string;
// }

// const DropdownButton = ({title}: DropdownButtonProps) => {
//     const [selectedAngkatan, setSelectedAngkatan] = useState<string | null>(null);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     return (
//         <button
//             id="angkatanDropdown"
//             className="w-auto bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           >
//             {selectedAngkatan || {title}}
//             <FontAwesomeIcon
//               icon={faChevronLeft}
//               className={`ml-2 transform transition-transform inline-block ${isDropdownOpen ? "rotate-90" : "-rotate-90"}`}
//             />
//           </button>
//     )
// }