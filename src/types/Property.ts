export interface Property {
  id: string;
  title: string;
  titleAr?: string;
  price: number;
  currency: 'MAD';
  type: 'rent' | 'sale';
  propertyType: 'apartment' | 'house' | 'villa' | 'studio' | 'office';
  city: string;
  neighborhood: string;
  surface: number; // in m²
  rooms: number;
  bathrooms: number;
  description: string;
  descriptionAr?: string;
  images: string[];
  features: string[];
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FilterOptions {
  city: string;
  priceMin: number;
  priceMax: number;
  type: 'all' | 'rent' | 'sale';
  propertyType: string;
  minRooms: number;
  minSurface: number;
}