import { Outlet, useMatches } from 'react-router-dom';
import type { RouteHandle } from '@/app/router';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import styles from './SiteLayout.module.css';

export function SiteLayout() {
  useScrollToHash();
  // Pages with a hero get a header that floats over it; elsewhere it sits on a navy band.
  const overlay = useMatches().some((m) => (m.handle as RouteHandle | undefined)?.heroHeader);

  return (
    <>
      <a href="#main" className={styles.skip}>Skip to content</a>
      <header className={overlay ? styles.headerOverlay : styles.header}>
        <TopBar />
        <Navbar />
      </header>
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
