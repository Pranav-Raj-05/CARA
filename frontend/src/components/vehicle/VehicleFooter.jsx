export default function VehicleFooter() {
  return (
    <footer className="flex items-center justify-between bg-surface-container-lowest/60 rounded-xl px-6 py-4 text-on-surface-variant text-xs border border-surface-container-high/30">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[18px]" aria-hidden="true">info</span>
        <span>Illustrative sample data • no CAN stream or trained model attached</span>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        <span>Frontend prototype • no vehicle hardware connected</span>
      </div>
    </footer>
  );
}
