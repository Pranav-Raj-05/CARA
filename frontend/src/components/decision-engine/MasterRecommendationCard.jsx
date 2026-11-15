import { useState } from 'react';

const AUDIT_NOTE =
  'This is a frontend simulation of the decision rules documented in the research draft (Table II, highest priority first). It is not a validated, certified or real-world safety system, and no ISO 26262 or ASIL-D claim is made. The thresholds are design choices that have not been validated against real driving, and no audit log exists.';

export default function MasterRecommendationCard({ decision, inputs, alertSimulated, onSimulateAlert }) {
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <section className="relative rounded-2xl bg-surface-container-low border-2 border-primary-container shadow-[0_0_36px_rgba(0,212,255,0.22)] p-space-lg flex flex-col gap-space-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm border-b border-surface-container-high/60 pb-space-sm">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase max-[1399px]:whitespace-nowrap ${decision.badgeClass}`}>
            {decision.priorityText.split(':')[0]} : SIMULATED RESULT
          </span>
          <span className="text-primary font-mono font-bold text-base tracking-wide">{decision.priorityText}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-surface-container-high text-primary font-mono text-xs whitespace-nowrap">
            Illustrative risk: {decision.netRisk}/100
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-space-md">
        <div className="p-space-sm rounded-xl bg-surface-container border border-primary-container/40 flex items-start gap-2 text-on-surface font-mono text-xs">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0" aria-hidden="true">terminal</span>
          <span>
            <strong className="text-primary">Matched rule (Table II):</strong> {decision.ruleText}
            <br />
            <strong className="text-primary">Inputs:</strong> brakes {inputs.components.brakes}, engine {inputs.components.engine}, VHS {decision.vhs},
            driver {inputs.driverState}, ERS {inputs.ers}. <strong className="text-primary">Because:</strong> {decision.because}.
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-2 max-w-3xl">
            <h3 className="text-xl text-on-surface font-semibold">{decision.titleText}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{decision.descText}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-sm shrink-0 w-full lg:w-auto">
            <button
              onClick={onSimulateAlert}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-container text-on-primary-container text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:opacity-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">notification_important</span>
              <span>{alertSimulated ? 'Advisory shown (simulated)' : 'Simulate Advisory'}</span>
            </button>
            <button
              onClick={() => setAuditOpen((open) => !open)}
              aria-expanded={auditOpen}
              aria-controls="rule-audit-note"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">policy</span>
              <span>About This Simulation</span>
            </button>
          </div>
        </div>

        {/* Inline notice instead of a blocking browser alert() */}
        {auditOpen && (
          <div id="rule-audit-note" role="status" className="flex items-start gap-3 p-space-sm rounded-xl bg-surface-container border border-primary-container/40 text-xs text-on-surface">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0" aria-hidden="true">policy</span>
            <p className="flex-1 leading-relaxed">{AUDIT_NOTE}</p>
            <button
              onClick={() => setAuditOpen(false)}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
