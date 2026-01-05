import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Plus, Settings, Building, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b-2 border-amber-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-amber-600" />
            <div className="text-xl font-bold text-gray-900">
              <span className="text-amber-600">Dar</span>
              <span className="text-blue-900">Home</span>
            </div>
            <span className="text-sm text-gray-500 hidden sm:block">المغرب</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                ? 'text-amber-600 bg-amber-50'
                : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                }`}
            >
              <Home className="h-4 w-4" />
              <span>Accueil</span>
            </Link>
            <Link
              to="/listings"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/listings')
                ? 'text-amber-600 bg-amber-50'
                : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                }`}
            >
              <Search className="h-4 w-4" />
              <span>Annonces</span>
            </Link>
            <Link
              to="/submit-property"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/submit-property')
                ? 'text-amber-600 bg-amber-50'
                : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                }`}
            >
              <Plus className="h-4 w-4" />
              <span>Publier</span>
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/admin')
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}

            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-amber-600 font-medium text-sm"
                >
                  Connexion
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors shadow-sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span>S'inscrire</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-amber-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}