import { useState } from 'react';
import { driverStatesData } from '../data/driverStates';
import { useDriverState } from '../context/DriverStateContext';
import MetricCard from '../components/dashboard/MetricCard';
import DriverHeader from '../components/digital-twin/DriverHeader';
import DriverStateSelector from '../components/digital-twin/DriverStateSelector';
import DriverInferenceCard from '../components/digital-twin/DriverInferenceCard';
import DriverHologram from '../components/digital-twin/DriverHologram';
import WellnessTrendChart from '../components/digital-twin/WellnessTrendChart';
import ComfortInterventions from '../components/digital-twin/ComfortInterventions';
import StatusTag from '../components/common/StatusTag';

export default function DriverTwinPage() {
  // The selected state lives in the shared context so the top bar, Overview and this page stay in sync.
  const { driverState, setDriverState } = useDriverState();
  const [auditFeedback, setAuditFeedback] = useState(null);
  const selectedKey = driverState.toLowerCase();
  const data = driverStatesData[selectedKey];

  const handleStateChange = (key) => {
    setDriverState(key.charAt(0).toUpperCase() + key.slice(1));
  };

  const triggerAudit = () => {
    setAuditFeedback('Simulated response only. No sensors or cockpit actuators are connected.');
    setTimeout(() => setAuditFeedback(null), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      <DriverHeader />
      <DriverStateSelector selectedKey={selectedKey} onSelect={handleStateChange} />

      <div className="flex flex-wrap items-center gap-2 -mb-2">
        <h2 className="text-sm text-on-surface-variant uppercase tracking-wider font-semibold">Driver metrics</h2>
        <StatusTag kind="illustrative">sample values for the selected state</StatusTag>
      </div>

      {/* Main Gauges & Hologram View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        <div className="lg:col-span-6 min-[1400px]:col-span-3 flex flex-col gap-space-md">
          <DriverInferenceCard data={data} />
          <MetricCard
            icon="psychology"
            iconClass="text-primary-container"
            label="Cognitive State"
            chip={data.cognitiveChip}
            value={data.attentive}
            unit="Focus"
            rows={[
              { label: 'Reaction Time (Simulated)', value: data.reactionTime, valueClass: 'text-primary font-semibold' },
              { label: 'Mental Workload', value: data.workload, valueClass: 'text-on-surface font-medium' },
            ]}
          />
        </div>

        <DriverHologram data={data} />

        <div className="lg:col-span-6 min-[1400px]:col-span-3 flex flex-col gap-space-md">
          <MetricCard
            icon="ecg_heart"
            iconClass="text-error"
            label="Autonomic State"
            chip={data.stressChip}
            value={data.bpm}
            unit="BPM (Simulated)"
            rows={[
              { label: 'HRV (RMSSD)', value: data.hrv, valueClass: 'text-primary font-semibold' },
              { label: 'Stress Level Index', value: data.stress, valueClass: 'text-on-surface font-medium' },
            ]}
          />
          <MetricCard
            icon="bedtime"
            iconClass="text-primary"
            label="Eye Closure & Fatigue"
            chip={data.eyeChip}
            value={data.fatigue}
            unit="%"
            rows={[
              { label: 'PERCLOS Eye-Closure', value: data.perclos, valueClass: 'text-primary font-semibold' },
              { label: 'Steering Variability', value: data.headpose, valueClass: 'text-tertiary font-medium' },
            ]}
          />
        </div>
      </div>

      {/* Trend & Comfort Interventions */}
      <div className="grid grid-cols-1 min-[1400px]:grid-cols-12 gap-space-lg">
        <WellnessTrendChart data={data} feedback={auditFeedback || data.feedback} />
        <ComfortInterventions onTest={triggerAudit} />
      </div>
    </div>
  );
}
