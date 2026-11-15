import { PRIORITY_TIERS } from '../../data/decisionEngine';

// Rule order and conditions from Table II of the research draft. The highlighted row is the one the simulation selected.
export default function PriorityHierarchyRail({ activePriority }) {
  return (
    <div className="xl:col-span-5 flex flex-col gap-space-sm p-space-lg rounded-2xl bg-surface-container-low shadow-xl border border-surface-container-high/60">
      <div className="flex items-center gap-2 border-b border-surface-container-high/40 pb-space-sm">
        <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">format_list_numbered</span>
        <h2 className="text-base text-on-surface font-semibold">Safety Priority Hierarchy Rail</h2>
      </div>
      <p className="text-xs text-on-surface-variant">
        Rule order from Table II of the research draft: the highest-priority rule whose condition holds is selected (frontend
        simulation). The highlighted row is the current simulated result.
      </p>

      <ol className="flex flex-col gap-2 pt-1">
        {PRIORITY_TIERS.map((tier) => {
          const active = tier.p === activePriority;
          return (
            <li
              key={tier.p}
              aria-current={active ? 'true' : undefined}
              className={`p-space-sm rounded-xl bg-surface-container flex items-center justify-between gap-2 border ${
                active
                  ? 'border-2 border-tertiary shadow-[0_0_16px_rgba(106,247,186,0.3)] bg-gradient-to-r from-surface-container to-surface-container-high'
                  : 'border-surface-container-high/40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-8 h-8 shrink-0 rounded-lg bg-surface-container-high ${tier.color} font-mono font-bold flex items-center justify-center text-xs`}>
                  {tier.label}
                </span>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${tier.color} font-bold uppercase`}>{tier.name}</span>
                    {active && <span className="text-[10px] text-tertiary font-semibold uppercase tracking-wider">Selected (simulated)</span>}
                  </div>
                  <span className="text-[11px] text-on-surface-variant">{tier.desc}</span>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[18px] shrink-0 ${tier.color}`} aria-hidden="true">
                {active ? 'check_circle' : 'shield'}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
