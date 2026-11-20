import {
  Banknote, MessageCircle, Plane, RefreshCw, ShieldCheck, SquareParking,
} from 'lucide-react';
import type { Faq, Feature, HeroContent, Review, Stat, Step } from '@/types/content';

export const stats: Stat[] = [
  { value: '400+', label: 'Vetted car parks', icon: SquareParking },
  { value: '30', label: 'UK airports covered', icon: Plane },
  { value: 'Up to 70%', label: 'Saved vs. gate prices', icon: Banknote },
  { value: 'Park Mark®', label: 'Secure-certified partners', icon: ShieldCheck },
];

export const homeHero: HeroContent = {
  pill: '★ Compare 400+ car parks at 30 UK airports',
  title: { before: 'Airport parking,', highlight: 'sorted', after: 'before you fly.' },
  lead: 'Compare secure, great-value parking at every major UK airport. Book in under 60 seconds and save up to 70% versus turning up on the day.',
  ticks: ['Price-match promise', 'Free cancellation', 'Park Mark® secure'],
  illustration: { confirmLabel: 'LHR T5 · Meet & Greet', priceLabel: '8 days from', price: 39.99, saving: '-62%' },
};

export const steps: Step[] = [
  { title: 'Compare', description: 'Enter your airport and dates to see every available car park, ranked by price, distance and rating.' },
  { title: 'Book', description: "Choose your spot and pay securely. You'll get instant confirmation with directions and arrival instructions." },
  { title: 'Fly', description: 'Park up, travel stress-free and drive home the moment you land. Need to change plans? Amend online.' },
];

export const whyFeatures: Feature[] = [
  { title: 'Price-match promise', description: "Found it cheaper elsewhere? We'll match it — no quibbles.", icon: Banknote },
  { title: 'Free cancellation', description: 'Plans change. Cancel up to 24 hours before for a full refund.', icon: RefreshCw },
  { title: 'Vetted & insured', description: 'Every partner is checked for CCTV, fencing and insurance.', icon: ShieldCheck },
  { title: 'Real UK support', description: 'Talk to our friendly team 7 days a week by phone or chat.', icon: MessageCircle },
];

/** Placeholder reviews — replace with verified reviews from the review platform. */
export const reviews: Review[] = [
  {
    initial: 'A', name: 'Customer name', meta: 'Heathrow · Meet & Greet', rating: 5, avatarColor: '#FFBC00',
    quote: 'Customer quote goes here — e.g. how quick the Meet & Greet handover was and how easy it was to find the car on return.',
  },
  {
    initial: 'B', name: 'Customer name', meta: 'Manchester · Park & Ride', rating: 5, avatarColor: '#7DD3FC',
    quote: 'Customer quote goes here — e.g. how much they saved compared with booking at the airport on the day.',
  },
  {
    initial: 'C', name: 'Customer name', meta: 'Gatwick · On-Airport', rating: 5, avatarColor: '#86EFAC',
    quote: 'Customer quote goes here — e.g. how helpful support was when their flight was delayed and plans changed.',
  },
];

export const faqs: Faq[] = [
  {
    question: 'How far in advance should I book?',
    answer: 'The earlier the better — prices rise as car parks fill up, especially during school holidays. Booking 3–4 weeks ahead usually gets the best deals.',
  },
  {
    question: "What's the difference between Meet & Greet and Park & Ride?",
    answer: 'With Meet & Greet, a fully insured driver collects your car at the terminal and returns it when you land. With Park & Ride, you park at a secure off-site car park and take a short shuttle bus to the terminal — usually the cheapest option.',
  },
  {
    question: 'Can I amend or cancel my booking?',
    answer: 'Yes. You can amend your booking online through Manage booking, and cancel free of charge up to 24 hours before your drop-off time for a full refund.',
  },
  {
    question: "Is my car insured while it's parked?",
    answer: "Every operator we list holds appropriate insurance and is checked for CCTV, fencing and security standards. Full cover details are shown on each car park's page before you book.",
  },
  {
    question: 'What happens if my return flight is delayed?',
    answer: "Meet & Greet operators track your flight and adjust automatically. For other car parks, just contact our support team and we'll help sort out any extra time you need.",
  },
  {
    question: 'Do you have EV charging and Blue Badge spaces?',
    answer: 'Many of our partners offer EV charging bays and Blue Badge spaces. Use the filters on the results page to show only car parks with the facilities you need.',
  },
];
