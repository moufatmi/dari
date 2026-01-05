import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types/User';
import { authService } from '../services/mockService';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    toggleFavorite: (propertyId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const user = await authService.getCurrentUser();
            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: !!user,
                isLoading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }));
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            const user = await authService.login(email, password);
            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: true,
                isLoading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Une erreur est survenue'
            }));
            throw error;
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            const user = await authService.signup(email, password, name);
            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: true,
                isLoading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Une erreur est survenue'
            }));
            throw error;
        }
    };

    const logout = async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));
            await authService.logout();
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            });
        } catch (error) {
            console.error('Logout error:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const toggleFavorite = async (propertyId: string) => {
        if (!state.user) return;
        try {
            const newFavorites = await authService.toggleFavorite(state.user.id, propertyId);
            setState(prev => prev.user ? ({
                ...prev,
                user: { ...prev.user, favorites: newFavorites }
            }) : prev);
        } catch (err) {
            console.error('Failed to toggle favorite', err);
            // Optional: Add toast notification here
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, signup, logout, toggleFavorite }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
