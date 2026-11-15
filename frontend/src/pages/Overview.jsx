import { useState } from 'react';
import VehicleHero from '../components/overview/VehicleHero';
import VehicleTwinCard from '../components/overview/VehicleTwinCard';
import DriverTwinCard from '../components/overview/DriverTwinCard';
import EnvironmentTwinCard from '../components/overview/EnvironmentTwinCard';
import DecisionSynthesisCard from '../components/overview/DecisionSynthesisCard';
import { useDriverState } from '../context/DriverStateContext';
import { useEnvironmentState } from '../context/EnvironmentStateContext';
import { BASELINE_COMPONENTS } from '../data/vehicleHealth';
import { evaluateDecision } from '../utils/decisionRules';

export default function Overview() {
  // Driver state and environment scenario are shared with the Driver Twin / Environment Twin screens and the top bar.
  const { driverState, setDriverState } = useDriverState();
  const { preset } = useEnvironmentState();
  const [advisorySent, setAdvisorySent] = useState(false);

  // Same Table II simulation as the Decision Engine screen, fed with the shared state and the sample vehicle values.
  const decision = evaluateDecision({ components: BASELINE_COMPONENTS, driverState, ers: preset.ersExact });

  const handleSimulateAlert = () => {
    setAdvisorySent(true);
    setTimeout(() => setAdvisorySent(false), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-space-xl max-w-7xl mx-auto pb-12">
      <VehicleHero />

      {/* 3 Digital Twin Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-3 gap-space-lg">
        <VehicleTwinCard />
        <DriverTwinCard driverState={driverState} setDriverState={setDriverState} />
        <EnvironmentTwinCard preset={preset} />
      </div>

      <DecisionSynthesisCard
        decision={decision}
        inputs={{ components: BASELINE_COMPONENTS, driverState, preset }}
        advisorySent={advisorySent}
        onSimulateAlert={handleSimulateAlert}
      />
    </div>
  );
}
