import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, BellRing, Check, Car } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';
import styles from './ComingSoonBanner.module.css';

interface ComingSoonBannerProps {
  title: string;
  text: string;
  icon: ReactNode;
}

/**
 * The "Coming soon" highlight. Sits where the search form overlaps the hero on bookable pages,
 * so it's the first thing visitors see after the hero.
 */
export function ComingSoonBanner({ title, text, icon }: ComingSoonBannerProps) {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST the e-mail to the backend launch-notification list. Nothing is stored yet.
    setSubscribed(true);
  };

  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="soon-title">
      <div className={styles.card}>
        <div className={styles.status}>
          <span className={styles.badge}><span className={styles.dot} aria-hidden="true" />Coming soon</span>
          <span className={styles.statusText}>Not bookable yet — launching at Manchester Airport first</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className={styles.icon} aria-hidden="true">{icon}</span>
            <div>
              <h2 id="soon-title" className={styles.title}>{title}</h2>
              <p className={styles.text}>{text}</p>
            </div>
          </div>

          <div className={styles.actions}>
            {subscribed ? (
              <p className={styles.thanks} role="status">
                <Check size={20} strokeWidth={3} aria-hidden="true" /> Thanks! We’ll e-mail you when it launches.
              </p>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="soon-email" className="sr-only">Email address</label>
                <input id="soon-email" type="email" placeholder="Enter your email address" autoComplete="email" required />
                <Button type="submit" variant="navy">
                  <BellRing size={17} aria-hidden="true" /> Notify me
                </Button>
              </form>
            )}
            <div className={styles.alt}>
              <span>Need airport parking now?</span>
              <ButtonLink to="/#search" variant="amber" size="sm">
                <Car size={16} aria-hidden="true" /> Search parking <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
