import StatusTag from '../common/StatusTag';

export default function AtmosphericCard({ current }) {
  return (
    <div className="flex flex-col justify-between p-space-md rounded-2xl bg-surface-container-low shadow-md">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">rainy</span>
            <span className="text-xs text-on-surface font-semibold tracking-wide uppercase">Atmospheric Conditions</span>
          </div>
          <StatusTag kind="illustrative" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base text-on-surface font-semibold">{current.summary}</span>
            <span className="text-xs text-on-surface-variant">Sample scenario</span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-bold text-on-surface">{current.temp}</span>
            <span className="text-sm text-on-surface-variant">°C</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface-container-lowest">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant uppercase tracking-wider">Precipitation Rate</span>
            <span className="text-on-surface font-semibold">{current.precipRate}</span>
          </div>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full rounded-full transition-all duration-500" style={{ width: current.precipBar }}></div>
          </div>
          <span className="text-[10px] text-on-surface-variant/80">Sample value (no radar connected)</span>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          <div className="p-2.5 rounded-xl bg-surface-container-lowest flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase">Humidity</span>
            <span className="text-sm text-on-surface font-semibold">{current.humidity}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-lowest flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase">Barometer</span>
            <span className="text-sm text-on-surface font-semibold">1013 hPa</span>
          </div>
        </div>
      </div>
      <div className="pt-space-md text-on-surface-variant text-xs flex items-center justify-between">
        <span>Phase: {current.rainMmH > 0 ? 'Liquid water' : 'No precipitation'}</span>
        <span className="text-tertiary">Above freezing by {current.temp} °C</span>
      </div>
    </div>
  );
}
