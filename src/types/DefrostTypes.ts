// Add to existing types
export interface FavoriteItem {
  id: string;
  name: string;
  foodType: FoodType;
  weight: number;
  timestamp: number;
}

export interface DefrostError {
  type: 'weight' | 'foodType' | 'general';
  message: string;
}