import React from 'react';
import { FOOD_CHARACTERISTICS } from '../../data/foodCharacteristics';
import { FoodType } from '../../types/DefrostTypes';
import { FoodTypeIcon } from './FoodTypeIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface FoodSelectorProps {
  value: FoodType | '';
  onChange: (value: FoodType) => void;
}

export function FoodSelector({ value, onChange }: FoodSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Food Type</Label>
      <Select value={value} onValueChange={(v) => onChange(v as FoodType)}>
        <SelectTrigger>
          <SelectValue placeholder="Select food type" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(FOOD_CHARACTERISTICS)
            .sort(([, a], [, b]) => a.name.localeCompare(b.name))
            .map(([key, data]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  <FoodTypeIcon type={key} />
                  <span>{data.name}</span>
                </div>
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  );
}