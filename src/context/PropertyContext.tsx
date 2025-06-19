import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property, FilterOptions } from '../types/Property';
import { mockProperties } from '../data/mockProperties';

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: FilterOptions;
  updateFilters: (newFilters: Partial<FilterOptions>) => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'status'>) => void;
  updatePropertyStatus: (id: string, status: Property['status']) => void;
  getProperty: (id: string) => Property | undefined;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const defaultFilters: FilterOptions = {
  city: '',
  priceMin: 0,
  priceMax: 5000000,
  type: 'all',
  propertyType: '',
  minRooms: 0,
  minSurface: 0
};

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  const filteredProperties = properties.filter(property => {
    if (property.status !== 'approved') return false;
    if (filters.city && property.city !== filters.city) return false;
    if (property.price < filters.priceMin || property.price > filters.priceMax) return false;
    if (filters.type !== 'all' && property.type !== filters.type) return false;
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
    if (property.rooms < filters.minRooms) return false;
    if (property.surface < filters.minSurface) return false;
    return true;
  });

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt' | 'status'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updatePropertyStatus = (id: string, status: Property['status']) => {
    setProperties(prev => 
      prev.map(prop => prop.id === id ? { ...prop, status } : prop)
    );
  };

  const getProperty = (id: string) => {
    return properties.find(prop => prop.id === id);
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      filters,
      updateFilters,
      addProperty,
      updatePropertyStatus,
      getProperty
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