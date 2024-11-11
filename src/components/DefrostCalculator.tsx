import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { FoodTypeSelect } from './FoodTypeSelect';
import { WeightInput } from './WeightInput';
import { DefrostInstructions } from './DefrostInstructions';
import { Alert, AlertDescription } from './ui/alert';
import { InfoIcon } from 'lucide-react';
import { calculateDefrostSettings } from '../utils/calculations';
import type { FoodType } from '../types/DefrostTypes';

export function DefrostCalculator() {
  const [foodType, setFoodType] = useState<FoodType | ''>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof calculateDefrostSettings>>(null);
  const [error, setError] = useState<string>('');

  const handleCalculation = (type: FoodType | '', weightValue: string) => {
    try {
      setError('');
      
      const weightNum = Number(weightValue);
      if (!weightValue || isNaN(weightNum) || weightNum <= 0) {
        setError('Please enter a valid weight greater than 0g');
        setResult(null);
        return;
      }

      if (!type) {
        setError('Please select a food type');
        setResult(null);
        return;
      }

      const calculatedResult = calculateDefrostSettings(weightNum, type as FoodType);
      if (!calculatedResult) {
        setError('Unable to calculate settings. Please check your inputs.');
        setResult(null);
        return;
      }

      setResult(calculatedResult);
    } catch (error) {
      console.error('Calculation handler error:', error);
      setError('An unexpected error occurred. Please try again.');
      setResult(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Microwave Defrosting Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FoodTypeSelect 
            value={foodType} 
            onChange={(value) => {
              setFoodType(value as FoodType);
              if (weight) handleCalculation(value as FoodType, weight);
            }}
          />

          <WeightInput 
            value={weight} 
            onChange={(value) => {
              setWeight(value);
              if (foodType) handleCalculation(foodType, value);
            }}
          />

          {error && (
            <Alert variant="destructive">
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && <DefrostInstructions result={result} />}
        </div>
      </CardContent>
    </Card>
  );
}