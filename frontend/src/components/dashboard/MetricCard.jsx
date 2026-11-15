// Metric card used on the Driver Twin screen: title + chip, headline value, two detail rows.
export default function MetricCard({ icon, iconClass, label, chip, value, unit, rows }) {
  return (
    <div className="flex-1 bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between shadow-md border border-outline-variant/20">
      <div className="flex items-center justify-between max-[1399px]:flex-wrap max-[1399px]:gap-x-2 max-[1399px]:gap-y-1">
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined text-[18px] ${iconClass}`} aria-hidden="true">{icon}</span>
          <span className="text-xs uppercase tracking-wider text-on-surface-variant">{label}</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary text-xs font-semibold">{chip}</span>
      </div>
      <div className="flex items-baseline gap-2 my-2">
        <span className="text-4xl text-on-surface font-bold leading-none">{value}</span>
        <span className="text-sm text-on-surface-variant">{unit}</span>
      </div>
      <div className="space-y-2 pt-2 border-t border-outline-variant/20">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between max-[1399px]:gap-2 text-xs">
            <span className="text-on-surface-variant">{row.label}</span>
            <span className={`${row.valueClass} max-[1399px]:text-right`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
