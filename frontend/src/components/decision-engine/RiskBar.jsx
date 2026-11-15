// Labelled horizontal bar for a single contributing risk factor.
export default function RiskBar({ label, valueText, valueClass, percent, barClass }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span className="text-on-surface">{label}</span>
        <span className={`font-mono ${valueClass} font-semibold`}>{valueText}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
        <div className={`h-full transition-all duration-300 ${barClass}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
