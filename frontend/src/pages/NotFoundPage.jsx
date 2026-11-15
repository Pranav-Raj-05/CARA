import { Link, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-surface-container-low rounded-2xl border border-white/10 text-center gap-4 max-w-2xl mx-auto my-12">
      <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary-container">
        <span className="material-symbols-outlined text-[36px]" aria-hidden="true">travel_explore</span>
      </div>
      <span className="text-xs uppercase tracking-widest text-primary font-semibold">Error 404</span>
      <h1 className="text-2xl font-bold text-on-surface">Page not found</h1>
      <p className="text-sm text-on-surface-variant max-w-md break-all">
        There is no screen at <span className="font-mono text-on-surface">{pathname}</span>.
      </p>
      <Link to="/" className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container text-xs font-semibold hover:brightness-110">
        Return to Cockpit Overview
      </Link>
    </div>
  );
}
