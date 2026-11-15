// Environment scenarios: SIMULATED sample inputs. No weather, traffic or road data source is connected.
//
// The Environmental Risk Score (ERS) is COMPUTED from the displayed inputs with the formula in the research draft
// (latest conference version, Eq. 2):
//     ERS = 0.30*W + 0.25*T + 0.25*R + 0.20*V        (each term scored 0-100)
//     W: weather score  Clear 0, Rain 45, Fog 65, Storm 90
//     R: road score     Dry 0, Wet 40, Icy 90
//     T: traffic score  100 * density, density in [0, 1]
//     V: visibility score  100 * (1 - v / 10) for v km, clipped to 0-10
// The paper says the ERS weights are DESIGN CHOICES (nothing is trained). The scores above are used unchanged.
//
// PAPER-DEFINED categories: weather Clear / Rain / Fog / Storm, road Dry / Wet / Icy. Nothing else is defined: the
// paper has no "drizzle", "heavy rain" or "snow" category. The scenario names on screen (Light Drizzle, Heavy Rain,
// Dense Fog, Clear Daylight) are PROTOTYPE INTERPRETATIONS, each mapped to one paper category by hand (see `inputs`).
//
// ILLUSTRATIVE values that are NOT inputs to the ERS: temperature, humidity, friction, precipitation rate, water-film
// depth, aquaplaning risk, corridor speed, visual-obstruction percentage. They are decorative sample values.

import { round1, snap, clamp } from '../utils/numeric';

export const ERS_WEIGHTS = { weather: 0.3, traffic: 0.25, road: 0.25, visibility: 0.2 };
export const WEATHER_SCORES = { Clear: 0, Rain: 45, Fog: 65, Storm: 90 };
export const ROAD_SCORES = { Dry: 0, Wet: 40, Icy: 90 };

// Table III of the paper: the visibility range (km) of each weather category in the paper's data generator.
// The sample scenarios below keep their visibility inside these ranges.
export const VISIBILITY_RANGE_KM = { Clear: [8, 10], Rain: [2, 8], Fog: [0.1, 1], Storm: [0.5, 3] };

export const MAPPING_DISCLOSURE =
  'Weather and road categories are prototype interpretations of each scenario name. The paper defines only Clear, Rain, Fog and Storm for weather and Dry, Wet and Icy for road.';
export const NON_INPUT_DISCLOSURE =
  'Temperature, humidity, friction, precipitation, water-film depth and aquaplaning values are illustrative and are not inputs to the ERS. The ERS uses weather, traffic density, road and visibility only.';

// `ers` is rounded to one decimal for DISPLAY. `ersExact` is the unrounded value used for rule thresholds.
export function computeErs({ weatherCategory, roadCategory, density, visibilityKm }) {
  const scores = {
    weather: WEATHER_SCORES[weatherCategory],
    road: ROAD_SCORES[roadCategory],
    traffic: 100 * density, // T = 100 x density
    visibility: 100 * (1 - clamp(visibilityKm, 0, 10) / 10),
  };
  const contributions = {
    weather: ERS_WEIGHTS.weather * scores.weather,
    traffic: ERS_WEIGHTS.traffic * scores.traffic,
    road: ERS_WEIGHTS.road * scores.road,
    visibility: ERS_WEIGHTS.visibility * scores.visibility,
  };
  const ersExact = snap(contributions.weather + contributions.traffic + contributions.road + contributions.visibility);
  return { scores, contributions, ersExact, ers: round1(ersExact) };
}

// Short status relative to the only two ERS thresholds in Table II of the draft (60 and 85). Takes the UNROUNDED ERS.
export function ersStatus(ersExact) {
  if (ersExact >= 85) return { short: 'ERS ≥ 85', long: 'At or above 85: the Emergency Alert rule matches (simulated)' };
  if (ersExact >= 60) return { short: 'ERS ≥ 60', long: 'At or above 60: the Slow Down rule matches (simulated)' };
  return { short: 'ERS < 60', long: 'Below 60: no ERS rule matches (simulated)' };
}

// Raw sample scenarios. `weatherCategory` / `roadCategory` map each scenario to the nearest paper category
// (Clear/Rain/Fog/Storm and Dry/Wet/Icy); the mapping is an interpretation made for this prototype, not a paper definition.
const RAW = {
  drizzle: {
    summary: 'Light Drizzle',
    inputs: { weatherCategory: 'Rain', roadCategory: 'Wet', density: 0.42, visibilityKm: 7.5 },
    temp: '14', frictionNum: 0.78, friction: '0.78', frictionLabel: 'Damp Asphalt State', surfaceType: 'Damp Dense Asphalt',
    aquaplaning: 'Low (12%)', filmDepth: '0.4 mm', trafficSpeed: '78', visLabel: 'Daylight Drizzle', visAttenuation: 'Minimal (3%)',
    precipRate: '1.2 mm / hour', rainMmH: 1.2, precipBar: '24%', humidity: '82%',
  },
  rain: {
    summary: 'Heavy Rainstorm',
    inputs: { weatherCategory: 'Storm', roadCategory: 'Wet', density: 0.56, visibilityKm: 2.8 },
    temp: '11', frictionNum: 0.58, friction: '0.58', frictionLabel: 'Hydro-Film Saturated', surfaceType: 'Water Saturated Asphalt',
    aquaplaning: 'Moderate-High (58%)', filmDepth: '2.1 mm', trafficSpeed: '62', visLabel: 'Heavy Rain / Spray', visAttenuation: 'Moderate (28%)',
    precipRate: '6.8 mm / hour', rainMmH: 6.8, precipBar: '72%', humidity: '96%',
  },
  fog: {
    summary: 'Dense Fog Bank',
    inputs: { weatherCategory: 'Fog', roadCategory: 'Wet', density: 0.38, visibilityKm: 0.8 },
    temp: '8', frictionNum: 0.82, friction: '0.82', frictionLabel: 'Cold Damp Surface', surfaceType: 'Micro-dew Asphalt',
    aquaplaning: 'Minimal (6%)', filmDepth: '0.1 mm', trafficSpeed: '54', visLabel: 'Dense Radiation Fog', visAttenuation: 'Severe (64%)',
    precipRate: '0.1 mm / hour', rainMmH: 0.1, precipBar: '8%', humidity: '99%',
  },
  clear: {
    summary: 'Clear Daylight',
    inputs: { weatherCategory: 'Clear', roadCategory: 'Dry', density: 0.31, visibilityKm: 9.5 },
    temp: '21', frictionNum: 0.92, friction: '0.92', frictionLabel: 'Dry High-Traction', surfaceType: 'Dry Standard Macadam',
    aquaplaning: 'Zero (0%)', filmDepth: '0.0 mm', trafficSpeed: '95', visLabel: 'Clear Atmosphere', visAttenuation: 'Zero (0%)',
    precipRate: '0.0 mm / hour', rainMmH: 0, precipBar: '0%', humidity: '42%',
  },
};

function build(key, raw) {
  const { scores, contributions, ers, ersExact } = computeErs(raw.inputs);
  const status = ersStatus(ersExact);
  const rule = raw.frictionNum < 0.8 && raw.rainMmH > 0.5;
  return {
    key,
    ...raw,
    scores,
    contributions,
    ers,
    ersExact,
    ersStatus: status.short,
    ersStatusLong: status.long,
    hudBarWidth: `${ers}%`,
    // gauge geometry: 270-degree arc, circumference 301.6 (matches the Stitch gauge)
    ersOffset: round1(301.6 - (ers / 100) * 226.2),
    trafficDensity: raw.inputs.density.toFixed(2),
    visibility: String(raw.inputs.visibilityKm),
    // illustrative hazard rule shown on the Environment screen (NOT part of the research methodology)
    illustrativeRuleMet: rule,
  };
}

export const weatherPresets = Object.fromEntries(Object.entries(RAW).map(([k, v]) => [k, build(k, v)]));

export const PRESET_OPTIONS = [
  { id: 'drizzle', label: 'Light Drizzle' },
  { id: 'rain', label: 'Heavy Rain' },
  { id: 'fog', label: 'Dense Fog' },
  { id: 'clear', label: 'Clear Daylight' },
];

export const DEFAULT_PRESET = 'drizzle';
