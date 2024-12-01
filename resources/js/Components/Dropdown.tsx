import React, { useState } from "react";

// Komponen Dropdown
interface DropdownProps {
  buttonLabel: string;
  items: { label: string; value: string }[];
  onFilterSelect?: (value: string) => void;
  onValueSelect?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ buttonLabel, items, onFilterSelect, onValueSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(buttonLabel);

  const handleItemClick = (itemLabel: string, itemValue: string) => {
    setSelectedLabel(itemLabel);
    if (onFilterSelect) onFilterSelect(itemValue);  // Kalau onFilterSelect ada, jalankan
    if (onValueSelect) onValueSelect(itemValue);  // Kalau onValueSelect ada, jalankan
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button
        className="min-w-full text-sm text-gray-600 border border-gray-400 bg-white hover:bg-primary-fg focus:ring-4 focus:outline-none focus:ring-gray-200 font-light rounded-md px-4 py-2 text-start inline-flex justify-between items-center"
        type="button"
      >
        {selectedLabel}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute z-30 w-full bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700">
          <ul className="w-full py-2 text-sm text-gray-700 dark:text-gray-200 max-h-40 overflow-y-auto">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleItemClick(item.label, item.value)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default Dropdown;
