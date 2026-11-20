import type { LucideIcon } from 'lucide-react';

export interface Airport {
  code: string;
  name: string;
  slug: string;
  fromPrice: number;
  gradient: [string, string];
}

export interface HeroContent {
  pill: string;
  /** Title is rendered as: before <amber>highlight</amber> after */
  title: { before: string; highlight: string; after: string };
  lead: string;
  ticks: string[];
  /** Content for the default car-park illustration. Not needed when the hero is given custom `art`. */
  illustration?: HeroIllustrationContent;
}

export interface HeroIllustrationContent {
  confirmLabel: string;
  priceLabel: string;
  price: number;
  saving: string;
}

export interface ComparisonPoints {
  distance: string;
  transfer: string;
  keys: string;
  bestFor: string;
  accessibility: string;
}

export interface ParkingType {
  slug: string;
  title: string;
  icon: LucideIcon;
  featured?: boolean;
  fromPrice: number;
  /** Multiplier on each airport's base price for the airport price list. */
  priceFactor: number;
  /** One line for the navigation dropdown. */
  menuDescription: string;
  /** Short paragraph for the home page card. */
  cardDescription: string;
  cardFeatures: string[];
  hero: HeroContent;
  stats: Stat[];
  overview: { title: string; paragraphs: string[]; included: string[] };
  bestFor: string[];
  goodToKnow: string[];
  benefits: Feature[];
  steps: Step[];
  compare: ComparisonPoints;
  faqs: Faq[];
}

export interface Step {
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Review {
  initial: string;
  name: string;
  meta: string;
  quote: string;
  rating: number;
  avatarColor: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  to: string;
  /** Renders this item as a dropdown instead of a plain link. */
  menu?: 'parkingTypes';
  /** Small tag shown next to the link, e.g. "Soon". */
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
