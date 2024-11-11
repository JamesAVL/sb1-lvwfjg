import { useState, useCallback } from 'react';
import { calculateDefrostSettings } from '../../lib/calculations';
import type { FoodType } from '../../types';

export function useDefrostCalculator() {
  const [foodType, setFoodType] = useState<FoodType | ''>('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCalculation = useCallback((type: FoodType | '', weightValue: string) => {
    try {
      setError('');
      
      if (!type) {
        setError('Please select a food type');
        setResult(null);
        return;
      }

      const weightNum = Number(weightValue);
      if (!weightValue || isNaN(weightNum) || weightNum <= 0) {
        setError('Please enter a valid weight greater than 0g');
        setResult(null);
        return;
      }

      const calculatedResult = calculateDefrostSettings(weightNum, type);
      if (!calculatedResult) {
        setError('Unable to calculate settings. Please check your inputs.');
        setResult(null);
        return;
      }

      setResult(calculatedResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setError('An unexpected error occurred. Please try again.');
      setResult(null);
    }
  }, []);

  const handleFoodTypeChange = useCallback((value: FoodType) => {
    setFoodType(value);
    if (weight) handleCalculation(value, weight);
  }, [weight, handleCalculation]);

  const handleWeightChange = useCallback((value: string) => {
    const sanitizedValue = value.replace(/[^\d.]/g, '');
    const parts = sanitizedValue.split('.');
    const cleanValue = parts[0] + (parts.length > 1 ? '.' + parts[1] : '');
    
    setWeight(cleanValue);
    if (foodType) handleCalculation(foodType, cleanValue);
  }, [foodType, handleCalculation]);

  return {
    foodType,
    weight,
    result,
    error,
    handleFoodTypeChange,
    handleWeightChange
  };
}