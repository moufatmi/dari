import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/UI/SearchBar';
import { PropertyCard } from '../components/UI/PropertyCard';
import { useProperties } from '../context/PropertyContext';
import { Star, TrendingUp, MapPin, Users } from 'lucide-react';

export function HomePage() {
  const { filteredProperties, updateFilters } = useProperties();
  
  // Get featured properties (first 3 approved properties)
  const featuredProperties = filteredProperties.slice(0, 3);

  const handleSearch = (city: string, type: 'all' | 'rent' | 'sale') => {
    updateFilters({ city, type });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trouvez Votre 
              <span className="text-amber-400"> Maison Idéale</span>
            </h1>
            <p className="text-xl md:text-2xl mb-2 opacity-90">
              اعثر على منزل أحلامك في المغرب
            </p>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
              Découvrez les meilleures propriétés au Maroc avec DarHome, votre partenaire immobilier de confiance.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Propriétés</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Clients Satisfaits</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Villes</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9</h3>
              <p className="text-gray-600">Note Moyenne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Propriétés en Vedette
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection des meilleures propriétés disponibles actuellement
            </p>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune propriété disponible pour le moment.</p>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/listings"
              className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Voir Toutes les Annonces
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à Vendre Votre Propriété ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Publiez votre annonce gratuitement et atteignez des milliers d'acheteurs potentiels
          </p>
          <Link
            to="/submit-property"
            className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Publier une Annonce
          </Link>
        </div>
      </section>
    </div>
  );
}