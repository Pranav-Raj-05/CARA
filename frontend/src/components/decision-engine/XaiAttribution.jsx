import StatusTag from '../common/StatusTag';

// Illustrative attribution: the arithmetic of the placeholder composite (driver 0.40, environment 0.35, vehicle 0.25).
// This is NOT a model explanation (no TreeSHAP or any other explainer exists in this prototype).
function ContributionBar({ label, valueText, valueClass, barClass, percent }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span className="text-on-surface font-medium">{label}</span>
        <span className={`font-mono ${valueClass} font-bold`}>{valueText}</span>
      </div>
      <div className="h-3 bg-surface-container-highest rounded-full overflow-hidden">
        <div className={`${barClass} h-full rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

export default function XaiAttribution({ decision, driverState, weather, ers }) {
  const { contributions: c, netRisk, vhs } = decision;
  const scale = 35; // the largest possible single contribution (environment: 100 x 0.35)
  const pct = (x) => Math.min(100, (x / scale) * 100);

  return (
    <div className="xl:col-span-7 flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-container-low shadow-xl border border-surface-container-high/60">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container-high/40 pb-space-sm">
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">balance</span>
            <h2 className="text-base text-on-surface font-semibold">Input Contribution (illustrative)</h2>
            <StatusTag kind="planned">Model explainability</StatusTag>
          </div>
          <span className="text-xs text-on-surface-variant">
            Arithmetic of the placeholder composite below. It is not a model explanation (no TreeSHAP or other explainer exists yet).
          </span>
        </div>
        <span className="px-3 py-1 rounded-xl bg-surface-container-high text-primary font-mono font-bold text-xs whitespace-nowrap shrink-0">
          Illustrative risk: {netRisk}/100
        </span>
      </div>

      <div className="flex flex-col gap-space-md p-space-md rounded-xl bg-surface-container">
        <ContributionBar
          label={`Driver: ${driverState} (placeholder ×0.40)`}
          valueText={`+${c.driver.toFixed(1)} pts`}
          valueClass="text-secondary"
          barClass="bg-secondary"
          percent={pct(c.driver)}
        />
        <ContributionBar
          label={`Environment: ${weather}, ERS ${ers} (placeholder ×0.35)`}
          valueText={`+${c.environment.toFixed(1)} pts`}
          valueClass="text-primary"
          barClass="bg-primary"
          percent={pct(c.environment)}
        />
        <ContributionBar
          label={`Vehicle: VHS ${vhs} (placeholder ×0.25)`}
          valueText={`+${c.vehicle.toFixed(1)} pts`}
          valueClass="text-tertiary"
          barClass="bg-tertiary"
          percent={pct(c.vehicle)}
        />
        <p className="text-[11px] text-on-surface-variant leading-snug">
          Total = {(c.driver + c.environment + c.vehicle).toFixed(1)}, shown rounded as {netRisk}. The weights are not calibrated, are not
          part of the research methodology, and play no part in which recommendation is selected.
        </p>
      </div>
    </div>
  );
}
