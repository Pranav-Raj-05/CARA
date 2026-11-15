import { BASELINE_VHS } from '../../data/vehicleHealth';
import evHero from '../../assets/illustrations/ev-hero.svg';

export default function VehicleHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-container-low border border-white/10 shadow-2xl min-h-[380px] flex flex-col justify-between p-space-lg lg:p-space-xl">
      <div className="absolute inset-0 z-0">
        <img
          alt="CARA Demo EV (illustration)"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-105 scale-100 transition-transform duration-1000"
          src={evHero}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/40 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 border border-white/10 backdrop-blur-md text-primary text-xs uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true"></span>
            PROTOTYPE • SIMULATED DATA
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/60 border border-white/10 backdrop-blur-md text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">info</span> Static sample values
          </span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/70 border border-white/10 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,212,255,0.8)]" aria-hidden="true"></span>
          <span className="text-primary font-semibold tracking-wider uppercase text-[12px]">SIMULATION MODE | SYNTHETIC DATA</span>
        </div>
      </div>

      <div className="relative z-10 pt-16 flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">Electric AWD Platform</span>
            <span className="text-outline text-xs">•</span>
            <span className="text-xs text-on-surface-variant">Cockpit v4.2</span>
          </div>
          <h1 className="text-3xl lg:text-5xl text-on-surface font-bold tracking-tight">CARA Demo EV</h1>
          <p className="text-on-surface-variant max-w-xl text-[15px]">
            Illustrative sample values for a simulated vehicle, driver and environment twin. No live stream, trained model or backend is connected.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 backdrop-blur-xl bg-surface-container-lowest/80 p-3 rounded-2xl border border-white/10 shadow-xl">
          <div className="px-5 py-2.5 flex flex-col border-r border-white/10 pr-6">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">Speed</span>
            <span className="text-2xl lg:text-3xl text-on-surface font-bold tracking-tight mt-0.5">84 <span className="text-xs text-on-surface-variant font-normal">km/h</span></span>
          </div>
          <div className="px-5 py-2.5 flex flex-col border-r border-white/10 pr-6">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">Range</span>
            <span className="text-2xl lg:text-3xl text-primary-container font-bold tracking-tight mt-0.5">442 <span className="text-xs text-on-surface-variant font-normal">km</span></span>
          </div>
          <div className="px-5 py-2.5 flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">VHS</span>
            <span className="text-2xl lg:text-3xl text-tertiary font-bold tracking-tight mt-0.5">{BASELINE_VHS.toFixed(1)}<span className="text-xs text-on-surface-variant font-normal">%</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
