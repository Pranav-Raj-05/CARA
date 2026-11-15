import { useEffect, useRef, useState } from 'react';
import { subsystems } from '../data/vehicleData';
import VehicleHeader from '../components/vehicle/VehicleHeader';
import SpatialTwinCockpit from '../components/vehicle/SpatialTwinCockpit';
import SubsystemHealthCard from '../components/vehicle/SubsystemHealthCard';
import HealthTrendChart from '../components/vehicle/HealthTrendChart';
import DiagnosticStatus from '../components/vehicle/DiagnosticStatus';
import VehicleFooter from '../components/vehicle/VehicleFooter';
import StatusTag from '../components/common/StatusTag';

export default function VehicleTwinPage() {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  // Two independent actions, each with its own state:
  const [resyncing, setResyncing] = useState(false); // "Force Resync" button
  const [diagnosticRunning, setDiagnosticRunning] = useState(false); // "Run Diagnostic" button
  const [diagComplete, setDiagComplete] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  // Frontend simulation only: no backend / model call.
  const runResync = () => {
    setResyncing(true);
    later(() => setResyncing(false), 1500);
  };

  const runDiagnostic = () => {
    setDiagnosticRunning(true);
    setDiagComplete(false);
    later(() => {
      setDiagnosticRunning(false);
      setDiagComplete(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[350px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-96 right-0 w-[500px] h-[300px] bg-secondary-container/15 rounded-full blur-[120px] pointer-events-none"></div>

        <VehicleHeader resyncing={resyncing} onResync={runResync} />
        <SpatialTwinCockpit selectedHotspot={selectedHotspot} onSelect={setSelectedHotspot} />

        {/* Subsystem Health Cards */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="text-sm text-on-surface-variant uppercase tracking-wider font-semibold">Subsystem health</h2>
          <StatusTag kind="illustrative">sample values, VHS computed from them</StatusTag>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-4 gap-6 mb-8">
          {subsystems.map((s) => (
            <SubsystemHealthCard key={s.id} {...s} />
          ))}
        </section>

        {/* Trend svg and Diagnostic status */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          <HealthTrendChart />
          <DiagnosticStatus running={diagnosticRunning} complete={diagComplete} onRun={runDiagnostic} />
        </section>

        <VehicleFooter />
      </div>
    </div>
  );
}
