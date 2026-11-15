import RiskBar from './RiskBar';

export default function DecisionPreview({ decision, driverState, weather, ers }) {
  const { driverRisk, vehRisk, netRisk, priorityText, priorityClass, titleText, descText, vhs, ruleText } = decision;

  return (
    <div className="xl:col-span-5 flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-low shadow-xl border border-surface-container-high/60">
      <div className="flex flex-col gap-space-md">
        <div className="p-space-sm rounded-xl bg-surface-container-high/60 flex items-center justify-between gap-2 text-on-surface-variant text-xs">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">science</span>
            SIMULATED DECISION PREVIEW
          </span>
          <span className="font-mono">Table II rules</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${priorityClass}`}>
              {priorityText}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-on-surface-variant">Illustrative risk:</span>
              <span className="text-lg text-primary font-mono font-bold">{netRisk}/100</span>
            </div>
          </div>
          <h3 className="text-base text-on-surface font-semibold pt-1">{titleText}</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">{descText}</p>
          <p className="text-[11px] text-on-surface-variant font-mono leading-relaxed">Condition: {ruleText}</p>
        </div>

        <div className="flex flex-col gap-space-sm p-space-md rounded-xl bg-surface-container">
          <span className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Illustrative composite (placeholder weights)</span>
          <p className="text-[11px] text-on-surface-variant leading-snug">
            Driver ×0.40, environment ×0.35, vehicle ×0.25. These weights are placeholders: not calibrated, not part of the research
            methodology, and not used to choose the recommendation above.
          </p>
          <RiskBar
            label={`Driver: ${driverState}`}
            valueText={`${driverRisk}% (×0.40)`}
            valueClass="text-tertiary"
            percent={driverRisk}
            barClass={driverRisk > 60 ? 'bg-error' : driverRisk > 35 ? 'bg-secondary' : 'bg-tertiary'}
          />
          <RiskBar
            label={`Environment: ${weather} (ERS ${ers})`}
            valueText={`${ers}% (×0.35)`}
            valueClass="text-primary"
            percent={ers}
            barClass={ers > 60 ? 'bg-error' : ers > 30 ? 'bg-primary' : 'bg-tertiary'}
          />
          <RiskBar
            label={`Vehicle: VHS ${vhs}`}
            valueText={`${vehRisk}% wear (×0.25)`}
            valueClass="text-on-surface-variant"
            percent={vehRisk}
            barClass={vehRisk > 60 ? 'bg-error' : 'bg-on-surface-variant'}
          />
        </div>
      </div>

      <div className="pt-space-md border-t border-surface-container-high/40 flex items-center justify-between gap-2 text-xs text-on-surface-variant">
        <span className="flex items-center gap-1.5 text-tertiary">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">rule</span>Rule matched (simulated)
        </span>
        <span className="font-mono text-[11px]">First matching rule wins</span>
      </div>
    </div>
  );
}
