// Time-axis ticks. `full` includes the clock time; `short` is used on small screens.
const TICKS = [
  { short: '-120 min', full: '-120 min (07:42)' },
  { short: '-90 min', full: '-90 min (08:12)' },
  { short: '-60 min', full: '-60 min (08:42)' },
  { short: '-30 min', full: '-30 min (09:12)' },
  { short: 'Now', full: 'Now (09:42)', className: 'text-primary font-bold' },
];

export default function WellnessTrendChart({ data, feedback }) {
  return (
    <div className="min-[1400px]:col-span-8 bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md shadow-md border border-outline-variant/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="flex flex-col">
          <span className="text-xl text-on-surface font-semibold">120-Minute Wellness Trend (illustrative)</span>
          <span className="text-xs text-on-surface-variant">Illustrative curve for the selected simulated state. Not measured driver data.</span>
        </div>
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <span className="w-3 h-1 bg-primary-container rounded"></span>
            <span>Wellness Index</span>
          </div>
        </div>
      </div>

      <div className="w-full h-56 bg-surface-container-lowest/90 rounded-xl p-space-md relative overflow-hidden flex flex-col justify-between">
        <div className="absolute left-3 top-3 bottom-8 flex flex-col justify-between text-xs text-outline pointer-events-none">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
        </div>
        <div className="absolute inset-x-12 inset-y-4 flex flex-col justify-between pointer-events-none opacity-10">
          <div className="w-full h-px bg-on-surface"></div>
          <div className="w-full h-px bg-on-surface"></div>
          <div className="w-full h-px bg-on-surface"></div>
          <div className="w-full h-px bg-on-surface"></div>
        </div>
        <div className="pl-8 pr-2 w-full h-40 relative">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 160">
            <defs>
              <linearGradient id="wellnessGradNew" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.35"></stop>
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.0"></stop>
              </linearGradient>
            </defs>
            <path className="transition-all duration-700" d={data.chartArea} fill="url(#wellnessGradNew)"></path>
            <path className="transition-all duration-700" d={data.chartLine} fill="none" stroke="#00D4FF" strokeLinecap="round" strokeWidth="3"></path>
            <circle className="animate-ping" cx="600" cy="22" fill="#00D4FF" opacity="0.6" r="5"></circle>
            <circle cx="600" cy="22" fill="#00D4FF" r="4" stroke="#0F131B" strokeWidth="2"></circle>
          </svg>
        </div>
        {/* Clock times are hidden on small screens and in the narrow 3-column range (lg..xl) so the five tick labels do not run together. */}
        <div className="pl-8 pr-2 flex justify-between text-xs max-sm:text-[10px] text-on-surface-variant pt-2 whitespace-nowrap">
          {TICKS.map((t) => (
            <span key={t.short} className={t.className}>
              <span className="max-sm:hidden">{t.full}</span>
              <span className="hidden max-sm:inline">{t.short}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between max-sm:flex-wrap max-sm:gap-2 px-space-md py-2.5 rounded-xl bg-surface-container text-xs text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-tertiary" aria-hidden="true">insights</span>
          <span>{feedback}</span>
        </div>
        <span className="text-tertiary font-semibold uppercase">Sample values</span>
      </div>
    </div>
  );
}
