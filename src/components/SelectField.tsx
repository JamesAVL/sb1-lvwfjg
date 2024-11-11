import React from 'react';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export function SelectField({
  label,
  value,
  onChange,
  options
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-white rounded-lg p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}