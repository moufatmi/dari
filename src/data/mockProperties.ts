import { Property } from '../types/Property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Appartement Moderne à Casablanca',
    titleAr: 'شقة عصرية في الدار البيضاء',
    price: 850000,
    currency: 'MAD',
    type: 'sale',
    propertyType: 'apartment',
    city: 'Casablanca',
    neighborhood: 'Maarif',
    surface: 95,
    rooms: 3,
    bathrooms: 2,
    description: 'Magnifique appartement moderne situé dans le quartier prisé de Maarif. Proche des commodités et transports.',
    descriptionAr: 'شقة حديثة رائعة تقع في حي المعاريف المرغوب فيه. قريبة من المرافق والمواصلات.',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg',
      'https://images.pexels.com/photos/2406022/pexels-photo-2406022.jpeg'
    ],
    features: ['Climatisation', 'Parking', 'Ascenseur', 'Balcon'],
    contact: {
      name: 'Ahmed Bennani',
      phone: '+212 6 12 34 56 78',
      email: 'ahmed.bennani@email.com'
    },
    coordinates: { lat: 33.5731, lng: -7.5898 },
    createdAt: '2024-01-15',
    status: 'approved'
  },
  {
    id: '2',
    title: 'Villa Luxueuse à Rabat',
    titleAr: 'فيلا فاخرة في الرباط',
    price: 12000,
    currency: 'MAD',
    type: 'rent',
    propertyType: 'villa',
    city: 'Rabat',
    neighborhood: 'Souissi',
    surface: 250,
    rooms: 5,
    bathrooms: 3,
    description: 'Villa spacieuse avec jardin privé dans le quartier résidentiel de Souissi. Idéale pour famille.',
    descriptionAr: 'فيلا واسعة مع حديقة خاصة في الحي السكني السويسي. مثالية للعائلة.',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg'
    ],
    features: ['Piscine', 'Jardin', 'Garage', 'Système de sécurité'],
    contact: {
      name: 'Fatima Alaoui',
      phone: '+212 6 87 65 43 21'
    },
    coordinates: { lat: 34.0209, lng: -6.8416 },
    createdAt: '2024-01-10',
    status: 'approved'
  },
  {
    id: '3',
    title: 'Studio Moderne à Marrakech',
    titleAr: 'استوديو حديث في مراكش',
    price: 450000,
    currency: 'MAD',
    type: 'sale',
    propertyType: 'studio',
    city: 'Marrakech',
    neighborhood: 'Gueliz',
    surface: 45,
    rooms: 1,
    bathrooms: 1,
    description: 'Studio élégant dans le cœur de Gueliz, parfait pour investissement locatif ou résidence.',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ],
    features: ['Meublé', 'Climatisation', 'Internet'],
    contact: {
      name: 'Youssef Tazi',
      phone: '+212 6 55 44 33 22'
    },
    coordinates: { lat: 31.6295, lng: -7.9811 },
    createdAt: '2024-01-20',
    status: 'approved'
  },
  {
    id: '4',
    title: 'Appartement Vue Mer à Tanger',
    titleAr: 'شقة بإطلالة على البحر في طنجة',
    price: 6500,
    currency: 'MAD',
    type: 'rent',
    propertyType: 'apartment',
    city: 'Tanger',
    neighborhood: 'Malabata',
    surface: 120,
    rooms: 4,
    bathrooms: 2,
    description: 'Superbe appartement avec vue panoramique sur la mer. Proche de la plage et du centre-ville.',
    images: [
      'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg'
    ],
    features: ['Vue mer', 'Terrasse', 'Parking', 'Concierge'],
    contact: {
      name: 'Omar El Fassi',
      phone: '+212 6 99 88 77 66'
    },
    coordinates: { lat: 35.7595, lng: -5.8340 },
    createdAt: '2024-01-08',
    status: 'approved'
  },
  {
    id: '5',
    title: 'Maison Traditionnelle à Fès',
    titleAr: 'بيت تقليدي في فاس',
    price: 750000,
    currency: 'MAD',
    type: 'sale',
    propertyType: 'house',
    city: 'Fès',
    neighborhood: 'Médina',
    surface: 180,
    rooms: 6,
    bathrooms: 3,
    description: 'Authentique maison traditionnelle dans la médina de Fès, rénovée avec goût.',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg'
    ],
    features: ['Architecture traditionnelle', 'Patio', 'Proche monuments'],
    contact: {
      name: 'Khalid Benali',
      phone: '+212 6 11 22 33 44'
    },
    coordinates: { lat: 34.0181, lng: -5.0078 },
    createdAt: '2024-01-12',
    status: 'pending'
  },
  {
    id: '6',
    title: 'Bureau Moderne à Oujda',
    titleAr: 'مكتب حديث في وجدة',
    price: 4500,
    currency: 'MAD',
    type: 'rent',
    propertyType: 'office',
    city: 'Oujda',
    neighborhood: 'Centre-ville',
    surface: 85,
    rooms: 3,
    bathrooms: 1,
    description: 'Espace de bureau moderne et fonctionnel au centre d\'Oujda, idéal pour entreprises.',
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ],
    features: ['Climatisation', 'Internet haut débit', 'Parking'],
    contact: {
      name: 'Aicha Benjelloun',
      phone: '+212 6 77 66 55 44'
    },
    coordinates: { lat: 34.6814, lng: -1.9086 },
    createdAt: '2024-01-18',
    status: 'approved'
  }
];

export const moroccanCities = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Oujda', 
  'Kenitra', 'Agadir', 'Tétouan', 'Meknès', 'Safi', 'El Jadida',
  'Nador', 'Settat', 'Khémisset', 'Béni Mellal'
];