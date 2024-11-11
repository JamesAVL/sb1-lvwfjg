import React from 'react';

interface WeightInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function WeightInput({ value, onChange }: WeightInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Weight (grams)
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter weight in grams"
        className="w-full p-2 border rounded-md"
        min="0"
        step="50"
      />
    </div>
  );
}