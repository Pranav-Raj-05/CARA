import { DRIVER_STATE_OPTIONS, WEATHER_PRESETS } from '../../data/decisionEngine';
import { COMPONENT_KEYS, COMPONENT_LABELS, computeVHSExact } from '../../data/vehicleHealth';
import { MAPPING_DISCLOSURE } from '../../data/environmentPresets';
import { TABLE_II } from '../../utils/decisionRules';
import StatusTag from '../common/StatusTag';

const SLIDER_CLASS =
  'w-full h-8 -my-3 border-y-[12px] border-transparent bg-clip-padding bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary-container';

export default function ScenarioSandbox({
  components,
  vhs,
  onComponentChange,
  onAllComponentsChange,
  driverState,
  onDriverStateChange,
  weather,
  scenario,
  friction,
  ers,
  onWeatherSelect,
  onReset,
}) {
  const critical = components.brakes < TABLE_II.brakeCritical || components.engine < TABLE_II.engineCritical;
  const service = computeVHSExact(components) < TABLE_II.vhsService || COMPONENT_KEYS.some((k) => components[k] < TABLE_II.componentService);
  const status = critical ? 'Critical component' : service ? 'Service' : 'Nominal';
  const statusClass = critical ? 'text-error' : service ? 'text-secondary' : 'text-primary';

  return (
    <div className="xl:col-span-7 flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-container-low shadow-xl border border-surface-container-high/60">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">tune</span>
            <h2 className="text-lg text-on-surface font-semibold">Scenario Sandbox &amp; What-If Simulator</h2>
          </div>
          <StatusTag kind="simulated">Independent what-if inputs</StatusTag>
        </div>
        <p className="text-xs text-on-surface-variant">
          Adjust the inputs to see which Table II rule matches. These inputs are independent of the Driver Twin and Environment Twin
          screens, so you can test scenarios without changing them.
        </p>
      </div>

      <div className="flex flex-col gap-space-md pt-2">
        {/* Vehicle */}
        <div className="flex flex-col gap-2 p-space-md rounded-xl bg-surface-container">
          <div className="flex items-center justify-between flex-wrap gap-x-2">
            <span className="text-xs uppercase tracking-wider text-on-surface font-semibold">Vehicle Subsystem Health (what-if)</span>
            <span className={`text-sm font-semibold ${statusClass}`}>
              VHS {vhs} ({status})
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(vhs)}
            onChange={(e) => onAllComponentsChange(parseInt(e.target.value, 10))}
            aria-label="Set all four vehicle components to this health value, percent"
            className={SLIDER_CLASS}
          />
          <div className="flex justify-between gap-2 text-on-surface-variant text-[10px]">
            <span>Critical: brake 30, engine 25</span>
            <span>Service: component 40, VHS 60</span>
            <span>100</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            This slider sets all four components to the same value. VHS = 0.25 battery + 0.30 brakes + 0.25 engine + 0.20 tires.
          </p>
          <details className="group">
            <summary className="cursor-pointer text-xs text-primary hover:underline w-fit rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              Set components individually
            </summary>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {COMPONENT_KEYS.map((k) => (
                <div key={k} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor={`comp-${k}`} className="text-on-surface-variant">{COMPONENT_LABELS[k]}</label>
                    <span className="text-on-surface font-semibold">{components[k]}</span>
                  </div>
                  <input
                    id={`comp-${k}`}
                    type="range"
                    min="0"
                    max="100"
                    value={components[k]}
                    onChange={(e) => onComponentChange(k, parseInt(e.target.value, 10))}
                    className={SLIDER_CLASS}
                  />
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Driver State Buttons */}
        <div className="flex flex-col gap-2 p-space-md rounded-xl bg-surface-container">
          <div className="flex items-center justify-between flex-wrap gap-x-2">
            <span className="text-xs uppercase tracking-wider text-on-surface font-semibold">Driver State (what-if)</span>
            <span className="text-xs text-tertiary uppercase font-mono">{driverState}</span>
          </div>
          <div role="group" aria-label="Driver state (what-if)" className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DRIVER_STATE_OPTIONS.map((st) => (
              <button
                key={st}
                onClick={() => onDriverStateChange(st)}
                aria-pressed={driverState === st}
                className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                  driverState === st
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Weather Presets */}
        <div className="flex flex-col gap-2 p-space-md rounded-xl bg-surface-container">
          <div className="flex items-center justify-between flex-wrap gap-x-2">
            <span className="text-xs uppercase tracking-wider text-on-surface font-semibold">Weather &amp; Surface Presets (what-if)</span>
            <span className="text-xs text-primary font-mono">
              {weather} ({friction}) • ERS {ers}
            </span>
          </div>
          <div role="group" aria-label="Weather and surface preset (what-if)" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {WEATHER_PRESETS.map((w) => (
              <button
                key={w.name}
                onClick={() => onWeatherSelect(w)}
                aria-pressed={weather === w.name}
                className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                  weather === w.name
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
                }`}
              >
                {w.name}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-on-surface-variant flex flex-col gap-1" data-testid="scenario-formula">
            <p className="text-on-surface">
              Formula inputs: weather <strong>{scenario.inputs.weatherCategory}</strong> ({scenario.scores.weather}), road{' '}
              <strong>{scenario.inputs.roadCategory}</strong> ({scenario.scores.road}), traffic density {scenario.inputs.density.toFixed(2)}{' '}
              (T = 100 × {scenario.inputs.density.toFixed(2)} = {scenario.scores.traffic.toFixed(0)}), visibility {scenario.inputs.visibilityKm} km (V ={' '}
              {scenario.scores.visibility.toFixed(0)}) → ERS {ers}, computed with the same formula for every scenario.
            </p>
            <p>{MAPPING_DISCLOSURE}</p>
            <p>Friction ({friction}) is an illustrative value and is not an input to the ERS.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-on-surface-variant text-xs pt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></span>
            Browser-only simulation (no backend)
          </span>
          <button onClick={onReset} className="py-2 -my-2 text-primary hover:underline text-xs font-semibold whitespace-nowrap">
            Reset to Baseline Snapshot
          </button>
        </div>
      </div>
    </div>
  );
}
