import type { FooterColumn, NavLink } from '@/types/content';

export const mainNav: NavLink[] = [
  { label: 'Airports', to: '/#airports' },
  { label: 'Parking Types', to: '/#parking', menu: 'parkingTypes' },
  { label: 'Hotels + Parking', to: '/hotels-parking', badge: 'Soon' },
  { label: 'Lounges', to: '/lounges', badge: 'Soon' },
  { label: 'Deals', to: '/deals' },
  { label: 'Help', to: '/#faqs' },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Airports',
    links: [
      { label: 'Heathrow', to: '/airports/heathrow' },
      { label: 'Gatwick', to: '/airports/gatwick' },
      { label: 'Manchester', to: '/airports/manchester' },
      { label: 'Stansted', to: '/airports/stansted' },
      { label: 'Luton', to: '/airports/luton' },
      { label: 'All airports →', to: '/airports' },
    ],
  },
  {
    title: 'Parking',
    links: [
      { label: 'Meet & Greet', to: '/parking/meet-and-greet' },
      { label: 'Park & Ride', to: '/parking/park-and-ride' },
      { label: 'On-Airport', to: '/parking/on-airport' },
      { label: 'Hotel + Parking', to: '/hotels-parking' },
      { label: 'Valet', to: '/parking/valet-and-extras' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Partner with us', to: '/partners' },
      { label: 'Affiliates', to: '/affiliates' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help centre', to: '/help' },
      { label: 'Manage booking', to: '/manage-booking' },
      { label: 'Contact us', to: '/contact' },
      { label: 'Terms & conditions', to: '/terms' },
      { label: 'Privacy & cookies', to: '/privacy' },
    ],
  },
];

export const paymentMethods: string[] = ['VISA', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'];
