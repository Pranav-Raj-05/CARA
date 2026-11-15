import StatusTag from '../common/StatusTag';

export default function DriverHeader() {
  return (
    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md pb-2">
      <div className="flex flex-col gap-1.5 max-w-3xl">
        <div className="flex flex-wrap items-center gap-space-sm mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/20 text-primary-container text-xs tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            SIMULATION MODE | SYNTHETIC DATA
          </span>
          <StatusTag kind="planned">Random Forest driver model</StatusTag>
        </div>
        <h1 className="text-3xl font-semibold text-on-surface tracking-tight">Driver Digital Twin &amp; Human Factors</h1>
        <p className="text-on-surface-variant text-sm">
          Manual driver-state selection (prototype). No in-cabin camera or biosensor is connected, and every driver value shown is illustrative. Driver-state estimation and cockpit interventions are planned.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-space-sm self-start xl:self-auto bg-surface-container-low p-1.5 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container">
          <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">smart_toy</span>
          <span className="text-xs text-on-surface whitespace-nowrap">Sample signals (illustrative)</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container">
          <span className="material-symbols-outlined text-[16px] text-tertiary" aria-hidden="true">analytics</span>
          <span className="text-xs text-on-surface whitespace-nowrap">Model confidence: N/A (no model)</span>
        </div>
      </div>
    </div>
  );
}
