// Headline KPI tile (label, big value, optional unit or delta).
export default function KpiTile({ label, value, valueClass, unit, unitClass, delta }) {
  return (
    <div className="flex flex-col bg-surface-container-low/70 backdrop-blur-md px-5 py-4 rounded-2xl">
      <span className="text-xs text-on-surface-variant uppercase tracking-wider">{label}</span>
      <div className="flex flex-wrap items-baseline gap-x-2 mt-1">
        <span className={`text-3xl ${valueClass} font-bold`}>{value}</span>
        {unit && <span className={`text-xs ${unitClass}`}>{unit}</span>}
        {delta && (
          <span className="text-xs text-tertiary flex items-center">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_upward</span>{delta}
          </span>
        )}
      </div>
    </div>
  );
}
