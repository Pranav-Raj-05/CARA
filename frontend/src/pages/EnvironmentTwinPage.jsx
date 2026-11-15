import { useEnvironmentState } from '../context/EnvironmentStateContext';
import EnvironmentBanner from '../components/environment/EnvironmentBanner';
import SpatialMapSection from '../components/environment/SpatialMapSection';
import ErsGaugeCard from '../components/environment/ErsGaugeCard';
import AtmosphericCard from '../components/environment/AtmosphericCard';
import SurfaceGripCard from '../components/environment/SurfaceGripCard';
import TrafficOpticalCard from '../components/environment/TrafficOpticalCard';
import DecisionInfluenceSection from '../components/environment/DecisionInfluenceSection';

export default function EnvironmentTwinPage() {
  // The selected scenario is shared with the Overview (see EnvironmentStateContext), so the two never disagree.
  const { presetKey, setPresetKey, preset: current } = useEnvironmentState();

  return (
    <div className="flex flex-col w-full gap-space-lg">
      <EnvironmentBanner presetKey={presetKey} onSelect={setPresetKey} />
      <SpatialMapSection current={current} />

      {/* 4 Bento Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-4 gap-space-md">
        <ErsGaugeCard current={current} />
        <AtmosphericCard current={current} />
        <SurfaceGripCard current={current} />
        <TrafficOpticalCard current={current} />
      </section>

      <DecisionInfluenceSection current={current} />
    </div>
  );
}
