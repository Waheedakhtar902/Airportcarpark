import {
  Baby, BadgePercent, BedDouble, BusFront, CalendarCheck, Coffee, Hotel, ShieldCheck, Sofa, Timer,
  Utensils, Wallet, Wifi, type LucideIcon,
} from 'lucide-react';
import type { Faq, Feature, Step } from '@/types/content';

export interface ComingSoonProduct {
  slug: 'hotels-parking' | 'lounges';
  title: string;
  icon: LucideIcon;
  pill: string;
  heroTitle: { before: string; highlight: string; after: string };
  heroLead: string;
  heroTicks: string[];
  /** Short line for the floating cards in the hero illustration. */
  artCards: { title: string; detail: string }[];
  bannerTitle: string;
  bannerText: string;
  features: Feature[];
  featuresTitle: string;
  steps: Step[];
  faqs: Faq[];
}

export const comingSoonProducts: Record<ComingSoonProduct['slug'], ComingSoonProduct> = {
  'hotels-parking': {
    slug: 'hotels-parking',
    title: 'Hotel + Parking',
    icon: Hotel,
    pill: 'Coming soon',
    heroTitle: { before: 'Hotel + Parking,', highlight: 'stress‑free', after: 'early starts.' },
    heroLead:
      'Stay the night before your flight at a hotel near the airport and leave your car there while you travel. One booking, one price — and a lie-in before take-off.',
    heroTicks: ['Hotel & parking in one booking', 'Airport transfer options', 'Free cancellation'],
    artCards: [
      { title: 'Room + 8 days parking', detail: 'MAN · Airport hotel' },
      { title: 'Breakfast included', detail: 'Check-in from 15:00' },
    ],
    bannerTitle: 'Hotel + Parking is launching soon',
    bannerText:
      'We’re partnering with trusted airport hotels to bring you room-and-parking packages. Leave your e-mail and we’ll tell you the moment it goes live — plus a launch-day discount.',
    featuresTitle: 'What Hotel + Parking will include',
    features: [
      { title: 'One simple booking', description: 'Your room and your parking together, with one confirmation and one payment.', icon: CalendarCheck },
      { title: 'Sleep closer to the airport', description: 'Hotels minutes from the terminal, so early flights don’t mean a 3am alarm.', icon: BedDouble },
      { title: 'Parking for your whole trip', description: 'Park at the hotel the night before and leave your car until you’re back.', icon: ShieldCheck },
      { title: 'Transfers to the terminal', description: 'Shuttle or taxi options from the hotel to departures, shown before you book.', icon: BusFront },
      { title: 'Package savings', description: 'Bundled prices that are usually cheaper than booking room and parking separately.', icon: BadgePercent },
      { title: 'Family-friendly rooms', description: 'Family and accessible rooms, with breakfast options for an easy start.', icon: Baby },
    ],
    steps: [
      { title: 'Choose your hotel', description: 'Pick a hotel near your airport and how many nights you’d like to stay.' },
      { title: 'Add your parking', description: 'Your parking is included for the length of your trip — no separate booking.' },
      { title: 'Check in & fly', description: 'Stay the night, then hop on the transfer to departures. Your car waits at the hotel.' },
    ],
    faqs: [
      { question: 'When will Hotel + Parking be available?', answer: 'We’re finalising partner hotels now and will launch at Manchester Airport first. Join the notify list above and we’ll e-mail you as soon as you can book.' },
      { question: 'Which airports will it cover?', answer: 'Manchester first, followed by other major UK airports. Every hotel will be checked for security, parking and transfer arrangements before it’s listed.' },
      { question: 'Can I park for longer than my hotel stay?', answer: 'Yes. Packages will include parking for your whole trip, not just the nights you stay.' },
      { question: 'Can I book airport parking today?', answer: 'Yes. Meet & Greet, Park & Ride and self-park options at Manchester Airport are bookable now with live prices — use the parking search.' },
    ],
  },

  lounges: {
    slug: 'lounges',
    title: 'Airport Lounges',
    icon: Sofa,
    pill: 'Coming soon',
    heroTitle: { before: 'Airport lounges,', highlight: 'relax', after: 'before you fly.' },
    heroLead:
      'Skip the crowded gate. Pre-book a quiet airport lounge with comfortable seating, food and drinks, Wi-Fi and flight updates — whichever airline you fly with.',
    heroTicks: ['Food & drinks included', 'Fast Wi-Fi & charging', 'Any airline, any class'],
    artCards: [
      { title: 'Lounge · 3 hours', detail: 'MAN T2 · Airside' },
      { title: 'Food & drinks included', detail: 'Wi-Fi · Flight updates' },
    ],
    bannerTitle: 'Lounge booking is launching soon',
    bannerText:
      'We’re adding pre-bookable airport lounges so you can relax before your flight. Leave your e-mail and we’ll let you know as soon as you can book — with an early-bird offer.',
    featuresTitle: 'What lounge booking will include',
    features: [
      { title: 'Complimentary food', description: 'Hot and cold dishes, snacks and breakfast options depending on the lounge.', icon: Utensils },
      { title: 'Drinks included', description: 'Hot drinks, soft drinks and a selection of beers, wines and spirits.', icon: Coffee },
      { title: 'Wi-Fi & charging', description: 'Fast Wi-Fi and plenty of sockets to work or catch up before you board.', icon: Wifi },
      { title: 'Quiet, comfortable space', description: 'Away from the busy terminal, with comfortable seating and flight screens.', icon: Sofa },
      { title: 'Book your time slot', description: 'Reserve an arrival time, usually up to 3 hours before your flight.', icon: Timer },
      { title: 'Great value', description: 'Pre-booking is typically cheaper than paying at the lounge door.', icon: Wallet },
    ],
    steps: [
      { title: 'Choose your lounge', description: 'Pick your airport, terminal and the time you’d like to arrive.' },
      { title: 'Get your e-ticket', description: 'You’ll receive a confirmation to show at the lounge desk with your boarding pass.' },
      { title: 'Relax & fly', description: 'Enjoy food, drinks and Wi-Fi until it’s time to head to your gate.' },
    ],
    faqs: [
      { question: 'When can I book a lounge?', answer: 'Lounge booking is coming soon, starting with Manchester Airport. Join the notify list above to hear first.' },
      { question: 'Do I need a business class ticket?', answer: 'No. Pre-booked lounges are open to any passenger on any airline, as long as you’re flying from that terminal.' },
      { question: 'Can children use the lounges?', answer: 'Most lounges welcome children, often at a reduced price. Each lounge’s policy will be shown before you book.' },
      { question: 'Can I book airport parking today?', answer: 'Yes. Parking at Manchester Airport is bookable now with live prices — use the parking search.' },
    ],
  },
};
