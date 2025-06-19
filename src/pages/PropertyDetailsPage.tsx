import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { 
  MapPin, Bed, Bath, Square, Phone, Mail, 
  ChevronLeft, ChevronRight, Calendar, Tag,
  Car, Wifi, Snowflake, Shield
} from 'lucide-react';

export function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getProperty } = useProperties();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!id) return <Navigate to="/listings" replace />;

  const property = getProperty(id);
  if (!property) return <Navigate to="/listings" replace />;

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* Property Type Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                property.type === 'rent' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-amber-600 text-white'
              }`}>
                {getTypeLabel(property.type)}
              </span>
            </div>
          </div>

          {/* Image Thumbnails */}
          {property.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex 
                      ? 'border-amber-600' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Price */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              {property.titleAr && (
                <p className="text-lg text-gray-600 mb-4 text-right">
                  {property.titleAr}
                </p>
              )}
              
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-amber-600" />
                  <span>{property.neighborhood}, {property.city}</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-amber-600">
                    {formatPrice(property.price)}
                    {property.type === 'rent' && <span className="text-lg font-normal text-gray-500">/mois</span>}
                  </p>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <Bed className="h-5 w-5" />
                    <span className="font-semibold">{property.rooms}</span>
                  </div>
                  <p className="text-sm text-gray-500">Chambres</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <Bath className="h-5 w-5" />
                    <span className="font-semibold">{property.bathrooms}</span>
                  </div>
                  <p className="text-sm text-gray-500">Salles de bain</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <Square className="h-5 w-5" />
                    <span className="font-semibold">{property.surface}</span>
                  </div>
                  <p className="text-sm text-gray-500">m²</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <Tag className="h-5 w-5" />
                    <span className="font-semibold capitalize">{property.propertyType}</span>
                  </div>
                  <p className="text-sm text-gray-500">Type</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {property.description}
              </p>
              {property.descriptionAr && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-right">
                    {property.descriptionAr}
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Équipements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Localisation</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Carte interactive</p>
                  <p className="text-sm">
                    Coordonnées: {property.coordinates.lat}, {property.coordinates.lng}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 mb-1">{property.contact.name}</p>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{property.contact.phone}</span>
                  </div>
                  {property.contact.email && (
                    <div className="flex items-center space-x-2 text-gray-600 mt-2">
                      <Mail className="h-4 w-4" />
                      <span>{property.contact.email}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>Publié le {new Date(property.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <a
                    href={`tel:${property.contact.phone}`}
                    className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 px-4 rounded-lg transition-colors font-medium"
                  >
                    <Phone className="inline h-4 w-4 mr-2" />
                    Appeler
                  </a>
                  {property.contact.email && (
                    <a
                      href={`mailto:${property.contact.email}`}
                      className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-3 px-4 rounded-lg transition-colors font-medium"
                    >
                      <Mail className="inline h-4 w-4 mr-2" />
                      Envoyer un email
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Informations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-medium">#{property.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className={`font-medium ${
                    property.status === 'approved' ? 'text-green-600' : 
                    property.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {property.status === 'approved' ? 'Approuvé' : 
                     property.status === 'pending' ? 'En attente' : 'Rejeté'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}