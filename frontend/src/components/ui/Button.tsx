import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type Variant = 'amber' | 'navy';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const cx = (variant: Variant, size: Size, className?: string) =>
  [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');

export function Button({
  variant = 'amber', size = 'md', className, children, type = 'button', ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cx(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to, variant = 'amber', size = 'md', className, children,
}: BaseProps & { to: string }) {
  return (
    <Link to={to} className={cx(variant, size, className)}>
      {children}
    </Link>
  );
}
