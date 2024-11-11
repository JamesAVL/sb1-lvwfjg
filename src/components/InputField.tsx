import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function InputField({
  label,
  type,
  value,
  onChange,
  placeholder
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-white rounded-lg p-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}