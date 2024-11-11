import React from 'react';
import { StarIcon, XIcon } from 'lucide-react';
import { FavoriteItem } from '../types/DefrostTypes';

interface FavoritesProps {
  favorites: FavoriteItem[];
  onSelect: (item: FavoriteItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function Favorites({ favorites, onSelect, onRemove, onClear }: FavoritesProps) {
  if (favorites.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold flex items-center">
          <StarIcon className="w-4 h-4 mr-2" /> Favorites
        </h2>
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="group flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
          >
            <button
              onClick={() => onSelect(item)}
              className="hover:text-blue-600"
            >
              {item.name}
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <XIcon className="w-3 h-3 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}