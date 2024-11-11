import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { InfoIcon } from 'lucide-react';
import { FOOD_CHARACTERISTICS } from '../data/foodCharacteristics';
import { calculateDefrostSettings, calculateStandingTime } from '../utils/calculations';
import type { FoodType, DefrostSettings } from '../types/DefrostTypes';

const MicrowaveCalculator: React.FC = () => {
  const [foodType, setFoodType] = useState<FoodType | ''>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<DefrostSettings | null>(null);
  const [error, setError] = useState<string>('');

  const foodOptions = useMemo(() => {
    return Object.entries(FOOD_CHARACTERISTICS)
      .sort((a, b) => a[1].name.localeCompare(b[1].name))
      .map(([key, data]) => ({
        value: key,
        label: data.name
      }));
  }, []);

  const validateWeight = (weight: number, type: string): string | null => {
    if (!weight || weight <= 0) {
      return "Please enter a valid weight greater than 0g";
    }

    const characteristics = FOOD_CHARACTERISTICS[type];
    if (!characteristics) return null;

    const maxWeight = Math.max(...characteristics.baseSettings.map(s => s.weight)) * 1.5;
    if (weight > maxWeight) {
      return `Maximum recommended weight for ${characteristics.name} is ${maxWeight}g`;
    }

    return null;
  };

  const handleCalculation = (type: string, weightValue: string) => {
    try {
      setError("");
      
      const weightNum = Number(weightValue);
      const weightError = validateWeight(weightNum, type);
      
      if (weightError) {
        setError(weightError);
        setResult(null);
        return;
      }

      if (!type) {
        setError("Please select a food type");
        setResult(null);
        return;
      }

      const settings = calculateDefrostSettings(weightNum, type, FOOD_CHARACTERISTICS);
      if (!settings) {
        setError("Unable to calculate settings. Please check your inputs.");
        setResult(null);
        return;
      }

      const characteristics = FOOD_CHARACTERISTICS[type];
      const standingTime = calculateStandingTime(weightNum, type);

      setResult({
        ...settings,
        standingTime,
        notes: characteristics.notes,
        safetyNotes: characteristics.safetyNotes
      });
    } catch (error) {
      console.error('Calculation handler error:', error);
      setError("An unexpected error occurred. Please try again.");
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
          <div className="space-y-2">
            <Label>Food Type</Label>
            <Select 
              value={foodType} 
              onValueChange={(value) => {
                setFoodType(value as FoodType);
                if (weight) handleCalculation(value, weight);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select food type" />
              </SelectTrigger>
              <SelectContent>
                {foodOptions.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Weight (grams)</Label>
            <Input 
              type="number" 
              value={weight} 
              onChange={(e) => {
                const newValue = e.target.value;
                setWeight(newValue);
                if (foodType) handleCalculation(foodType, newValue);
              }}
              placeholder="Enter weight in grams"
              min="0"
              step="50"
              className="no-spinner"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium">Defrosting Instructions:</h3>
              {result.power && result.time && (
                <p>1. Set to {result.power}W for {result.time} minutes</p>
              )}
              {result.power2 && result.timeRange && (
                <p>2. Then set to {result.power2}W for {result.timeRange[0]}-{result.timeRange[1]} minutes</p>
              )}
              {!result.power2 && result.timeRange && (
                <p>Defrost at {result.power}W for {result.timeRange[0]}-{result.timeRange[1]} minutes</p>
              )}
              
              <div className="mt-4">
                <p className="text-sm text-slate-600">Standing Time: {result.standingTime} minutes</p>
                <p className="text-sm text-slate-600 mt-2">Note: {result.notes}</p>
                
                <div className="mt-4">
                  <p className="text-sm font-medium">Calculation Confidence:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className={`h-2.5 rounded-full ${
                        result.confidence > 0.8 ? 'bg-green-500' :
                        result.confidence > 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(0, Math.min(100, result.confidence * 100))}%` }}
                    />
                  </div>
                  {result.confidence < 0.8 && (
                    <p className="text-xs text-slate-500 mt-1">
                      Times may need adjustment - monitor food carefully
                    </p>
                  )}
                </div>

                {result.safetyNotes && result.safetyNotes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Safety Notes:</p>
                    <ul className="list-disc list-inside text-sm text-slate-600 mt-1">
                      {result.safetyNotes.map((note: string, index: number) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MicrowaveCalculator;