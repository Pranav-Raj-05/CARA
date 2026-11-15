import HudTile from './HudTile';
import mapSpatial from '../../assets/illustrations/map-spatial.svg';

const MAP_IMAGE = `url('${mapSpatial}')`;

export default function SpatialMapSection({ current }) {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xl flex flex-col min-h-[460px]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: MAP_IMAGE }}>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-surface-container-lowest/80 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,14,21,0.92)_100%)]"></div>
      </div>

      {/* Map HUD Top */}
      <div className="relative z-10 p-space-md flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm bg-surface-container-low/90 backdrop-blur-xl px-space-md py-2 rounded-xl shadow-md">
          <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">radar</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Spatial Segment (sample)</span>
            <span className="text-sm text-on-surface font-semibold">Corridor Sector A-4 • Expressway North</span>
          </div>
          <span className="ml-2 px-2 py-0.5 rounded bg-surface-container-high text-primary text-[10px]">SAMPLE LOCATION</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-surface-container-low/90 backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-md">
            <span className="h-2 w-2 rounded-full bg-secondary"></span>
            <span className="text-xs text-on-surface-variant uppercase">Elevation (sample)</span>
            <span className="text-xs text-on-surface font-semibold">+184m MSL</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low/90 backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-md">
            <span className="material-symbols-outlined text-tertiary text-[16px]" aria-hidden="true">air</span>
            <span className="text-xs text-on-surface-variant uppercase">Crosswind (sample)</span>
            <span className="text-xs text-on-surface font-semibold">14 km/h WNW</span>
          </div>
        </div>
      </div>

      {/* Floating Telemetry HUD Overlays */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-space-md pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pointer-events-auto">
          <HudTile label="Environmental Risk" icon="warning_amber" iconClass="text-primary" value={current.ers} unit="/ 100">
            <span className="text-xs text-primary font-medium tracking-wide">{current.ersStatus}</span>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-primary-container h-full rounded-full transition-all duration-500" style={{ width: current.hudBarWidth }}></div>
            </div>
          </HudTile>
          <HudTile label="Road Grip / Friction" icon="tire_repair" iconClass="text-tertiary" value={current.friction} unit="μ">
            <span className="text-xs text-tertiary font-medium">{current.frictionLabel}</span>
            <span className="text-[11px] text-on-surface-variant/80">Threshold target: 0.85μ</span>
          </HudTile>
          <HudTile label="Traffic Density" icon="traffic" iconClass="text-secondary" value={current.trafficDensity} unit="density 0–1">
            <span className="text-xs text-secondary font-medium">Corridor pace (sample): {current.trafficSpeed} km/h</span>
          </HudTile>
          <HudTile label="Visibility Horizon" icon="visibility" iconClass="text-primary" value={current.visibility} unit="km">
            <span className="text-xs text-on-surface-variant font-medium">{current.visLabel}</span>
          </HudTile>
        </div>
      </div>

      {/* Map Legend */}
      <div className="relative z-10 px-space-md py-2 bg-surface-container-lowest/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant text-xs">
        <div className="flex flex-wrap items-center gap-x-space-md gap-y-1">
          <span className="uppercase tracking-widest text-on-surface font-semibold">Simulated Spatial Route:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-primary-container"></span>
            <span>Nominal / Dry</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-secondary-container"></span>
            <span>Damp Surface</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-error"></span>
            <span>Standing Water Node</span>
          </div>
        </div>
        <span className="text-on-surface-variant/70">Sample scenario A4-9892</span>
      </div>
    </section>
  );
}
