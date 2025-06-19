import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { moroccanCities } from '../../data/mockProperties';

interface SearchBarProps {
  onSearch: (city: string, type: 'all' | 'rent' | 'sale') => void;
  className?: string;
}

export function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [type, setType] = useState<'all' | 'rent' | 'sale'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city, type);
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* City Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville / المدينة
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Toutes les villes</option>
              {moroccanCities.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type / النوع
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'all' | 'rent' | 'sale')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">Tous</option>
            <option value="rent">Location</option>
            <option value="sale">Vente</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            <Search className="h-5 w-5" />
            <span>Rechercher</span>
          </button>
        </div>
      </div>
    </form>
  );
}