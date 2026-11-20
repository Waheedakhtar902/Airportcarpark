import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { parkingTypes } from '@/data/parkingTypes';

// Each page is its own chunk, so visitors only download the page they open.
const HomePage = lazy(() => import('@/pages/HomePage'));
const ParkingTypePage = lazy(() => import('@/pages/ParkingTypePage'));
const ParkingResultsPage = lazy(() => import('@/pages/ParkingResultsPage'));
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const page = (node: ReactNode) => <Suspense fallback={null}>{node}</Suspense>;

/** Pages that open with the dark hero, so the header floats transparently over it. */
export interface RouteHandle {
  heroHeader?: boolean;
}
const withHero: RouteHandle = { heroHeader: true };

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: page(<HomePage />), handle: withHero },
      ...parkingTypes.map((t) => ({
        path: `parking/${t.slug}`,
        element: page(<ParkingTypePage key={t.slug} slug={t.slug} />),
        handle: withHero,
      })),
      { path: 'parking/results', element: page(<ParkingResultsPage />) },
      { path: 'hotels-parking', element: page(<ComingSoonPage key="hotels-parking" slug="hotels-parking" />), handle: withHero },
      { path: 'lounges', element: page(<ComingSoonPage key="lounges" slug="lounges" />), handle: withHero },
      { path: '*', element: page(<NotFoundPage />) },
    ],
  },
]);
