import { driverStatesData } from '../../data/driverStates';

export default function DriverStateSelector({ selectedKey, onSelect }) {
  return (
    <div className="w-full bg-surface-container-low rounded-2xl p-space-md md:p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-md border border-outline-variant/30">
      <div className="flex items-center gap-space-sm">
        <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary-container">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">tune</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-on-surface font-semibold">Driver state, selected manually (Normal, Happy, Tired, Angry, Stressed)</span>
          <span className="text-xs text-on-surface-variant">Choose a state to see the simulated twin response. No driver is being monitored.</span>
        </div>
      </div>
      <div role="group" aria-label="Driver state (manual selection)" className="flex flex-wrap items-center gap-2">
        {Object.keys(driverStatesData).map((st) => (
          <button
            key={st}
            onClick={() => onSelect(st)}
            aria-pressed={selectedKey === st}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all capitalize ${
              selectedKey === st
                ? "bg-primary-container text-on-primary-container shadow-[0_0_16px_rgba(0,212,255,0.4)]"
                : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            {st}
          </button>
        ))}
      </div>
    </div>
  );
}
