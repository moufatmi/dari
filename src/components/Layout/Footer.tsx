import React from 'react';
import { Building, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building className="h-8 w-8 text-amber-500" />
              <div className="text-xl font-bold">
                <span className="text-amber-500">Dar</span>
                <span className="text-white">Home</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Votre partenaire de confiance pour l'immobilier au Maroc. 
              شريككم الموثوق في العقارات بالمغرب.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-amber-500" />
                <span>+212 522 123 456</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>contact@darhome.ma</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-amber-500 transition-colors">Accueil</a></li>
              <li><a href="/listings" className="hover:text-amber-500 transition-colors">Annonces</a></li>
              <li><a href="/submit-property" className="hover:text-amber-500 transition-colors">Publier</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">À propos</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Villes</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Casablanca</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Rabat</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Marrakech</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Tanger</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 DarHome. Tous droits réservés. | جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}