import StatusTag from '../common/StatusTag';

export default function SurfaceGripCard({ current }) {
  return (
    <div className="flex flex-col justify-between p-space-md rounded-2xl bg-surface-container-low shadow-md">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">layers</span>
            <span className="text-xs text-on-surface font-semibold tracking-wide uppercase">Surface &amp; Grip Dynamics</span>
          </div>
          <StatusTag kind="illustrative" />
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-lowest flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">Dynamic Friction (μ)</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-on-surface">{current.friction}</span>
              <span className="text-xs text-on-surface-variant">/ 1.00μ</span>
            </div>
            <span className="text-xs text-primary font-medium">{current.surfaceType}</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-16 h-10 overflow-visible" viewBox="0 0 64 32">
              <path className="text-primary-container" d="M0,22 Q16,24 24,18 T48,15 T64,18" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
              <circle className="text-primary-container" cx="64" cy="18" fill="currentColor" r="3"></circle>
            </svg>
            <span className="text-[10px] text-on-surface-variant/80 mt-1">Stable Vector</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">Aquaplaning Risk Index</span>
            <span className="text-tertiary font-semibold">{current.aquaplaning}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">Surface Film Depth</span>
            <span className="text-on-surface font-semibold">{current.filmDepth}</span>
          </div>
        </div>
      </div>
      <div className="pt-space-md text-xs text-on-surface-variant">
        Sample wheel-slip offset: <span className="text-on-surface font-medium">±1.4%</span>
      </div>
    </div>
  );
}
