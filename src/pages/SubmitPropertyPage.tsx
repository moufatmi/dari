import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { Upload, MapPin, Camera, Phone, Mail } from 'lucide-react';
import { moroccanCities } from '../data/mockProperties';

export function SubmitPropertyPage() {
  const navigate = useNavigate();
  const { addProperty } = useProperties();
  
  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    price: '',
    type: 'sale' as 'rent' | 'sale',
    propertyType: 'apartment' as 'apartment' | 'house' | 'villa' | 'studio' | 'office',
    city: '',
    neighborhood: '',
    surface: '',
    rooms: '',
    bathrooms: '',
    description: '',
    descriptionAr: '',
    features: [] as string[],
    contact: {
      name: '',
      phone: '',
      email: ''
    },
    coordinates: {
      lat: '',
      lng: ''
    }
  });

  const [availableFeatures] = useState([
    'Climatisation', 'Parking', 'Ascenseur', 'Balcon', 'Terrasse',
    'Piscine', 'Jardin', 'Garage', 'Système de sécurité', 'Concierge',
    'Vue mer', 'Meublé', 'Internet', 'Architecture traditionnelle', 'Patio'
  ]);

  const [imageUrls, setImageUrls] = useState<string[]>(['']);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: { ...prev.contact, [contactField]: value }
      }));
    } else if (name.startsWith('coordinates.')) {
      const coordField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        coordinates: { ...prev.coordinates, [coordField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validImageUrls = imageUrls.filter(url => url.trim() !== '');
    
    if (validImageUrls.length === 0) {
      alert('Veuillez ajouter au moins une image.');
      return;
    }

    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      surface: parseInt(formData.surface),
      rooms: parseInt(formData.rooms),
      bathrooms: parseInt(formData.bathrooms),
      coordinates: {
        lat: parseFloat(formData.coordinates.lat) || 33.5731,
        lng: parseFloat(formData.coordinates.lng) || -7.5898
      },
      images: validImageUrls,
      currency: 'MAD' as const
    };

    addProperty(propertyData);
    alert('Votre propriété a été soumise avec succès ! Elle sera examinée avant publication.');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Publier une Propriété
            </h1>
            <p className="text-gray-600">
              Remplissez le formulaire ci-dessous pour publier votre annonce immobilière
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations Générales</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de l'annonce *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Ex: Appartement moderne à Casablanca"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان بالعربية
                  </label>
                  <input
                    type="text"
                    name="titleAr"
                    value={formData.titleAr}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="شقة عصرية في الدار البيضاء"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix (MAD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="750000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type d'annonce *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="sale">Vente</option>
                    <option value="rent">Location</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de propriété *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                    <option value="office">Bureau</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une ville</option>
                    {moroccanCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quartier/Zone *
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Ex: Maarif, Hay Riad..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface (m²) *
                  </label>
                  <input
                    type="number"
                    name="surface"
                    value={formData.surface}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="95"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de chambres *
                  </label>
                  <input
                    type="number"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de salles de bain *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Description</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description en français *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Décrivez votre propriété en détail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف بالعربية
                  </label>
                  <textarea
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="صف عقارك بالتفصيل..."
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Équipements et Commodités</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableFeatures.map((feature) => (
                  <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Photos</h2>
              
              <div className="space-y-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="https://images.pexels.com/photos/..."
                      />
                    </div>
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrl(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <span>Ajouter une photo</span>
                </button>
                
                <p className="text-sm text-gray-500">
                  Utilisez des URLs d'images valides (ex: Pexels, Unsplash). Au moins une photo est requise.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations de Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="contact.name"
                    value={formData.contact.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Ahmed Bennani"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="+212 6 12 34 56 78"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (optionnel)
                  </label>
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="ahmed.bennani@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Location Coordinates */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Coordonnées GPS (Optionnel)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="coordinates.lat"
                    value={formData.coordinates.lat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="33.5731"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="coordinates.lng"
                    value={formData.coordinates.lng}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="-7.5898"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Si vous ne renseignez pas les coordonnées, la position par défaut sera Casablanca.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Publier l'annonce</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}