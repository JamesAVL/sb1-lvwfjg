import React from 'react';
import { Card } from '../ui/card';
import { FoodTypeSelect } from './FoodTypeSelect';
import { WeightInput } from './WeightInput';
import { DefrostResults } from './DefrostResults';
import { useDefrostCalculator } from './useDefrostCalculator';

export function DefrostCalculator() {
  const {
    foodType,
    weight,
    result,
    error,
    handleFoodTypeChange,
    handleWeightChange
  } = useDefrostCalculator();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Microwave Defrost Calculator</h1>
        
        <div className="space-y-6">
          <FoodTypeSelect 
            value={foodType}
            onChange={handleFoodTypeChange}
          />

          <WeightInput 
            value={weight}
            onChange={handleWeightChange}
            error={error}
          />

          {result && <DefrostResults result={result} />}
        </div>
      </div>
    </Card>
  );
}