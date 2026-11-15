import KpiTile from '../dashboard/KpiTile';
import StatusTag from '../common/StatusTag';
import { vehicleKpis } from '../../data/vehicleData';

export default function VehicleHeader({ resyncing, onResync }) {
  return (
    <section className="flex flex-col gap-4 mb-8 relative z-10">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-primary text-xs tracking-widest uppercase font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>
            <span>SIMULATION MODE | SYNTHETIC DATA</span>
            <StatusTag kind="planned">XGBoost health model</StatusTag>
          </div>
          <h1 className="text-3xl text-on-surface tracking-tight font-medium">Vehicle Digital Twin &amp; Diagnostics</h1>
          <p className="text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Illustrative sample values for the vehicle twin. No CAN bus, vehicle telemetry or trained model is connected; XGBoost
            health estimation is planned and not yet implemented.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start xl:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-container-high">
            <span className="h-2 w-2 rounded-full bg-outline" aria-hidden="true"></span>
            <span className="text-xs text-on-surface">Sample view • no fault or diagnostic data connected</span>
          </div>
          <button
            onClick={onResync}
            className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-xl text-xs font-semibold hover:brightness-110 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">sync</span>
            <span>{resyncing ? 'Resync (simulated)…' : 'Simulate Resync'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {vehicleKpis.map((kpi) => (
          <KpiTile key={kpi.label} {...kpi} />
        ))}
      </div>
    </section>
  );
}
