import { Property } from '../types/Property';
import { User } from '../types/User';
import { PropertyService, AuthService } from './api';
import { supabase } from '../lib/supabaseClient';

export class SupabasePropertyService implements PropertyService {

    async getAllProperties(): Promise<Property[]> {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map DB fields to Frontend fields if necessary (snake_case to camelCase)
        // Supabase returns what's in DB. My schema used specific names.
        // Let's assume schema matches or we map here.
        return data.map(this.mapToProperty);
    }

    async getPropertyById(id: string): Promise<Property | undefined> {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return undefined;
        return this.mapToProperty(data);
    }

    async addProperty(propertyData: Omit<Property, 'id' | 'createdAt' | 'status'>): Promise<Property> {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) throw new Error('User not authenticated');

        const dbPayload = {
            title: propertyData.title,
            title_ar: propertyData.titleAr,
            description: propertyData.description,
            description_ar: propertyData.descriptionAr,
            price: propertyData.price,
            currency: propertyData.currency,
            type: propertyData.type,
            property_type: propertyData.propertyType,
            city: propertyData.city,
            neighborhood: propertyData.neighborhood,
            surface: propertyData.surface,
            rooms: propertyData.rooms,
            bathrooms: propertyData.bathrooms,
            features: propertyData.features,
            images: propertyData.images, // Array of strings
            contact_name: propertyData.contact.name,
            contact_phone: propertyData.contact.phone,
            contact_email: propertyData.contact.email,
            lat: propertyData.coordinates.lat,
            lng: propertyData.coordinates.lng,
            status: 'pending',
            user_id: userData.user.id
        };

        const { data, error } = await supabase
            .from('properties')
            .insert(dbPayload)
            .select()
            .single();

        if (error) throw error;
        return this.mapToProperty(data);
    }

    async updatePropertyStatus(id: string, status: Property['status']): Promise<void> {
        const { error } = await supabase
            .from('properties')
            .update({ status })
            .eq('id', id);

        if (error) throw error;
    }

    async updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
        // Need to map partial frontend update to partial backend update
        // For now, doing simple fields
        const { data, error } = await supabase
            .from('properties')
            .update(updates) // This might need mapping equivalent to addProperty
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return this.mapToProperty(data);
    }

    async deleteProperty(id: string): Promise<void> {
        const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }

    async uploadImage(file: File): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('property-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }

    private mapToProperty(data: any): Property {
        return {
            id: data.id,
            title: data.title,
            titleAr: data.title_ar,
            price: data.price,
            currency: data.currency,
            type: data.type,
            propertyType: data.property_type,
            city: data.city,
            neighborhood: data.neighborhood,
            surface: data.surface,
            rooms: data.rooms,
            bathrooms: data.bathrooms,
            description: data.description,
            descriptionAr: data.description_ar,
            images: data.images || [],
            features: data.features || [],
            contact: {
                name: data.contact_name,
                phone: data.contact_phone,
                email: data.contact_email
            },
            coordinates: {
                lat: data.lat,
                lng: data.lng
            },
            createdAt: data.created_at,
            status: data.status
        };
    }
}

export class SupabaseAuthService implements AuthService {
    async login(email: string, password: string): Promise<User> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        if (!data.user) throw new Error('No user returned');

        return this.fetchUserProfile(data.user.id, data.user.email!);
    }

    async signup(email: string, password: string, name: string): Promise<User> {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name, // This will be used by the Trigger to populate profiles table
                }
            }
        });

        if (error) throw error;
        if (!data.user) throw new Error('No user returned');

        // Return a temporary user object since the profile might take a ms to trigger
        return {
            id: data.user.id,
            email: email,
            name: name,
            role: 'user',
            favorites: [],
            createdAt: new Date().toISOString()
        };
    }

    async logout(): Promise<void> {
        await supabase.auth.signOut();
    }

    async getCurrentUser(): Promise<User | null> {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return null;

        return this.fetchUserProfile(session.user.id, session.user.email!);
    }

    async toggleFavorite(userId: string, propertyId: string): Promise<string[]> {
        // 1. Get current favorites
        const { data: profile, error: getError } = await supabase
            .from('profiles')
            .select('favorites')
            .eq('id', userId)
            .single();

        if (getError) throw getError;

        let favorites: string[] = profile.favorites || [];
        if (favorites.includes(propertyId)) {
            favorites = favorites.filter(id => id !== propertyId);
        } else {
            favorites = [...favorites, propertyId];
        }

        // 2. Update favorites
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ favorites })
            .eq('id', userId);

        if (updateError) throw updateError;

        return favorites;
    }

    private async fetchUserProfile(uid: string, email: string): Promise<User> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', uid)
            .single();

        if (error) {
            // If profile doesn't exist yet (rare race condition or trigger fail), return basic info
            return {
                id: uid,
                email: email,
                name: 'User',
                role: 'user',
                favorites: [],
                createdAt: new Date().toISOString()
            };
        }

        return {
            id: data.id,
            email: data.email || email,
            name: data.name,
            role: data.role as 'admin' | 'user',
            favorites: data.favorites || [],
            avatar: data.avatar_url,
            createdAt: data.created_at
        };
    }
}

export const supabasePropertyService = new SupabasePropertyService();
export const supabaseAuthService = new SupabaseAuthService();
