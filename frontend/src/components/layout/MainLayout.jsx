import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import PrototypeNotice from './PrototypeNotice';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery('(min-width: 1024px)'); // Tailwind `lg`: sidebar is permanently visible
  const menuButtonRef = useRef(null);
  const drawerOpen = menuOpen && !isDesktop;

  const closeMenu = () => setMenuOpen(false);

  // Return focus to the hamburger once the drawer has actually closed. Doing it here (after the re-render)
  // matters: while the drawer is open the content behind it is `inert`, and inert elements cannot take focus.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !drawerOpen) menuButtonRef.current?.focus();
    wasOpen.current = drawerOpen;
  }, [drawerOpen]);

  // Route change closes the drawer and scrolls to top.
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [pathname]);

  // While the mobile drawer is open: Escape closes it, the page behind does not scroll, and focus moves into it.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.querySelector('#app-sidebar nav a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  // Growing the window to desktop width while the drawer is open resets it.
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  return (
    <div className="min-h-screen bg-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary-container focus:text-on-primary-container focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      {/* Closed off-canvas drawer is removed from the tab order / accessibility tree (`inert`). */}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} inert={!isDesktop && !menuOpen} />
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={closeMenu} aria-hidden="true" />
      )}
      {/* While the drawer is open the content behind it is inert, so keyboard focus cannot wander into it. */}
      <div className="lg:pl-72 flex flex-col min-h-screen" inert={drawerOpen ? '' : undefined}>
        <Topbar onMenu={() => setMenuOpen(true)} menuOpen={drawerOpen} menuButtonRef={menuButtonRef} />
        <main id="main-content" tabIndex={-1} className="w-full pt-16 flex-1 bg-surface px-space-md sm:px-space-lg py-space-lg overflow-x-hidden focus:outline-none">
          <Outlet />
          <PrototypeNotice />
        </main>
      </div>
    </div>
  );
}
