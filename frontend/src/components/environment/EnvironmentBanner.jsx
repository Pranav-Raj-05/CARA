import { PRESET_OPTIONS, NON_INPUT_DISCLOSURE, MAPPING_DISCLOSURE } from '../../data/environmentPresets';

export default function EnvironmentBanner({ presetKey, onSelect }) {
  return (
    <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low/80 backdrop-blur-xl shadow-md">
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex flex-wrap items-center gap-space-sm">
          <h1 className="text-base text-on-surface font-semibold tracking-tight">Environment Digital Twin &amp; Situational Context</h1>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-xs tracking-wider uppercase font-semibold">
            SIMULATION MODE | SYNTHETIC DATA
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary" aria-hidden="true"></span>
            Sample data • no sensors connected
          </span>
        </div>
        <p className="text-xs text-on-surface-variant">Illustrative environment scenarios. The ERS is computed from the sample inputs shown, using the formula in the research draft; no weather, traffic or road data source is connected.</p>
        <p className="text-xs text-on-surface-variant">{MAPPING_DISCLOSURE} {NON_INPUT_DISCLOSURE}</p>
      </div>

      {/* Presets */}
      <div role="group" aria-label="Weather preset" className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface-container-lowest/80 lg:shrink-0 max-sm:grid max-sm:grid-cols-2">
        <span className="px-2.5 py-1 text-on-surface-variant text-xs uppercase tracking-wider flex items-center gap-1 max-sm:col-span-2">
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">tune</span> Preset:
        </span>
        {PRESET_OPTIONS.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            aria-pressed={presetKey === p.id}
            className={`px-3 py-1.5 max-sm:py-2.5 max-sm:text-center rounded-lg text-xs font-semibold tracking-wide transition-all ${
              presetKey === p.id
                ? "bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </section>
  );
}
