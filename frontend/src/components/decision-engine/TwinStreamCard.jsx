// One twin stream tile inside the aggregation panel (vehicle / driver / environment).
export default function TwinStreamCard({
  className = '',
  borderClass,
  accentClass,
  dotClass,
  icon,
  title,
  primary,
  secondary,
  flowText,
  flowClass,
}) {
  return (
    <div
      className={`${className} p-space-md rounded-xl bg-surface-container-low/85 backdrop-blur-xl border ${borderClass} shadow-2xl flex flex-col gap-2 transition-transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 ${accentClass}`}>
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{icon}</span>
          <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
        </div>
        <span className={`h-2 w-2 rounded-full ${dotClass}`}></span>
      </div>
      <div className="flex items-baseline justify-between max-[1399px]:gap-2 pt-1">
        <span className="text-xs text-on-surface-variant font-medium">{primary.label}</span>
        <span className={`text-base ${primary.valueClass} font-semibold`}>{primary.value}</span>
      </div>
      <div className="flex items-baseline justify-between max-[1399px]:gap-2 text-xs text-on-surface-variant">
        <span>{secondary.label}</span>
        <span className={`${secondary.valueClass} max-[1399px]:text-right`}>{secondary.value}</span>
      </div>
      <div className={`text-[11px] ${flowClass} font-mono tracking-wider pt-1 flex items-center gap-1`}>
        <span>{flowText}</span>
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_forward</span>
      </div>
    </div>
  );
}
