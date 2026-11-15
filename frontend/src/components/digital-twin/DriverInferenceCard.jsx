export default function DriverInferenceCard({ data }) {
  return (
    <div className="flex-1 bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between shadow-md border border-outline-variant/20 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-on-surface-variant">Driver wellness (illustrative)</span>
        <span className="material-symbols-outlined text-[18px] text-tertiary" aria-hidden="true">favorite</span>
      </div>
      {/* In the narrow 3-column range (lg..xl) the ring and text no longer fit side by side, so they stack. */}
      <div className="flex items-center gap-space-md my-2">
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle className="text-surface-container-high fill-transparent" cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8"></circle>
            <circle
              className="text-primary-container fill-transparent transition-all duration-700 shadow-[0_0_12px_rgba(0,212,255,0.6)]"
              cx="50"
              cy="50"
              r="42"
              stroke="currentColor"
              strokeDasharray="264"
              strokeDashoffset={data.dashoffset}
              strokeLinecap="round"
              strokeWidth="8"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl text-on-surface font-bold leading-none">{data.score}</span>
            <span className="text-[10px] text-on-surface-variant uppercase mt-0.5">/100</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-base text-primary font-semibold leading-tight">{data.desc}</span>
          <span className="text-xs text-tertiary mt-1">Confidence: N/A (no model)</span>
        </div>
      </div>
      <div className="text-xs text-on-surface-variant pt-2 border-t border-outline-variant/20 flex items-center justify-between">
        <span>Driver Profile</span>
        <span className="text-on-surface font-medium">Demo Driver</span>
      </div>
    </div>
  );
}
