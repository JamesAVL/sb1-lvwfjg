import React from 'react';
import { 
  Beef, 
  Drumstick, 
  Fish, 
  Carrot, 
  Apple, 
  Cookie, 
  Croissant,
  CircleDot
} from 'lucide-react';

const iconMap = {
  WHOLE_MEAT: Beef,
  DICED_MEAT: Beef,
  MINCED_MEAT: Beef,
  POULTRY_PORTIONS: Drumstick,
  DUCK: Drumstick,
  GOOSE: Drumstick,
  FISH_FILLET: Fish,
  WHOLE_FISH: Fish,
  VEGETABLES: Carrot,
  FRUIT: Apple,
  BUTTER: Cookie,
  BREAD: Croissant,
  DRY_CAKE: Cookie,
  MOIST_CAKE: Cookie
};

interface FoodTypeIconProps {
  type: string;
  className?: string;
}

export function FoodTypeIcon({ type, className = "w-5 h-5" }: FoodTypeIconProps) {
  const Icon = iconMap[type as keyof typeof iconMap] || CircleDot;
  return <Icon className={className} />;
}