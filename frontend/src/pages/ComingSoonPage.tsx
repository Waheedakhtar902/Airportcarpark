import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ParkingOptions } from '@/components/home/ParkingOptions';
import { FaqSection } from '@/components/home/FaqSection';
import { Benefits } from '@/components/parking/Benefits';
import { ComingSoonArt } from '@/components/comingsoon/ComingSoonArt';
import { ComingSoonBanner } from '@/components/comingsoon/ComingSoonBanner';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { comingSoonProducts, type ComingSoonProduct } from '@/data/comingSoon';

/** Template for products that aren't bookable yet: /hotels-parking and /lounges. */
export default function ComingSoonPage({ slug }: { slug: ComingSoonProduct['slug'] }) {
  const p = comingSoonProducts[slug];
  const Icon = p.icon;

  useDocumentMeta(`${p.title} — coming soon | AirportCarPark.co.uk`, p.heroLead);

  return (
    <>
      <Hero
        pill={p.pill}
        pillTone="soon"
        title={p.heroTitle}
        lead={p.heroLead}
        ticks={p.heroTicks}
        art={<ComingSoonArt icon={p.icon} title={p.title} cards={p.artCards} />}
      />
      <ComingSoonBanner title={p.bannerTitle} text={p.bannerText} icon={<Icon size={28} />} />
      <Benefits
        eyebrow="What to expect"
        title={p.featuresTitle}
        intro={`We’re building ${p.title} to the same standard as our parking: vetted partners, clear prices and free cancellation.`}
        items={p.features}
      />
      <HowItWorks eyebrow="How it will work" title={`Booking ${p.title} in three steps`} steps={p.steps} />
      <ParkingOptions
        eyebrow="Available now"
        title="Book airport parking today"
        intro="While we get ready to launch, every parking option at Manchester Airport is bookable now with live prices."
      />
      <FaqSection
        faqs={p.faqs}
        title={`${p.title} questions, answered.`}
        intro={`What we can tell you so far about ${p.title}.`}
      />
    </>
  );
}
