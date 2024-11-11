import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface WeightInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function WeightInput({ value, onChange }: WeightInputProps) {
  return (
    <div className="space-y-2">
      <Label>Weight (grams)</Label>
      <Input 
        type="number" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter weight in grams"
        min="0"
        step="50"
        className="no-spinner"
      />
    </div>
  );
}