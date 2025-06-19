import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { Property } from '../types/Property';
import { 
  Eye, Check, X, Clock, MapPin, Bed, Bath, Square,
  Search, Filter, ChevronDown 
} from 'lucide-react';

export function AdminPage() {
  const { properties, updatePropertyStatus } = useProperties();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Property['status']) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: properties.length,
    pending: properties.filter(p => p.status === 'pending').length,
    approved: properties.filter(p => p.status === 'approved').length,
    rejected: properties.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de Bord Admin
          </h1>
          <p className="text-gray-600">
            Gérez toutes les annonces immobilières
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approuvées</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejetées</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par titre, ville ou quartier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="approved">Approuvées</option>
                <option value="rejected">Rejetées</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredProperties.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <div key={property.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      {/* Property Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Property Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {property.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{property.neighborhood}, {property.city}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                              {getStatusLabel(property.status)}
                            </span>
                          </div>
                        </div>

                        {/* Property Info */}
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                          <span className="font-semibold text-amber-600 text-lg">
                            {formatPrice(property.price)}
                            {property.type === 'rent' && <span className="text-sm font-normal">/mois</span>}
                          </span>
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

                        {/* Contact & Date */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div>
                            <span className="font-medium">{property.contact.name}</span>
                            <span className="mx-2">•</span>
                            <span>{property.contact.phone}</span>
                          </div>
                          <span>Publié le {new Date(property.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      {property.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updatePropertyStatus(property.id, 'approved')}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                          >
                            <Check className="h-3 w-3" />
                            <span>Approuver</span>
                          </button>
                          <button
                            onClick={() => updatePropertyStatus(property.id, 'rejected')}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                          >
                            <X className="h-3 w-3" />
                            <span>Rejeter</span>
                          </button>
                        </>
                      )}
                      {property.status === 'approved' && (
                        <button
                          onClick={() => updatePropertyStatus(property.id, 'rejected')}
                          className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                        >
                          <X className="h-3 w-3" />
                          <span>Rejeter</span>
                        </button>
                      )}
                      {property.status === 'rejected' && (
                        <button
                          onClick={() => updatePropertyStatus(property.id, 'approved')}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                        >
                          <Check className="h-3 w-3" />
                          <span>Approuver</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune propriété trouvée
              </h3>
              <p className="text-gray-500">
                Ajustez vos filtres ou attendez de nouvelles soumissions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}