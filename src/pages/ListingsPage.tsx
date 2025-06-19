import React, { useState } from 'react';
import { PropertyCard } from '../components/UI/PropertyCard';
import { FilterSidebar } from '../components/UI/FilterSidebar';
import { useProperties } from '../context/PropertyContext';
import { SlidersHorizontal, Grid, List } from 'lucide-react';

export function ListingsPage() {
  const { filteredProperties } = useProperties();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Toutes les Propriétés
          </h1>
          <p className="text-gray-600">
            {filteredProperties.length} propriété{filteredProperties.length !== 1 ? 's' : ''} trouvée{filteredProperties.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <FilterSidebar isOpen={true} onClose={() => {}} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filtres</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-amber-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-amber-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SlidersHorizontal className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune propriété trouvée
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Essayez d'ajuster vos filtres pour voir plus de résultats.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
        />
      </div>
    </div>
  );
}