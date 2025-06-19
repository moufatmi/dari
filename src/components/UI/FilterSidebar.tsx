import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { moroccanCities } from '../../data/mockProperties';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const { filters, updateFilters } = useProperties();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA').format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl lg:relative lg:w-full lg:shadow-none">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-5 w-5 text-amber-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <select
                value={filters.city}
                onChange={(e) => updateFilters({ city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Toutes les villes</option>
                {moroccanCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'annonce
              </label>
              <select
                value={filters.type}
                onChange={(e) => updateFilters({ type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">Tous</option>
                <option value="rent">Location</option>
                <option value="sale">Vente</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de bien
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => updateFilters({ propertyType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Tous les types</option>
                <option value="apartment">Appartement</option>
                <option value="house">Maison</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="office">Bureau</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (MAD)
              </label>
              <div className="space-y-3">
                <div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={filters.priceMax}
                    onChange={(e) => updateFilters({ priceMax: parseInt(e.target.value) })}
                    className="w-full accent-amber-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 MAD</span>
                    <span className="font-medium text-amber-600">
                      {formatPrice(filters.priceMax)} MAD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de chambres minimum
              </label>
              <select
                value={filters.minRooms}
                onChange={(e) => updateFilters({ minRooms: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="0">Indifférent</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Surface */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface minimum (m²)
              </label>
              <input
                type="number"
                value={filters.minSurface}
                onChange={(e) => updateFilters({ minSurface: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Ex: 50"
              />
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => updateFilters({
                city: '',
                priceMin: 0,
                priceMax: 5000000,
                type: 'all',
                propertyType: '',
                minRooms: 0,
                minSurface: 0
              })}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}