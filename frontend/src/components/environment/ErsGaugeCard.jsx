import StatusTag from '../common/StatusTag';
import { MAPPING_DISCLOSURE } from '../../data/environmentPresets';

export default function ErsGaugeCard({ current }) {
  const { inputs: i, scores: s, contributions: c } = current;
  const rows = [
    { label: `Weather: ${i.weatherCategory} (${s.weather})`, value: c.weather, cls: 'text-primary' },
    { label: `Road: ${i.roadCategory} (${s.road})`, value: c.road, cls: 'text-secondary' },
    { label: `Traffic: density ${i.density.toFixed(2)}, T = 100 × density = ${s.traffic.toFixed(0)}`, value: c.traffic, cls: 'text-tertiary' },
    { label: `Visibility: ${current.visibility} km (${s.visibility.toFixed(0)})`, value: c.visibility, cls: 'text-primary' },
  ];
  return (
    <div className="flex flex-col justify-between p-space-md rounded-2xl bg-surface-container-low shadow-md relative overflow-hidden">
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">speed</span>
            <span className="text-xs text-on-surface font-semibold tracking-wide uppercase">Environmental Risk (ERS)</span>
          </div>
          <StatusTag kind="illustrative" />
        </div>

        <div className="relative flex items-center justify-center my-2">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle className="text-surface-container-highest" cx="60" cy="60" fill="none" r="48" stroke="currentColor" strokeDasharray="301.6" strokeDashoffset="75.4" strokeLinecap="round" strokeWidth="10"></circle>
            <circle
              className="text-primary-container transition-all duration-700"
              cx="60"
              cy="60"
              fill="none"
              r="48"
              stroke="currentColor"
              strokeDasharray="301.6"
              strokeDashoffset={current.ersOffset}
              strokeLinecap="round"
              strokeWidth="10"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-on-surface leading-none">{current.ers}</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">Index / 100</span>
          </div>
        </div>

        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-xs text-primary font-semibold uppercase tracking-wider">
            {current.ersStatus}
          </span>
          <p className="text-[11px] text-on-surface-variant mt-1.5 leading-snug">{current.ersStatusLong}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-space-md bg-surface-container-lowest/40 -mx-space-md -mb-space-md p-space-md rounded-b-2xl">
        <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Contribution to ERS (points):</span>
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-2 text-xs">
            <span className="text-on-surface">{r.label}</span>
            <span className={`font-semibold ${r.cls}`}>+{r.value.toFixed(1)}</span>
          </div>
        ))}
        <p className="text-[10px] text-on-surface-variant leading-snug pt-1">
          ERS = 0.30·W + 0.25·T + 0.25·R + 0.20·V = {current.ers}. Formula and scores from the research draft, which calls the weights design choices; the inputs are samples.
        </p>
        <p className="text-[10px] text-on-surface-variant leading-snug" data-testid="ers-mapping-note">
          Scenario &ldquo;{current.summary}&rdquo; is passed to the formula as {current.inputs.weatherCategory} weather on a {current.inputs.roadCategory} road. {MAPPING_DISCLOSURE}
        </p>
      </div>
    </div>
  );
}
