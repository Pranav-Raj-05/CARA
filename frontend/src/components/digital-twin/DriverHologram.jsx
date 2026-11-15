import driverHologram from '../../assets/illustrations/driver-hologram.svg';
export default function DriverHologram({ data }) {
  return (
    <div className="lg:col-span-12 lg:order-first min-[1400px]:col-span-6 min-[1400px]:order-none bg-surface-container-low rounded-2xl p-space-md relative overflow-hidden shadow-2xl flex flex-col items-center justify-center border border-primary-container/30 group">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary-container/20 via-transparent to-primary/10 blur-xl pointer-events-none"></div>
      <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-[0_0_32px_rgba(0,212,255,0.25)] flex items-center justify-center bg-surface-container-lowest">
        <img
          alt="Illustrative driver avatar"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
          src={driverHologram}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md border border-primary-container/30">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">Illustrative avatar</span>
        </div>
        {/* Below sm and in the narrow 3-column range (lg..xl) the two top pills would overlap, so the second one drops below the first. */}
        <div className="absolute top-3 right-3 max-sm:top-12 max-sm:left-3 max-sm:right-auto px-2.5 py-1 rounded-full bg-surface-container-high/80 backdrop-blur-md text-on-surface-variant text-xs">
          Simulated sample data
        </div>
        <div className="absolute bottom-3 inset-x-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-space-md py-2.5 rounded-xl bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/30">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base text-on-surface font-semibold">Driver Twin #8842</span>
            <span className={`px-2 py-0.5 rounded text-xs uppercase font-semibold ${data.badgeClass}`}>
              {data.badge}
            </span>
          </div>
          <span className="text-xs text-on-surface-variant">Simulated</span>
        </div>
      </div>
    </div>
  );
}
