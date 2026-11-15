import StatTile from '../dashboard/StatTile';
import { Link } from 'react-router-dom';
import { BASELINE_COMPONENTS as C, BASELINE_VHS } from '../../data/vehicleHealth';

export default function VehicleTwinCard() {
  return (
    <div className="rounded-2xl bg-surface-container-low border border-white/10 p-space-lg flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-primary/30 group">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-container/15 flex items-center justify-center text-primary-container border border-primary-container/20">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">directions_car</span>
            </div>
            <div>
              <h2 className="text-on-surface font-semibold text-[18px]">Vehicle Twin</h2>
              <span className="text-on-surface-variant uppercase tracking-wider text-[11px]">Illustrative • XGBoost planned</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary/15 text-tertiary text-xs font-semibold uppercase tracking-wider border border-tertiary/20">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary"></span> Nominal
          </span>
        </div>

        <div className="flex items-center max-sm:flex-col max-sm:items-start gap-5 p-4 rounded-xl bg-surface-container-lowest/60 border border-white/5">
          <div className="relative flex items-center justify-center flex-shrink-0">
            <svg className="h-20 w-20 -rotate-90 transform" viewBox="0 0 72 72">
              <circle className="text-surface-container-highest" cx="36" cy="36" fill="none" r="30" stroke="currentColor" strokeWidth="5"></circle>
              <circle className="text-primary-container transition-all duration-1000 ease-out" cx="36" cy="36" fill="none" r="30" stroke="currentColor" strokeDasharray="188.4" strokeDashoffset={(188.4 * (1 - BASELINE_VHS / 100)).toFixed(1)} strokeLinecap="round" strokeWidth="5.5"></circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-on-surface font-bold text-[20px] leading-none">{BASELINE_VHS.toFixed(1)}<span className="text-[12px] font-semibold">%</span></span>
              <span className="text-on-surface-variant text-[10px] uppercase mt-0.5">VHS</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-on-surface font-semibold text-sm">Vehicle Health Score (VHS)</span>
            <p className="text-on-surface-variant text-[13px] leading-relaxed">Weighted average of the four component values below (weights 0.25, 0.30, 0.25, 0.20). Illustrative sample inputs.</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <span className="text-on-surface-variant uppercase tracking-wider text-[11px]">Component health (illustrative)</span>
          <div className="grid grid-cols-2 gap-2 text-on-surface text-xs">
            <StatTile label="Battery State">{C.battery}% <span className="text-[10px] text-tertiary">(Nominal)</span></StatTile>
            <StatTile label="Brake Condition">{C.brakes}% <span className="text-[10px] text-tertiary">(Ceramic)</span></StatTile>
            <StatTile label="Engine / Powertrain">{C.engine}% <span className="text-[10px] text-tertiary">(Dual Inverter)</span></StatTile>
            <StatTile label="Tires & Chassis">{C.tires}% <span className="text-[10px] text-primary">(Tread)</span></StatTile>
          </div>
        </div>
      </div>

      <div className="pt-space-md border-t border-white/5 flex items-center justify-between max-[1399px]:gap-3">
        <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px] text-primary" aria-hidden="true">science</span> Illustrative sample data
        </span>
        <Link to="/vehicle-twin" className="inline-flex items-center gap-1 py-2 -my-2 max-[1399px]:shrink-0 max-[1399px]:whitespace-nowrap text-xs text-primary hover:text-primary-fixed transition-colors font-medium group-hover:translate-x-1 duration-200">
          Inspect Vehicle Twin <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
