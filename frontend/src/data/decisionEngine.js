// Static content for the Decision Engine screen (frontend simulation).
import { BASELINE_COMPONENTS } from './vehicleHealth';
import { weatherPresets, computeErs } from './environmentPresets';

export const DRIVER_STATE_OPTIONS = ['Normal', 'Happy', 'Tired', 'Angry', 'Stressed'];

// What-if scenarios. EVERY scenario's ERS is computed by the same computeErs() formula (Eq. 2 of the draft) from the
// inputs listed in `inputs`; there is no hard-coded or overridden score.
//   - Dry / Damp / Torrential reuse the Environment Twin sample inputs of Clear Daylight / Light Drizzle / Heavy Rain.
//   - "Icy Storm" is the scenario that exercises the "ERS >= 85" rule: Storm (90), Icy road (90), traffic density 0.80,
//     visibility 2 km gives ERS 85.5 through the normal formula.
// The weather / road categories of each scenario are prototype interpretations; the paper defines only Clear, Rain,
// Fog, Storm and Dry, Wet, Icy. Friction is an illustrative value and is NOT an input to the ERS.
const fromEnvironment = (name, key) => {
  const p = weatherPresets[key];
  return { name, key, friction: p.friction, inputs: p.inputs, scores: p.scores, ers: p.ers, ersExact: p.ersExact };
};

const ICY_STORM_INPUTS = { weatherCategory: 'Storm', roadCategory: 'Icy', density: 0.8, visibilityKm: 2 };
const icy = computeErs(ICY_STORM_INPUTS);

export const WEATHER_PRESETS = [
  fromEnvironment('Dry', 'clear'),
  fromEnvironment('Damp / Drizzle', 'drizzle'),
  fromEnvironment('Torrential', 'rain'),
  { name: 'Icy Storm', key: 'icy', friction: '0.18', inputs: ICY_STORM_INPUTS, scores: icy.scores, ers: icy.ers, ersExact: icy.ersExact },
];

export const BASELINE = {
  components: { ...BASELINE_COMPONENTS },
  driverState: 'Normal',
  weather: 'Damp / Drizzle',
};

// Rule order and conditions from Table II of the research draft (highest priority first).
export const PRIORITY_TIERS = [
  { p: 1, label: 'P1', name: 'Emergency Alert', desc: '(Brake < 30 or engine < 25) and (driver Tired, Angry or Stressed, or ERS ≥ 60); or ERS ≥ 85', color: 'text-error' },
  { p: 2, label: 'P2', name: 'Take Rest', desc: 'Driver state is Tired', color: 'text-on-error-container' },
  { p: 3, label: 'P3', name: 'Slow Down', desc: 'ERS ≥ 60, or driver state is Angry or Stressed', color: 'text-primary' },
  { p: 4, label: 'P4', name: 'Vehicle Service', desc: 'VHS < 60, or any component health < 40', color: 'text-secondary' },
  { p: 5, label: 'P5', name: 'Safe Driving', desc: 'None of the above', color: 'text-tertiary' },
];
