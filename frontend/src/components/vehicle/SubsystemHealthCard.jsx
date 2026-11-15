export default function SubsystemHealthCard({ icon, iconBox, title, subtitle, soh, metrics, footer }) {
  return (
    <div className="flex flex-col justify-between bg-surface-container-low/80 backdrop-blur-md rounded-2xl p-6 border border-surface-container-high/40 hover:border-primary/40 transition-all shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between max-[1399px]:flex-wrap max-[1399px]:gap-2">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${iconBox}`}>
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">{icon}</span>
            </div>
            <div>
              <h2 className="text-on-surface font-semibold text-sm">{title}</h2>
              <span className="text-xs text-on-surface-variant">{subtitle}</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary text-xs font-bold">{soh}</span>
        </div>
        <div className="space-y-3 pt-2">
          {metrics.map((m) => (
            <div key={m.label} className="flex justify-between items-baseline">
              <span className="text-xs text-on-surface-variant uppercase">{m.label}</span>
              <span className={`${m.size === 'base' ? 'text-base' : 'text-sm'} ${m.valueClass} font-medium`}>
                {m.value}
                {m.unit && (
                  <>
                    {' '}
                    <span className="text-xs text-on-surface-variant">{m.unit}</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-between">
        <span className="text-xs text-on-surface-variant">{footer.label}</span>
        <span className={`text-xs ${footer.valueClass} font-medium`}>{footer.value}</span>
      </div>
    </div>
  );
}
