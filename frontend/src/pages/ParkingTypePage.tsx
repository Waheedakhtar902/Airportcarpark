import { Hero } from '@/components/home/Hero';
import { SearchCard } from '@/components/home/SearchCard';
import { Stats } from '@/components/home/Stats';
import { PopularAirports } from '@/components/home/PopularAirports';
import { ParkingOptions } from '@/components/home/ParkingOptions';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Reviews } from '@/components/home/Reviews';
import { FaqSection } from '@/components/home/FaqSection';
import { Newsletter } from '@/components/home/Newsletter';
import { TypeOverview } from '@/components/parking/TypeOverview';
import { Benefits } from '@/components/parking/Benefits';
import { ComparisonTable } from '@/components/parking/ComparisonTable';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { getParkingType } from '@/data/parkingTypes';
import { formatPrice } from '@/data/format';
import NotFoundPage from './NotFoundPage';

/** One template for every parking type: /parking/park-and-ride, /parking/meet-and-greet, … */
export default function ParkingTypePage({ slug }: { slug: string }) {
  const type = getParkingType(slug);

  useDocumentMeta(
    type ? `${type.title} Airport Parking — from ${formatPrice(type.fromPrice)}/day | AirportCarPark.co.uk` : '',
    type?.hero.lead ?? '',
  );

  if (!type) return <NotFoundPage />;

  return (
    <>
      <Hero {...type.hero} />
      <SearchCard parkingType={type.slug} />
      <Stats items={type.stats} />
      <TypeOverview
        title={type.title}
        overview={type.overview}
        bestFor={type.bestFor}
        goodToKnow={type.goodToKnow}
        fromPrice={type.fromPrice}
      />
      <Benefits title={`Why travellers choose ${type.title}`} items={type.benefits} />
      <HowItWorks eyebrow="Step by step" title={`How ${type.title} works`} steps={type.steps} />
      <ComparisonTable current={type.slug} />
      <PopularAirports
        eyebrow={`${type.title} by airport`}
        title={`${type.title} at UK airports`}
        intro={`Typical ${type.title} prices per day from trusted operators. Tap an airport to compare every car park.`}
        priceFactor={type.priceFactor}
      />
      <Reviews />
      <ParkingOptions
        eyebrow="Other options"
        title="Explore other parking types"
        intro="Different trip, different needs. See how the other options compare."
        exclude={type.slug}
      />
      <FaqSection
        faqs={type.faqs}
        title={`${type.title} questions, answered.`}
        intro={`Everything you need to know before booking ${type.title} parking.`}
      />
      <Newsletter />
    </>
  );
}
