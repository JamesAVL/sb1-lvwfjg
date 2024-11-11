// Update the calculateScalingFactor function signature
const calculateScalingFactor = (
  weightRatio: number, 
  characteristics: { 
    surfaceAreaExponent: number; 
    densityFactor: number; 
    thicknessScale: number; 
  }
) => {
  if (!weightRatio || !characteristics) return 1;
  
  const surfaceAreaFactor = Math.pow(Math.max(0.1, weightRatio), characteristics.surfaceAreaExponent);
  const thicknessFactor = Math.pow(Math.max(0.1, weightRatio), characteristics.thicknessScale * 0.33);
  
  return Math.max(0.1, surfaceAreaFactor * 0.6 + thicknessFactor * 0.4 * characteristics.densityFactor);
};

// Add weight validation
export const validateWeight = (weight: number, foodType: string): string | null => {
  if (!weight || weight <= 0) {
    return "Please enter a valid weight greater than 0g";
  }

  const characteristics = FOOD_CHARACTERISTICS[foodType];
  if (!characteristics) return null;

  const maxWeight = Math.max(...characteristics.baseSettings.map(s => s.weight)) * 1.5;
  if (weight > maxWeight) {
    return `Maximum recommended weight for ${characteristics.name} is ${maxWeight}g`;
  }

  return null;
};