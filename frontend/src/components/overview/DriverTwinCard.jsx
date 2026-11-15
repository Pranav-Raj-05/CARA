import { Link } from 'react-router-dom';

export default function DriverTwinCard({ driverState, setDriverState }) {
  return (
    <div className="rounded-2xl bg-surface-container-low border border-white/10 p-space-lg flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-tertiary/30 group">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-tertiary/15 flex items-center justify-center text-tertiary border border-tertiary/20">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">how_to_reg</span>
            </div>
            <div>
              <h2 className="text-on-surface font-semibold text-[18px]">Driver Twin</h2>
              <span className="text-on-surface-variant uppercase tracking-wider text-[11px]">Random Forest: planned</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs">
            Conf: N/A
          </span>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-lowest/60 border border-white/5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-tertiary shadow-[0_0_10px_rgba(106,247,186,0.9)]" aria-hidden="true"></span>
              <span className="text-on-surface font-bold text-[18px] tracking-tight uppercase">
                {driverState}
              </span>
            </div>
            <span className="text-xs text-tertiary font-semibold uppercase tracking-wider">
              Manual selection
            </span>
          </div>
          <div className="text-on-surface-variant text-[12px]">
            5-state driver model (Normal, Happy, Tired, Angry, Stressed). The Random Forest classifier is planned; the state here is chosen by hand.
          </div>
          <div className="h-7 w-full overflow-hidden flex items-center">
            <svg className="w-full h-6 text-tertiary" fill="none" viewBox="0 0 300 32">
              <path className="opacity-85" d="M0,16 L50,16 L60,16 L66,6 L74,26 L80,10 L86,18 L92,16 L160,16 L168,4 L176,28 L182,16 L230,16 L238,12 L244,20 L250,16 L300,16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary uppercase tracking-wider font-semibold">Manual Simulation Override</span>
            <span className="text-xs text-on-surface-variant">Test Driver Profiles</span>
          </div>
          <div role="group" aria-label="Driver state (manual selection)" className="flex flex-wrap gap-1.5">
            {["Normal", "Happy", "Tired", "Angry", "Stressed"].map((st) => (
              <button
                key={st}
                onClick={() => setDriverState(st)}
                aria-pressed={driverState === st}
                className={`px-3 py-1 max-sm:py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  driverState === st
                    ? "bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(0,212,255,0.4)]"
                    : "bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-space-md border-t border-white/5 flex items-center justify-between max-[1399px]:gap-3">
        <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">favorite</span> 72 bpm sample value
        </span>
        <Link to="/driver-twin" className="inline-flex items-center gap-1 py-2 -my-2 max-[1399px]:shrink-0 max-[1399px]:whitespace-nowrap text-xs text-primary hover:text-primary-fixed transition-colors font-medium group-hover:translate-x-1 duration-200">
          Inspect Driver Twin <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
