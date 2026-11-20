import type { Airport } from '@/types/content';

export const popularAirports: Airport[] = [
  { code: 'LHR', name: 'Heathrow',   slug: 'heathrow',   fromPrice: 6.49, gradient: ['#1E3A8A', '#3B82F6'] },
  { code: 'LGW', name: 'Gatwick',    slug: 'gatwick',    fromPrice: 5.25, gradient: ['#0F766E', '#14B8A6'] },
  { code: 'MAN', name: 'Manchester', slug: 'manchester', fromPrice: 4.99, gradient: ['#7C2D12', '#F97316'] },
  { code: 'STN', name: 'Stansted',   slug: 'stansted',   fromPrice: 4.75, gradient: ['#581C87', '#A855F7'] },
  { code: 'LTN', name: 'Luton',      slug: 'luton',      fromPrice: 4.5,  gradient: ['#9F1239', '#F43F5E'] },
  { code: 'BHX', name: 'Birmingham', slug: 'birmingham', fromPrice: 4.89, gradient: ['#0C4A6E', '#0EA5E9'] },
  { code: 'EDI', name: 'Edinburgh',  slug: 'edinburgh',  fromPrice: 5.1,  gradient: ['#14532D', '#22C55E'] },
  { code: 'BRS', name: 'Bristol',    slug: 'bristol',    fromPrice: 4.6,  gradient: ['#78350F', '#EAB308'] },
];
