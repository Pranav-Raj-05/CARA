import StatusTag from '../common/StatusTag';

export default function TrafficOpticalCard({ current }) {
  return (
    <div className="flex flex-col justify-between p-space-md rounded-2xl bg-surface-container-low shadow-md">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">sensor_occupied</span>
            <span className="text-xs text-on-surface font-semibold tracking-wide uppercase">Traffic &amp; Optical Range</span>
          </div>
          <StatusTag kind="planned">V2X</StatusTag>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          <div className="p-3 rounded-xl bg-surface-container-lowest flex flex-col gap-1">
            <span className="text-[10px] text-on-surface-variant uppercase">Traffic Density</span>
            <span className="text-lg text-on-surface font-bold">{current.trafficDensity}</span>
            <span className="text-[10px] text-secondary font-medium">density 0–1<br />T = 100 × density</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-lowest flex flex-col gap-1">
            <span className="text-[10px] text-on-surface-variant uppercase">Avg Speed</span>
            <span className="text-lg text-on-surface font-bold">{current.trafficSpeed}</span>
            <span className="text-[10px] text-on-surface-variant font-medium">km/h pace</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-3 rounded-xl bg-surface-container-lowest text-xs">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant uppercase">Visual Range (sample)</span>
            <span className="text-on-surface font-semibold">{current.visibility} km</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">View obstruction (sample)</span>
            <span className="text-tertiary font-semibold">{current.visAttenuation}</span>
          </div>
        </div>
      </div>
      <div className="pt-space-md text-on-surface-variant text-xs flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[16px] text-tertiary" aria-hidden="true">info</span>
        <span>Illustrative: no perception stack is connected</span>
      </div>
    </div>
  );
}
