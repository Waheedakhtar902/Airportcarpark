import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './Newsletter.module.css';

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST to the backend newsletter endpoint.
    setSubscribed(true);
    e.currentTarget.reset();
  };

  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="newsletter-title">
      <div className={styles.card}>
        <span className={styles.bigP} aria-hidden="true">P</span>
        <div>
          <h2 id="newsletter-title" className={styles.title}>Get exclusive parking deals straight to your inbox.</h2>
          <p className={styles.text}>Flash sales, school-holiday offers and member-only discount codes. No spam — unsubscribe anytime.</p>
        </div>
        <div className={styles.formWrap}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" type="email" placeholder="Enter your email address" autoComplete="email" required />
            <Button type="submit" variant="navy" size="lg">Subscribe</Button>
          </form>
          <small className={styles.small} aria-live="polite">
            {subscribed
              ? "Thanks! You're on the list — look out for our next deal."
              : 'By subscribing you agree to our Privacy Policy.'}
          </small>
        </div>
      </div>
    </section>
  );
}
