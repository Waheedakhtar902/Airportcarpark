import { Hero } from '@/components/home/Hero';
import { SearchCard } from '@/components/home/SearchCard';
import { Stats } from '@/components/home/Stats';
import { PopularAirports } from '@/components/home/PopularAirports';
import { ParkingOptions } from '@/components/home/ParkingOptions';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyUs } from '@/components/home/WhyUs';
import { Reviews } from '@/components/home/Reviews';
import { FaqSection } from '@/components/home/FaqSection';
import { Newsletter } from '@/components/home/Newsletter';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { faqs, homeHero, stats, steps } from '@/data/home';

export default function HomePage() {
  useDocumentMeta(
    'AirportCarPark.co.uk — Airport parking, sorted before you fly',
    'Compare secure, great-value parking at every major UK airport. Book in under 60 seconds and save up to 70% versus turning up on the day.',
  );

  return (
    <>
      <Hero {...homeHero} />
      <SearchCard />
      <Stats items={stats} />
      <PopularAirports />
      <ParkingOptions />
      <HowItWorks steps={steps} />
      <WhyUs />
      <Reviews />
      <FaqSection faqs={faqs} />
      <Newsletter />
    </>
  );
}
