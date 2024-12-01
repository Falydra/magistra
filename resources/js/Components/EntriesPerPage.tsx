import React from 'react';

interface EntriesPerPageProps {
  entriesPerPage: number;
  onChange: (value: number) => void;
}

const EntriesPerPage: React.FC<EntriesPerPageProps> = ({ entriesPerPage, onChange }) => {
  const options = [5, 10, 15, 20]; 

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="entriesPerPage" className="text-sm font-light text-gray-600">Tampilkan</label>
      <select
        id="entriesPerPage"
        value={entriesPerPage}
        onChange={(e) => onChange(Number(e.target.value))}
        className="p-2 border border-gray-300 hover:bg-primary-fg focus:bg-primary-fg rounded-sm text-sm text-gray-600"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EntriesPerPage;
