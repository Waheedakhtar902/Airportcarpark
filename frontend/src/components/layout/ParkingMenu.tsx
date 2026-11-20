import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { parkingTypes } from '@/data/parkingTypes';
import { formatPrice } from '@/data/format';
import styles from './ParkingMenu.module.css';

const HOVER_CLOSE_DELAY = 150;

/** "Parking Types" dropdown: a rectangular two-column panel listing the four parking types. */
export function ParkingMenu({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const panelId = useId();
  const location = useLocation();

  const active = location.pathname.startsWith('/parking/');

  // Close on navigation.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Close on outside click and Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        rootRef.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Hover only applies to mouse users on wide screens; touch and mobile use the button.
  const canHover = () => window.matchMedia('(hover: hover) and (min-width: 901px)').matches;
  const onEnter = () => {
    if (!canHover()) return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    if (!canHover()) return;
    closeTimer.current = window.setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  };

  return (
    <li ref={rootRef} className={styles.root} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        className={`${styles.trigger} ${active ? styles.active : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(e) => {
          // A mouse that hovered has already opened the menu, so its click must not close it again.
          // Keyboard activation (detail === 0) and touch still toggle.
          if (canHover() && e.detail > 0) setOpen(true);
          else setOpen((v) => !v);
        }}
      >
        {label}
        <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
      </button>

      <div id={panelId} className={`${styles.panel} ${open ? styles.open : ''}`}>
        <ul className={styles.grid}>
          {parkingTypes.map(({ slug, title, menuDescription, fromPrice, icon: Icon, featured }) => (
            <li key={slug}>
              <NavLink
                to={`/parking/${slug}`}
                className={({ isActive }) => `${styles.item} ${isActive ? styles.current : ''}`}
              >
                <span className={`${styles.icon} ${featured ? styles.iconFeatured : ''}`}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className={styles.text}>
                  <span className={styles.title}>
                    {title}
                    {featured && <span className={styles.badge}>Popular</span>}
                  </span>
                  <span className={styles.desc}>{menuDescription}</span>
                  <span className={styles.price}>From <strong>{formatPrice(fromPrice)}</strong>/day</span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <span>Not sure which to choose?</span>
          <Link
            to={active ? `${location.pathname}#compare` : '/parking/meet-and-greet#compare'}
            className={styles.compare}
          >
            Compare all parking types <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </li>
  );
}
