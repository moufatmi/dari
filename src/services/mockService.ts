import { Property } from '../types/Property';
import { PropertyService } from './api';
import { mockProperties } from '../data/mockProperties';

const DELAY_MS = 800;
const STORAGE_KEY = 'dari_properties';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockPropertyService implements PropertyService {
    private getStoredProperties(): Property[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Initialize with default mock data if empty
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProperties));
            return mockProperties;
        }
        return JSON.parse(stored);
    }

    private saveProperties(properties: Property[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    }

    async getAllProperties(): Promise<Property[]> {
        await delay(DELAY_MS);
        return this.getStoredProperties();
    }

    async getPropertyById(id: string): Promise<Property | undefined> {
        await delay(DELAY_MS);
        const properties = this.getStoredProperties();
        return properties.find(p => p.id === id);
    }

    async addProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'status'>): Promise<Property> {
        await delay(DELAY_MS);
        const properties = this.getStoredProperties();

        const newProperty: Property = {
            ...propertyData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString().split('T')[0],
            status: 'pending' // Default status for new submissions
        };

        this.saveProperties([...properties, newProperty]);
        return newProperty;
    }

    async updatePropertyStatus(id: string, status: Property['status']): Promise<void> {
        await delay(DELAY_MS);
        const properties = this.getStoredProperties();
        const updatedProperties = properties.map(p =>
            p.id === id ? { ...p, status } : p
        );
        this.saveProperties(updatedProperties);
    }

    async updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
        await delay(DELAY_MS);
        const properties = this.getStoredProperties();
        const index = properties.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error('Property not found');
        }

        const updatedProperty = { ...properties[index], ...updates };
        properties[index] = updatedProperty;
        this.saveProperties(properties);
        return updatedProperty;
    }

    async deleteProperty(id: string): Promise<void> {
        await delay(DELAY_MS);
        const properties = this.getStoredProperties();
        const filtered = properties.filter(p => p.id !== id);
        this.saveProperties(filtered);
    }

    async uploadImage(file: File): Promise<string> {
        await delay(DELAY_MS);
        return URL.createObjectURL(file);
    }
}

// ... existing MockPropertyService code

// export const propertyService = new MockPropertyService();

import { AuthService } from './api';
import { User } from '../types/User';

const AUTH_STORAGE_KEY = 'dari_auth_user';

export class MockAuthService implements AuthService {
    async login(email: string, password: string): Promise<User> {
        await delay(DELAY_MS);
        // Mock login logic
        if (password.length < 6) {
            throw new Error('Mot de passe trop court');
        }

        const validEmail = email; // Use the provided email for consistency
        const user: User = {
            id: '1',
            email: validEmail,
            name: validEmail.includes('admin') ? 'Admin User' : 'Test User',
            role: validEmail.includes('admin') ? 'admin' : 'user',
            createdAt: new Date().toISOString(),
            favorites: []
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        return user;
    }

    async signup(email: string, password: string, name: string): Promise<User> {
        await delay(DELAY_MS);
        const user: User = {
            id: Date.now().toString(),
            email,
            name,
            role: 'user', // Default role
            createdAt: new Date().toISOString(),
            favorites: []
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        return user;
    }

    async logout(): Promise<void> {
        await delay(500);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    async getCurrentUser(): Promise<User | null> {
        const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    async toggleFavorite(userId: string, propertyId: string): Promise<string[]> {
        await delay(300);
        const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!userStr) throw new Error('User not found');

        const user = JSON.parse(userStr) as User;
        if (user.id !== userId) throw new Error('Unauthorized');

        const favorites = user.favorites || [];
        const index = favorites.indexOf(propertyId);

        let newFavorites;
        if (index === -1) {
            newFavorites = [...favorites, propertyId];
        } else {
            newFavorites = favorites.filter(id => id !== propertyId);
        }

        const updatedUser = { ...user, favorites: newFavorites };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
        return newFavorites;
    }
}

// export const authService = new MockAuthService();

import { supabasePropertyService, supabaseAuthService } from './supabaseService';

export const propertyService = supabasePropertyService;
export const authService = supabaseAuthService;
