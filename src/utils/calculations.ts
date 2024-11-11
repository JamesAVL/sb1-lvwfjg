import { FoodType, FoodCharacteristic, DefrostSettings, BaseSettingEntry, DefrostResult } from '../types/DefrostTypes';
import { FOOD_CHARACTERISTICS } from '../data/foodCharacteristics';

const findReferencePoints = (weight: number, baseSettings: BaseSettingEntry[]) => {
  // Check for exact match first
  const exactMatch = baseSettings.find(s => s.weight === weight);
  if (exactMatch) {
    return {
      lower: exactMatch,
      upper: exactMatch,
      exact: true
    };
  }

  // Find closest points
  let lower = baseSettings[0];
  let upper = baseSettings[baseSettings.length - 1];

  if (weight <= lower.weight) {
    return { lower, upper: baseSettings[1] || lower, exact: false };
  }

  if (weight >= upper.weight) {
    const maxRatio = 1.5; // Maximum 50% increase from highest reference weight
    if (weight > upper.weight * maxRatio) {
      return {
        lower: upper,
        upper,
        exact: false,
        exceededMax: true
      };
    }
    return { 
      lower: upper,
      upper,
      exact: false 
    };
  }

  for (let i = 0; i < baseSettings.length - 1; i++) {
    if (weight > baseSettings[i].weight && weight <= baseSettings[i + 1].weight) {
      return {
        lower: baseSettings[i],
        upper: baseSettings[i + 1],
        exact: false
      };
    }
  }

  return { lower, upper, exact: false };
};

const calculateScalingFactor = (weightRatio: number, characteristics: FoodCharacteristic): number => {
  if (!weightRatio || !characteristics) return 1;
  
  // Ensure minimum ratio doesn't go below 0.5 and maximum doesn't exceed 1.5
  const safeWeightRatio = Math.max(0.5, Math.min(1.5, weightRatio));
  
  // Calculate surface area and thickness factors
  const surfaceAreaFactor = Math.pow(safeWeightRatio, characteristics.surfaceAreaExponent);
  const thicknessFactor = Math.pow(safeWeightRatio, characteristics.thicknessScale);
  
  // For larger items, increase the influence of thickness
  const isLargeItem = weightRatio > 1;
  const surfaceAreaWeight = isLargeItem ? 0.4 : 0.6;
  const thicknessWeight = isLargeItem ? 0.6 : 0.4;
  
  // Apply density factor with progressive scaling for larger items
  const densityAdjustment = isLargeItem ? 
    Math.pow(characteristics.densityFactor, 1.2) : 
    characteristics.densityFactor;
  
  return Math.max(0.5, Math.min(1.5,
    (surfaceAreaFactor * surfaceAreaWeight + thicknessFactor * thicknessWeight) * 
    densityAdjustment
  ));
};

const calculateConfidence = (
  weight: number, 
  minWeight: number, 
  maxWeight: number, 
  characteristics: FoodCharacteristic
): number => {
  if (weight >= minWeight && weight <= maxWeight) {
    return 1;
  }
  
  const distanceFromRange = Math.min(
    Math.abs(weight - minWeight),
    Math.abs(weight - maxWeight)
  );
  
  const rangeSize = maxWeight - minWeight;
  const toleranceFactor = characteristics.densityFactor > 1 ? 0.4 : 
    characteristics.surfaceAreaExponent > 0.8 ? 0.3 : 0.25;
  
  const tolerance = rangeSize * toleranceFactor;
  return Math.max(0, Math.min(1, 1 - (distanceFromRange / tolerance)));
};

export const calculateStandingTime = (weight: number, type: FoodType): number => {
  const characteristics = FOOD_CHARACTERISTICS[type];
  const baseTime = Math.max(15, Math.min(90, weight / 15));
  const multiplier = type.includes('WHOLE') || weight > 1000 ? 1.5 : 1;
  return Math.round(baseTime * multiplier);
};

export const calculateDefrostSettings = (weight: number, foodType: FoodType): DefrostResult | null => {
  try {
    if (!weight || weight <= 0 || !foodType) return null;

    const characteristics = FOOD_CHARACTERISTICS[foodType];
    if (!characteristics?.baseSettings?.length) return null;

    const { lower, upper, exact, exceededMax } = findReferencePoints(weight, characteristics.baseSettings);

    let settings: DefrostSettings;

    if (exact) {
      settings = {
        ...lower.settings,
        confidence: 1
      };
    } else {
      const weightRatio = weight / lower.weight;
      const scalingFactor = calculateScalingFactor(weightRatio, characteristics);

      // For weights above reference range, adjust scaling
      const timeScalingFactor = exceededMax ? 
        Math.pow(scalingFactor, 1.1) : // Slightly increase time for very large items
        scalingFactor;

      settings = {
        power: lower.settings.power,
        power2: lower.settings.power2,
        time: lower.settings.time ? 
          Math.max(1, Math.round(lower.settings.time * timeScalingFactor)) : 
          undefined,
        timeRange: [
          Math.max(1, Math.round(lower.settings.timeRange[0] * timeScalingFactor)),
          Math.max(1, Math.round(lower.settings.timeRange[1] * timeScalingFactor))
        ],
        confidence: calculateConfidence(
          weight,
          characteristics.baseSettings[0].weight,
          characteristics.baseSettings[characteristics.baseSettings.length - 1].weight,
          characteristics
        )
      };
    }

    return {
      settings,
      standingTime: calculateStandingTime(weight, foodType),
      notes: characteristics.notes,
      safetyNotes: characteristics.safetyNotes
    };
  } catch (error) {
    console.error('Defrost settings calculation error:', error);
    return null;
  }
};