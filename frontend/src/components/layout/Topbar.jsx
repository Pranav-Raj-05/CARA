import { useEffect, useRef, useState } from 'react';
import { driverStateLabel, useDriverState } from '../../context/DriverStateContext';
import avatarNeutral from '../../assets/illustrations/avatar-neutral.svg';

// Ported from the Stitch export. Additions: hamburger button + responsive left offset + notification panel.
export default function Topbar({ onMenu = () => {}, menuOpen = false, menuButtonRef }) {
  const [alertCount, setAlertCount] = useState(2);
  const [notifOpen, setNotifOpen] = useState(false);
  const bellRef = useRef(null);
  const panelRef = useRef(null);
  const { driverState } = useDriverState();

  // Notification panel: closes on Escape (focus returns to the bell) or on a click outside it.
  useEffect(() => {
    if (!notifOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') { setNotifOpen(false); bellRef.current?.focus(); }
    };
    const onPointer = (e) => {
      if (!panelRef.current?.contains(e.target) && !bellRef.current?.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [notifOpen]);

  const toggleNotifications = () => {
    setNotifOpen((open) => !open);
    setAlertCount(0); // opening the panel marks the sample badge as read
  };

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl z-40 px-space-md sm:px-space-lg gap-2 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-space-sm sm:gap-space-md min-w-0">
      <button
        ref={menuButtonRef}
        onClick={onMenu}
        aria-label="Open navigation"
        aria-expanded={menuOpen}
        aria-controls="app-sidebar"
        className="lg:hidden p-2 max-sm:p-2.5 -ml-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
      >
        <span className="material-symbols-outlined text-[22px]" aria-hidden="true">menu</span>
      </button>
        <div className="flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container-low shrink-0">
          <span className="material-symbols-outlined text-primary text-[18px]" aria-hidden="true">electric_car</span>
          <span className="text-xs text-on-surface tracking-wider font-semibold uppercase whitespace-nowrap">CARA Demo EV</span>
          <span className="hidden sm:inline text-outline text-xs">•</span>
          <span className="hidden sm:inline text-xs text-on-surface-variant whitespace-nowrap">Dual Motor AWD</span>
        </div>
        <div className="hidden min-[1400px]:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low whitespace-nowrap">
          <span className="h-2 w-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(106,247,186,0.6)]" aria-hidden="true"></span>
          <span className="text-xs text-on-surface font-medium">Digital Twins (Simulated)</span>
        </div>
        <div className="hidden 2xl:flex items-center px-3 py-1 rounded-full bg-surface-container-high/60">
          <span className="text-[11px] text-primary tracking-wider uppercase font-semibold">Demo / Research Sandbox Mode</span>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        <div className="hidden xl:flex items-center gap-space-xs text-on-surface-variant text-xs tracking-wide whitespace-nowrap">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">schedule</span>
          <span>Sample time • Oct 24, 2025 09:42</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low">
          <span className="h-2 w-2 rounded-full bg-primary"></span>
          <span className="text-xs text-on-surface font-medium whitespace-nowrap">Driver State: {driverStateLabel(driverState)}</span>
        </div>
        <div className="relative">
          <button
            ref={bellRef}
            onClick={toggleNotifications}
            aria-label="Notifications"
            aria-expanded={notifOpen}
            aria-controls="notifications-panel"
            className="relative p-2 max-sm:p-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">notifications</span>
            {alertCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary-container text-on-primary-container text-[10px] flex items-center justify-center font-bold">
                {alertCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div
              ref={panelRef}
              id="notifications-panel"
              role="region"
              aria-label="Notifications"
              className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] p-space-md rounded-xl bg-surface-container-low border border-white/10 shadow-2xl text-left"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]" aria-hidden="true">notifications</span>
                <span className="text-sm text-on-surface font-semibold">Notifications</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Not implemented: this prototype has no notification service. The badge was a sample count and is now cleared.
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 pl-2">
          <img
            alt="Demo Driver avatar (illustration)"
            className="w-8 h-8 rounded-full object-cover"
            src={avatarNeutral}
          />
          {/* Decorative only: there is no account menu in this prototype. */}
          <span aria-hidden="true" className="material-symbols-outlined text-on-surface-variant text-[18px]">
            arrow_drop_down
          </span>
        </div>
      </div>
    </header>
  );
}
