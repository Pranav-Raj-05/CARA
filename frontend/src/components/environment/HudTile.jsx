// Floating telemetry tile on the environment map (title + icon, big value, extra lines as children).
export default function HudTile({ label, icon, iconClass, value, unit, children }) {
  return (
    <div className="p-space-md rounded-xl bg-surface-container-low/90 backdrop-blur-xl shadow-md flex flex-col gap-1">
      <div className="flex items-center justify-between text-on-surface-variant">
        <span className="text-xs uppercase tracking-wider">{label}</span>
        <span className={`material-symbols-outlined text-[16px] ${iconClass}`} aria-hidden="true">{icon}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-on-surface">{value}</span>
        <span className="text-xs text-on-surface-variant">{unit}</span>
      </div>
      {children}
    </div>
  );
}
