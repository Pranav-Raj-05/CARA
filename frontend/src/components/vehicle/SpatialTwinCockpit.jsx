import { hotspots } from '../../data/vehicleData';
import evHero from '../../assets/illustrations/ev-hero.svg';

export default function SpatialTwinCockpit({ selectedHotspot, onSelect }) {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden bg-surface-container-lowest/80 border border-surface-container-high/60 backdrop-blur-2xl p-6 lg:p-10 mb-8 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 z-10 relative mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg text-on-surface font-semibold">Spatial Digital Twin Cockpit</span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary text-xs tracking-wide font-medium">
            Illustrative Nodes
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span>Interactive hotspots (sample)</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-tertiary"></span>Nominal State</span>
        </div>
      </div>

      <div className="relative w-full flex items-center justify-center my-4">
        <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl">
          <img
            alt="CARA Demo EV digital twin (illustration)"
            className="w-full h-auto object-cover max-h-[520px] rounded-2xl"
            src={evHero}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none opacity-60"></div>

          {/* Hotspots */}
          {hotspots.map((hs) => (
            <button
              type="button"
              key={hs.id}
              onClick={() => onSelect(hs)}
              aria-label={hs.label}
              aria-pressed={selectedHotspot?.id === hs.id}
              className={`absolute ${hs.coords} -translate-x-1/2 -translate-y-1/2 cursor-pointer group rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`}
            >
              <span className="absolute -inset-2 rounded-full bg-primary/30 animate-ping"></span>
              <span className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-primary/60 shadow-lg text-primary hover:border-primary transition-all">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="hidden sm:inline text-xs font-semibold tracking-wide uppercase">{hs.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedHotspot && (
        <div className="mt-4 p-4 rounded-xl bg-surface-container-high/80 border border-primary/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">info</span>
            <div>
              <h4 className="text-sm font-bold text-on-surface">{selectedHotspot.label}</h4>
              <p className="text-xs text-primary font-mono">{selectedHotspot.status} (illustrative)</p>
            </div>
          </div>
          <button
            onClick={() => onSelect(null)}
            className="text-xs text-on-surface-variant hover:text-on-surface px-3 py-1 rounded bg-surface-container-highest"
          >
            Dismiss
          </button>
        </div>
      )}
    </section>
  );
}
