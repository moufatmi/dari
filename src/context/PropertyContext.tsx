import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, FilterOptions } from '../types/Property';
import { propertyService } from '../services/mockService';

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: FilterOptions;
  loading: boolean;
  error: string | null;
  updateFilters: (newFilters: Partial<FilterOptions>) => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updatePropertyStatus: (id: string, status: Property['status']) => Promise<void>;
  getProperty: (id: string) => Property | undefined;
  refreshProperties: () => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const defaultFilters: FilterOptions = {
  city: '',
  priceMin: 0,
  priceMax: 5000000,
  type: 'all',
  propertyType: '',
  minRooms: 0,
  minSurface: 0,
  amenities: []
};

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyService.getAllProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Failed to load properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property => {
    if (property.status !== 'approved') return false;
    if (filters.city && property.city !== filters.city) return false;
    if (property.price < filters.priceMin || property.price > filters.priceMax) return false;
    if (filters.type !== 'all' && property.type !== filters.type) return false;
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
    if (property.rooms < filters.minRooms) return false;
    if (property.surface < filters.minSurface) return false;

    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity =>
        property.features && property.features.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const addProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'status'>) => {
    try {
      setLoading(true);
      const newProperty = await propertyService.addProperty(propertyData);
      setProperties(prev => [...prev, newProperty]);
    } catch (err) {
      setError('Failed to add property');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePropertyStatus = async (id: string, status: Property['status']) => {
    try {
      await propertyService.updatePropertyStatus(id, status);
      setProperties(prev =>
        prev.map(prop => prop.id === id ? { ...prop, status } : prop)
      );
    } catch (err) {
      setError('Failed to update property status');
      throw err;
    }
  };

  const getProperty = (id: string) => {
    return properties.find(prop => prop.id === id);
  };

  const uploadImage = async (file: File) => {
    return await propertyService.uploadImage(file);
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      filters,
      loading,
      error,
      updateFilters,
      addProperty,
      updatePropertyStatus,
      getProperty,
      refreshProperties: fetchProperties,
      uploadImage
    }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}