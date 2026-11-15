import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../../data/navItems';
import caraLogo from '../../assets/cara-logo-placeholder.svg';
import avatarNeutral from '../../assets/illustrations/avatar-neutral.svg';

// Ported from the Stitch export. Only addition: mobile/tablet off-canvas drawer (open/onClose).
export default function Sidebar({ open = false, onClose = () => {}, inert = false }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside id="app-sidebar" inert={inert ? '' : undefined} className={`fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest/90 backdrop-blur-2xl z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col">
        <div className="h-16 px-space-lg flex items-center gap-space-sm bg-surface-container-low/40">
          {/* Placeholder mark: the original emblem URL in the Stitch export is not publicly loadable. */}
          <img alt="CARA (placeholder logo)" className="h-8 w-auto object-contain" src={caraLogo} />
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-bold text-lg uppercase tracking-wider text-on-surface">CARA</span>
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container-high text-xs text-primary tracking-widest font-semibold">v4.2</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/80">Digital Twin Cockpit</span>
          </div>
        </div>

        <nav aria-label="Primary" className="flex flex-col gap-1 px-space-md py-space-md overflow-y-auto">
          {navItems.map((item) => {
            const isActive = (item.path === "/" && currentPath === "/") || (item.path !== "/" && currentPath.startsWith(item.path));
            return (
              <Link
                onClick={onClose}
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-[0_0_24px_-2px_rgba(0,212,255,0.25)]"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface text-sm"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-space-md">
        <div className="bg-surface-container-low/70 rounded-xl p-space-md flex flex-col gap-space-sm shadow-[0_12px_32px_-4px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-space-sm">
            <img
              alt="Demo Driver avatar (illustration)"
              className="w-8 h-8 rounded-full object-cover"
              src={avatarNeutral}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-on-surface font-medium truncate">Demo Driver</span>
              <span className="text-[10px] text-on-surface-variant truncate">CARA Demo EV (2025)</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Simulated Twins</span>
            <span className="flex items-center gap-1.5 text-[10px] text-tertiary">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary" aria-hidden="true"></span>Simulation • no backend
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
