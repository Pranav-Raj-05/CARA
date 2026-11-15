import { Link } from 'react-router-dom';
import StatusTag from '../common/StatusTag';

// Summary of the simulated decision for the SHARED state (driver state + environment scenario + sample vehicle values).
// It is computed by the same Table II simulation as the Decision Engine screen, so it can never contradict the inputs.
export default function DecisionSynthesisCard({ decision, inputs, advisorySent, onSimulateAlert }) {
  const { components, driverState, preset } = inputs;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#111827]/70 border border-white/10 backdrop-blur-xl p-space-lg lg:p-space-xl shadow-2xl">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-container/15 blur-3xl"></div>
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-tertiary/10 blur-3xl"></div>
      <div className="relative z-10 flex flex-col gap-space-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">rule</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h2 className="text-on-surface font-bold tracking-tight text-[22px]">Priority-Based Rule Engine &amp; Multi-Twin Synthesis</h2>
                <StatusTag kind="simulated" className="hidden sm:inline-flex" />
              </div>
              <p className="text-on-surface-variant text-[13px]">
                Maps the sample inputs to one of five recommendations using the Table II rules
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${decision.badgeClass}`}>
              P{decision.priority}: {decision.priorityName}
            </span>
          </div>
        </div>

        <div className="flex flex-col min-[1400px]:flex-row gap-space-lg justify-between items-start min-[1400px]:items-center">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">shield</span> Simulated recommendation
            </div>
            <h3 className="text-2xl lg:text-3xl text-on-surface font-semibold tracking-tight leading-tight">{decision.titleText}</h3>
            <div className="flex flex-col gap-2 pt-1 text-[13px] text-on-surface-variant">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-1">
                <div className="p-2.5 rounded-lg bg-surface-container-low/70 border border-white/5 flex flex-col gap-0.5">
                  <span className="uppercase tracking-wider text-primary font-semibold text-[11px]">Vehicle Factor</span>
                  <span className="text-on-surface font-medium text-[12px]">
                    VHS {decision.vhs} (brakes {components.brakes}, engine {components.engine}; sample values)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low/70 border border-white/5 flex flex-col gap-0.5">
                  <span className="uppercase tracking-wider text-tertiary font-semibold text-[11px]">Driver Factor</span>
                  <span className="text-on-surface font-medium text-[12px]">Driver state: {driverState} (selected manually)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low/70 border border-white/5 flex flex-col gap-0.5">
                  <span className="uppercase tracking-wider text-secondary font-semibold text-[11px]">Environmental Factor</span>
                  <span className="text-on-surface font-medium text-[12px]">
                    ERS {preset.ers} ({preset.inputs.weatherCategory}, {preset.inputs.roadCategory} road; prototype mapping of a sample scenario)
                  </span>
                </div>
              </div>
              <p className="text-on-surface text-[14px] leading-relaxed pt-1">
                <strong className="text-primary font-semibold">Simulated result:</strong> {decision.descText}
              </p>
            </div>
            <div className="flex items-start gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low/70 border border-white/5 w-fit max-w-full">
              <span className="material-symbols-outlined text-tertiary text-[16px] mt-0.5" aria-hidden="true">info</span>
              <span className="text-on-surface-variant font-medium text-[12px]">
                <strong className="text-tertiary font-semibold">Matched rule (Table II):</strong> {decision.ruleText}. <strong className="text-tertiary font-semibold">Because:</strong> {decision.because}.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap max-sm:flex-col max-sm:items-stretch items-center gap-3 w-full min-[1400px]:w-auto flex-shrink-0">
            <button
              onClick={onSimulateAlert}
              className="flex-1 lg:flex-none px-6 py-3.5 rounded-xl bg-primary-container text-on-primary-container text-sm font-semibold hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(0,212,255,0.35)] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">notification_important</span>
              {advisorySent ? 'Advisory shown (simulated)' : 'Simulate Advisory'}
            </button>
            <Link
              to="/decision-engine"
              className="flex-1 lg:flex-none px-5 py-3.5 rounded-xl bg-surface-container-high border border-white/10 text-on-surface text-sm font-semibold hover:bg-surface-bright transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">schema</span>
              Inspect Rule Logic
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
