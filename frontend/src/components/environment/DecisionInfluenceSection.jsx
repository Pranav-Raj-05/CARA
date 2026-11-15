export default function DecisionInfluenceSection({ current }) {
  const ersOutcome =
    current.ersExact >= 85
      ? 'ERS is at or above 85, so the Emergency Alert rule would match (Table II of the research draft).'
      : current.ersExact >= 60
        ? 'ERS is at or above 60, so the Slow Down rule would match unless a higher-priority rule applies (Table II).'
        : 'ERS is below 60, so the environment alone triggers no rule (Table II).';
  return (
    <section className="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-container-low shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm pb-space-sm">
        <div className="flex items-center gap-space-md">
          <div className="p-2.5 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">account_tree</span>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h2 className="text-base text-on-surface font-bold">How Environment Twin Influences CARA Decision Engine</h2>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary text-[10px] tracking-widest uppercase whitespace-nowrap">Simulated mapping</span>
            </div>
            <p className="text-xs text-on-surface-variant">Illustrative mapping from the sample environment inputs to the simulated Decision Engine rules.</p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-surface-container-highest/60 text-on-surface-variant text-xs flex items-center gap-2 shrink-0">
          <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">info</span>
          <span>Advisory only • no actuator control</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-space-md items-stretch">
        <div className="p-space-md rounded-xl bg-surface-container-lowest flex flex-col justify-between gap-space-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">1. Trigger Condition Ingestion</span>
              <span className="material-symbols-outlined text-primary text-[18px]" aria-hidden="true">input</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-high/60 text-xs text-on-surface flex flex-col gap-1.5">
              <span className="font-semibold text-primary">Illustrative rule (not from the research methodology):</span>
              <code className="text-[11px] text-on-surface-variant font-mono">
                IF RoadFriction &lt; 0.80μ<br />
                AND AmbientRain &gt; 0.5 mm/h<br />
                THEN Inject HazardVector
              </code>
            </div>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant text-xs">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true"></span>
            <span>Condition {current.illustrativeRuleMet ? 'met' : 'not met'} ({current.friction}μ, {current.precipRate})</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest flex flex-col justify-between gap-space-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold">2. Hazard Vector Integration</span>
              <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">hub</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-high/60 text-xs text-on-surface flex flex-col gap-1.5">
              <span className="font-semibold text-secondary">Simulated input to the rules:</span>
              <p className="text-on-surface-variant">Passes <span className="text-on-surface font-semibold">ERS {current.ers} ({current.ersStatus})</span> to the simulated Decision Engine rules. Only the thresholds 60 and 85 are used.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">sync</span>
            <span>Combined with driver state and VHS in the simulated rules</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest flex flex-col justify-between gap-space-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-tertiary font-semibold">3. Simulated Advisory Output</span>
              <span className="material-symbols-outlined text-tertiary text-[18px]" aria-hidden="true">campaign</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-high/60 text-xs text-on-surface flex flex-col gap-1.5">
              <span className="font-semibold text-tertiary">Rule outcome for the environment:</span>
              <p className="text-on-surface-variant">{ersOutcome}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[16px] text-tertiary" aria-hidden="true">notification_important</span>
            <span>No audio or HUD output exists in this prototype</span>
          </div>
        </div>
      </div>

      <div className="p-space-md rounded-xl bg-surface-container-lowest flex items-start gap-space-md">
        <span className="material-symbols-outlined text-on-surface-variant text-[22px] shrink-0 mt-0.5" aria-hidden="true">info</span>
        <div className="flex flex-col gap-1 text-on-surface-variant text-xs">
          <span className="font-semibold text-on-surface">Architectural Safety &amp; Boundary Notice:</span>
          <p>
            CARA is designed as an advisory, situational digital-twin framework. This prototype shows simulated sample values: it reads no vehicle or environment data and does not control steering, braking or any other actuator.
          </p>
        </div>
      </div>
    </section>
  );
}
