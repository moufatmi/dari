import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Eye } from 'lucide-react';
import { Property } from '../../types/Property';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTypeLabel = (type: string) => {
    return type === 'rent' ? 'Location' : 'Vente';
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            property.type === 'rent' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {getTypeLabel(property.type)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-gray-700">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Price */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-amber-600">
              {formatPrice(property.price)}
              {property.type === 'rent' && <span className="text-sm font-normal text-gray-500">/mois</span>}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 text-amber-500" />
          <span className="text-sm">{property.neighborhood}, {property.city}</span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span>{property.rooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="h-4 w-4" />
            <span>{property.surface}m²</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/property/${property.id}`}
          className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
        >
          <div className="flex items-center justify-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>Voir détails</span>
          </div>
        </Link>
      </div>
    </div>
  );
}