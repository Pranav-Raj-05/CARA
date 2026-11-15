import StatusTag from '../common/StatusTag';

export default function DecisionHeader() {
  return (
    <section className="flex flex-col min-[1400px]:flex-row min-[1400px]:items-end justify-between gap-space-md pb-2 border-b border-surface-container-high/60">
      <div className="flex flex-col gap-2 max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-primary text-xs uppercase tracking-widest font-semibold">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">rule</span>
          <span>SIMULATED RULE ENGINE • MULTI-TWIN INPUTS</span>
        </div>
        <h1 className="text-3xl lg:text-4xl text-on-surface font-semibold tracking-tight">Intelligent Decision Engine</h1>
        <p className="text-on-surface-variant text-sm">
          A frontend simulation of the decision rules documented in the research draft (Table II). Vehicle, driver and environment
          inputs are mapped to one of five recommendations, highest priority first. It is a prototype of a specification, not a
          validated or certified safety system.
        </p>
      </div>
      <div className="flex items-center gap-space-md p-space-md rounded-2xl bg-surface-container-low shadow-lg backdrop-blur-xl border border-surface-container-high/80">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-high text-primary-container shadow-[0_0_16px_rgba(0,212,255,0.3)]">
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">account_tree</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(106,247,186,0.8)]" aria-hidden="true"></span>
            <span className="text-xs uppercase tracking-wider text-primary font-bold">SIMULATION MODE | SYNTHETIC DATA</span>
          </div>
          <span className="text-xs text-on-surface-variant font-mono">Table II priority rules (simulated)</span>
          <StatusTag kind="planned" className="w-fit">Backend decision engine</StatusTag>
        </div>
      </div>
    </section>
  );
}
