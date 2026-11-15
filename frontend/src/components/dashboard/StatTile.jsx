// Small label/value tile used inside twin summary cards.
export default function StatTile({ label, children }) {
  return (
    <div className="p-2 rounded-xl bg-surface-container-lowest/40 border border-white/5 flex flex-col">
      <span className="text-on-surface-variant text-[10px] uppercase">{label}</span>
      <span className="font-semibold mt-0.5 text-on-surface">{children}</span>
    </div>
  );
}
