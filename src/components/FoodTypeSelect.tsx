import React from 'react';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FOOD_CHARACTERISTICS } from '../data/foodCharacteristics';
import { FoodTypeIcon } from './FoodTypeIcon';

interface FoodTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function FoodTypeSelect({ value, onChange }: FoodTypeSelectProps) {
  const foodOptions = React.useMemo(() => {
    return Object.entries(FOOD_CHARACTERISTICS)
      .sort((a, b) => a[1].name.localeCompare(b[1].name))
      .map(([key, data]) => ({
        value: key,
        label: data.name
      }));
  }, []);

  return (
    <div className="space-y-2">
      <Label>Food Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select food type" />
        </SelectTrigger>
        <SelectContent>
          {foodOptions.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              <div className="flex items-center gap-2">
                <FoodTypeIcon type={value} />
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}