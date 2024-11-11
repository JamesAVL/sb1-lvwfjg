import React from 'react';
import { FoodType } from '../types/DefrostTypes';
import { SelectField } from './SelectField';
import { InputField } from './InputField';

interface DefrostFormProps {
  foodType: FoodType;
  weight: string;
  onFoodTypeChange: (value: FoodType) => void;
  onWeightChange: (value: string) => void;
  onCalculate: () => void;
}

export function DefrostForm({ 
  foodType, 
  weight, 
  onFoodTypeChange, 
  onWeightChange, 
  onCalculate 
}: DefrostFormProps) {
  const foodTypes: FoodType[] = ['Poultry', 'Meat', 'Fish', 'Vegetables'];

  return (
    <div className="space-y-4">
      <SelectField
        label="Select Food Type:"
        value={foodType}
        onChange={(e) => onFoodTypeChange(e.target.value as FoodType)}
        options={foodTypes}
      />

      <InputField
        label="Enter Weight (grams):"
        type="number"
        value={weight}
        onChange={(e) => onWeightChange(e.target.value)}
        placeholder="Enter weight in grams"
      />

      <button
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={onCalculate}
      >
        Calculate Defrost Time
      </button>
    </div>
  );
}