import { useState } from 'react';
import { BASELINE, WEATHER_PRESETS } from '../data/decisionEngine';
import { COMPONENT_KEYS } from '../data/vehicleHealth';
import { evaluateDecision } from '../utils/decisionRules';
import DecisionHeader from '../components/decision-engine/DecisionHeader';
import TwinAggregationPanel from '../components/decision-engine/TwinAggregationPanel';
import MasterRecommendationCard from '../components/decision-engine/MasterRecommendationCard';
import ScenarioSandbox from '../components/decision-engine/ScenarioSandbox';
import DecisionPreview from '../components/decision-engine/DecisionPreview';
import XaiAttribution from '../components/decision-engine/XaiAttribution';
import PriorityHierarchyRail from '../components/decision-engine/PriorityHierarchyRail';

// This screen keeps its OWN what-if state on purpose: it is independent of the global Driver Twin and Environment
// Twin selections, so scenarios can be tested without changing those screens.
export default function DecisionEnginePage() {
  const [components, setComponents] = useState({ ...BASELINE.components });
  const [driverState, setDriverState] = useState(BASELINE.driverState);
  const [weather, setWeather] = useState(BASELINE.weather);
  const [alertSimulated, setAlertSimulated] = useState(false);

  // The scenario's ERS is always computed from its listed inputs (see data/decisionEngine.js); nothing is overridden.
  const scenario = WEATHER_PRESETS.find((w) => w.name === weather) ?? WEATHER_PRESETS[1];
  const ers = scenario.ers; // rounded, display only
  const friction = `${scenario.friction}μ`; // illustrative, not an ERS input

  // Frontend simulation of the Table II rules (see utils/decisionRules.js). Thresholds see the UNROUNDED ERS.
  const decision = evaluateDecision({ components, driverState, ers: scenario.ersExact });

  const setComponent = (key, value) => setComponents((c) => ({ ...c, [key]: value }));
  const setAllComponents = (value) => setComponents(Object.fromEntries(COMPONENT_KEYS.map((k) => [k, value])));

  const selectWeather = (preset) => setWeather(preset.name);

  const resetBaseline = () => {
    setComponents({ ...BASELINE.components });
    setDriverState(BASELINE.driverState);
    setWeather(BASELINE.weather);
  };

  const simulateAlert = () => {
    setAlertSimulated(true);
    setTimeout(() => setAlertSimulated(false), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-space-xl max-w-7xl mx-auto pb-12">
      <DecisionHeader />
      <TwinAggregationPanel
        components={components}
        vhs={decision.vhs}
        driverState={driverState}
        ers={ers}
        weather={weather}
        scenario={scenario}
      />
      <MasterRecommendationCard
        decision={decision}
        inputs={{ components, driverState, ers: decision.ersDisplay }}
        alertSimulated={alertSimulated}
        onSimulateAlert={simulateAlert}
      />

      {/* Sandbox Controls */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        <ScenarioSandbox
          components={components}
          vhs={decision.vhs}
          onComponentChange={setComponent}
          onAllComponentsChange={setAllComponents}
          driverState={driverState}
          onDriverStateChange={setDriverState}
          weather={weather}
          scenario={scenario}
          friction={friction}
          ers={ers}
          onWeatherSelect={selectWeather}
          onReset={resetBaseline}
        />
        <DecisionPreview decision={decision} driverState={driverState} weather={weather} ers={ers} />
      </section>

      {/* Attribution & Hierarchy */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        <XaiAttribution decision={decision} driverState={driverState} weather={weather} ers={ers} />
        <PriorityHierarchyRail activePriority={decision.priority} />
      </section>
    </div>
  );
}
