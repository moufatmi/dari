import { Property } from '../types/Property';
import { User } from '../types/User';

export interface PropertyService {
    getAllProperties(): Promise<Property[]>;
    getPropertyById(id: string): Promise<Property | undefined>;
    addProperty(property: Omit<Property, 'id' | 'createdAt' | 'status'>): Promise<Property>;
    updatePropertyStatus(id: string, status: Property['status']): Promise<void>;
    updateProperty(id: string, property: Partial<Property>): Promise<Property>;
    deleteProperty(id: string): Promise<void>;
    uploadImage(file: File): Promise<string>;
}

export interface AuthService {
    login(email: string, password: string): Promise<User>;
    signup(email: string, password: string, name: string): Promise<User>;
    logout: () => Promise<void>;
    getCurrentUser: () => Promise<User | null>;
    toggleFavorite: (userId: string, propertyId: string) => Promise<string[]>;
}
