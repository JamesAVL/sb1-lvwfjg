import { useState, useEffect } from 'react';
import { FavoriteItem, FoodType } from '../types/DefrostTypes';
import { FOOD_CHARACTERISTICS } from '../data/foodCharacteristics';

const STORAGE_KEY = 'defrost-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (foodType: FoodType, weight: number) => {
    const foodName = FOOD_CHARACTERISTICS[foodType]?.name;
    if (!foodName) return;

    const newFavorite: FavoriteItem = {
      id: `${Date.now()}`,
      name: `${foodName} (${weight}g)`,
      foodType,
      weight,
      timestamp: Date.now()
    };

    setFavorites(prev => [newFavorite, ...prev].slice(0, 10)); // Keep last 10
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites
  };
}