import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { mainNav } from '@/data/navigation';
import { ParkingMenu } from './ParkingMenu';
import styles from './Navbar.module.css';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route or hash changes.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <nav className={`container ${styles.nav}`} aria-label="Main">
      <Logo />

      <ul id="main-menu" className={`${styles.links} ${open ? styles.open : ''}`}>
        {mainNav.map((item) =>
          item.menu === 'parkingTypes' ? (
            <ParkingMenu key={item.label} label={item.label} />
          ) : (
            <li key={item.label}>
              <Link to={item.to}>
                {item.label}
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </Link>
            </li>
          ),
        )}
        <li className={styles.mobileOnly}>
          <Link to="/manage-booking">Manage booking</Link>
        </li>
      </ul>

      <div className={styles.actions}>
        <Link to="/manage-booking" className={styles.manage}>Manage booking</Link>
        <ButtonLink to="/sign-in" size="sm" className={styles.signIn}>Sign in</ButtonLink>
        <button
          type="button"
          className={styles.toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
