import { SectionHead } from '@/components/ui/SectionHead';
import { whyFeatures } from '@/data/home';
import { PhoneMockup } from './PhoneMockup';
import styles from './WhyUs.module.css';

export function WhyUs() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <PhoneMockup />
        <div>
          <SectionHead
            eyebrow="Why AirportCarPark"
            title="Peace of mind from your driveway to the departure gate."
            intro="We only list operators who meet our security, insurance and service standards — so you can relax from the moment you leave home."
            align="stack"
          />
          <div className={styles.features}>
            {whyFeatures.map(({ title, description, icon: Icon }) => (
              <div key={title}>
                <span className={styles.icon}><Icon size={24} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
