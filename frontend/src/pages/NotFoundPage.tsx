import { ButtonLink } from '@/components/ui/Button';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import styles from './NotFoundPage.module.css';

/** Shown for links to pages that aren't built yet (airport pages, help, etc.). */
export default function NotFoundPage() {
  useDocumentMeta('Page coming soon — AirportCarPark.co.uk', 'This page is on its way.');

  return (
    <section className={`container ${styles.page}`}>
      <p className={styles.eyebrow}>Coming soon</p>
      <h1>This page is on its way.</h1>
      <p className={styles.text}>We're still building this part of the site. In the meantime, compare parking from the home page.</p>
      <ButtonLink to="/">Back to home</ButtonLink>
    </section>
  );
}
