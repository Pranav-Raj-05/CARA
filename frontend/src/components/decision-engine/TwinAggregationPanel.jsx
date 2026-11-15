import TwinStreamCard from './TwinStreamCard';
import StatusTag from '../common/StatusTag';
import twinBackdrop from '../../assets/illustrations/twin-backdrop.svg';

// Focal view: the three what-if inputs flowing into the rule evaluation. The cards show the values the rules read.
export default function TwinAggregationPanel({ components, vhs, driverState, ers, weather, scenario }) {
  const impaired = ['Tired', 'Angry', 'Stressed'].includes(driverState);
  return (
    <section className="relative rounded-2xl overflow-hidden bg-surface-container-lowest border border-surface-container-high/50 p-space-lg shadow-2xl flex flex-col gap-space-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container-high/40 pb-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-primary-container text-[24px]" aria-hidden="true">account_tree</span>
          <h2 className="text-lg text-on-surface font-semibold">Twin State Aggregation &amp; Priority-Based Policy Arbiter</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusTag kind="simulated" />
          <StatusTag kind="illustrative">What-if inputs</StatusTag>
        </div>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden min-h-[360px] flex items-center justify-center bg-black/60 shadow-inner group">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105"
          src={twinBackdrop}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/80"></div>

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row lg:max-xl:flex-col items-center justify-between p-space-lg gap-space-md pointer-events-none">
          <TwinStreamCard
            className="w-full md:w-64 pointer-events-auto"
            borderClass="border-primary/30"
            accentClass="text-primary"
            dotClass="bg-primary shadow-[0_0_8px_rgba(0,212,255,0.8)]"
            icon="directions_car"
            title="Vehicle Twin"
            primary={{ label: 'VHS', value: vhs.toFixed(1), valueClass: 'text-on-surface' }}
            secondary={{ label: 'Brakes / Engine', value: `${components.brakes} / ${components.engine}`, valueClass: 'text-primary font-mono' }}
            flowText="Rule inputs: VHS, components"
            flowClass="text-primary/90"
          />

          {/* Center Badge */}
          <div className="hidden lg:flex flex-col items-center justify-center p-space-md rounded-2xl bg-surface-container-lowest/95 border border-primary-container/60 shadow-[0_0_32px_rgba(0,212,255,0.4)] backdrop-blur-2xl text-center px-5 py-3.5 max-w-xs gap-1.5 pointer-events-auto">
            <div className="flex items-center gap-1.5 text-primary-container text-xs uppercase tracking-widest font-bold">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">hub</span>
              <span>State Aggregator</span>
            </div>
            <div className="text-xs text-on-surface-variant font-mono text-center leading-snug">
              Vehicle + Driver + Env inputs<br />
              <span className="text-tertiary font-bold">↓ Aggregation</span><br />
              <span className="text-primary font-bold">↓ Table II rules (priority order)</span><br />
              <span className="text-on-surface font-semibold">↓ Recommendation (advisory)</span>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-mono text-[10px] font-semibold">
              Simulated in the browser
            </div>
          </div>

          <div className="flex flex-col gap-space-md w-full md:w-64 pointer-events-auto">
            <TwinStreamCard
              borderClass="border-secondary/30"
              accentClass="text-secondary"
              dotClass="bg-secondary shadow-[0_0_8px_rgba(182,196,255,0.8)]"
              icon="how_to_reg"
              title="Driver Twin"
              primary={{ label: 'Driver state', value: driverState, valueClass: 'text-on-surface' }}
              secondary={{ label: 'Tired / Angry / Stressed', value: impaired ? 'Yes' : 'No', valueClass: 'text-secondary font-medium' }}
              flowText="Rule input: driver state"
              flowClass="text-secondary"
            />
            <TwinStreamCard
              borderClass="border-tertiary/30"
              accentClass="text-tertiary"
              dotClass="bg-tertiary shadow-[0_0_8px_rgba(106,247,186,0.8)]"
              icon="partly_cloudy_day"
              title="Environment Twin"
              primary={{ label: 'ERS', value: `${ers}/100`, valueClass: 'text-tertiary' }}
              secondary={{ label: 'Mapped to', value: `${scenario.inputs.weatherCategory} + ${scenario.inputs.roadCategory}`, valueClass: 'text-on-surface font-medium' }}
              flowText="Rule input: ERS"
              flowClass="text-tertiary"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
