import StatTile from '../dashboard/StatTile';
import { Link } from 'react-router-dom';
import mapCard from '../../assets/illustrations/map-card.svg';

// Reads the shared (simulated) environment scenario, so it always agrees with the Environment Twin screen.
export default function EnvironmentTwinCard({ preset }) {
  return (
    <div className="md:max-[1399px]:col-span-2 rounded-2xl bg-surface-container-low border border-white/10 p-space-lg flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-secondary/30 group">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between max-[1399px]:flex-wrap max-[1399px]:gap-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/20">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">partly_cloudy_day</span>
            </div>
            <div>
              <h2 className="text-on-surface font-semibold text-[18px]">Environment Twin</h2>
              <span className="text-on-surface-variant uppercase tracking-wider text-[11px]">Environmental Risk Score (ERS)</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-semibold uppercase tracking-wider border border-secondary/20">
            ERS: {preset.ers}/100 ({preset.ersStatus})
          </span>
        </div>

        <div className="relative h-28 w-full rounded-xl overflow-hidden border border-white/10 shadow-inner group/map">
          <img
            alt="Illustrative road environment map"
            className="w-full h-full object-cover object-center filter brightness-90 group-hover/map:scale-105 transition-transform duration-700"
            src={mapCard}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-transparent"></div>
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-on-surface">
            <span className="flex items-center gap-1 text-[11px] bg-surface-container-lowest/80 px-2 py-0.5 rounded backdrop-blur-sm">
              <span className="material-symbols-outlined text-[13px] text-primary" aria-hidden="true">explore</span> Sample corridor A-4
            </span>
            <span className="text-[11px] bg-surface-container-lowest/80 px-2 py-0.5 rounded backdrop-blur-sm text-tertiary font-semibold">
              {preset.friction}μ Friction
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-on-surface text-xs">
          <StatTile label="Weather">{preset.summary} • {preset.temp}°C</StatTile>
          <StatTile label="Traffic Density">{preset.trafficDensity} (density 0–1; T = 100 × density)</StatTile>
          <StatTile label="Road Condition">{preset.surfaceType} ({preset.friction}μ)</StatTile>
          <StatTile label="Optical Visibility">{preset.visibility} km</StatTile>
        </div>
      </div>

      <p className="pt-space-sm text-[11px] text-on-surface-variant leading-snug">
        Formula inputs: {preset.inputs.weatherCategory} + {preset.inputs.roadCategory} road (prototype mapping, not a paper category).
      </p>
      <div className="pt-space-md border-t border-white/5 flex items-center justify-between max-[1399px]:gap-3">
        <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">science</span> Illustrative sample data
        </span>
        <Link to="/env-twin" className="inline-flex items-center gap-1 py-2 -my-2 max-[1399px]:shrink-0 max-[1399px]:whitespace-nowrap text-xs text-primary hover:text-primary-fixed transition-colors font-medium group-hover:translate-x-1 duration-200">
          Inspect Environment Twin <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
