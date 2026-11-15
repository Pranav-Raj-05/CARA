// Unit tests for the Table II simulation, the VHS / ERS formulas and the scenario data.
// Run with:  node tests/run-unit.mjs   (bundles src with the esbuild that ships with Vite; installs nothing)
import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateDecision, TABLE_II } from '../src/utils/decisionRules.js';
import { computeVHS, computeVHSExact, BASELINE_COMPONENTS } from '../src/data/vehicleHealth.js';
import { computeErs, weatherPresets, VISIBILITY_RANGE_KM, WEATHER_SCORES, ROAD_SCORES, ERS_WEIGHTS } from '../src/data/environmentPresets.js';
import { WEATHER_PRESETS } from '../src/data/decisionEngine.js';

const ALL = (v) => ({ battery: v, brakes: v, engine: v, tires: v });
const HEALTHY = BASELINE_COMPONENTS;
const P = (o) => evaluateDecision({ components: HEALTHY, driverState: 'Normal', ers: 10, ...o }).priority;

test('Table II thresholds are the paper values', () => {
  assert.deepEqual(TABLE_II, { brakeCritical: 30, engineCritical: 25, componentService: 40, vhsService: 60, ersSlowDown: 60, ersEmergency: 85 });
});

test('boundary: ERS 60 (Slow Down)', () => {
  assert.equal(P({ ers: 59.99 }), 5);
  assert.equal(P({ ers: 60 }), 3);
  assert.equal(P({ ers: 60.01 }), 3);
});

test('boundary: ERS 85 (Emergency)', () => {
  assert.equal(P({ ers: 84.99 }), 3);
  assert.equal(P({ ers: 85 }), 1);
});

test('rounding must not move a value across a threshold (unrounded comparison)', () => {
  assert.equal(P({ ers: 59.96 }), 5, 'ERS 59.96 displays as 60.0 but is below 60');
  assert.equal(P({ ers: 84.96 }), 3, 'ERS 84.96 displays as 85.0 but is below 85');
  const d = evaluateDecision({ components: HEALTHY, driverState: 'Normal', ers: 59.96 });
  assert.equal(d.ersDisplay, 60);
});

test('boundary: VHS 60 (Vehicle Service)', () => {
  const at = (v) => evaluateDecision({ components: ALL(v), driverState: 'Normal', ers: 10 });
  assert.equal(at(60).vhsExact, 60);
  assert.equal(at(60).priority, 5, 'VHS exactly 60 is not < 60');
  assert.equal(at(59.99).priority, 4);
  const d = at(59.96);
  assert.equal(d.vhs, 60, 'display rounds to 60.0');
  assert.equal(d.priority, 4, 'but the unrounded 59.96 is below 60');
  assert.match(d.because, /59\.96/);
});

test('boundary: component health 40', () => {
  const c = (battery) => ({ ...HEALTHY, battery });
  assert.ok(computeVHSExact(c(40)) >= 60, 'test precondition: VHS stays above 60');
  const at = (battery) => evaluateDecision({ components: c(battery), driverState: 'Normal', ers: 10 }).priority;
  assert.equal(at(40), 5);
  assert.equal(at(39.99), 4);
});

test('boundary: brake health 30 (critical)', () => {
  const at = (brakes, driverState, ers = 10) => evaluateDecision({ components: { ...HEALTHY, brakes }, driverState, ers }).priority;
  assert.equal(at(30, 'Tired'), 2, 'brake 30 is not < 30: no emergency; Tired -> Take Rest');
  assert.equal(at(29.99, 'Tired'), 1);
  assert.equal(at(29.99, 'Angry'), 1);
  assert.equal(at(29.99, 'Stressed'), 1);
  assert.equal(at(29.99, 'Normal', 59.99), 4, 'critical brake, calm driver, ERS < 60: service only');
  assert.equal(at(29.99, 'Normal', 60), 1, 'critical brake and ERS >= 60');
  assert.equal(at(30, 'Normal', 60), 3);
  assert.equal(at(30, 'Normal', 10), 4, 'brake 30 is < 40');
});

test('boundary: engine health 25 (critical)', () => {
  const at = (engine, driverState, ers = 10) => evaluateDecision({ components: { ...HEALTHY, engine }, driverState, ers }).priority;
  assert.equal(at(25, 'Tired'), 2);
  assert.equal(at(24.99, 'Tired'), 1);
  assert.equal(at(24.99, 'Normal', 59.99), 4);
  assert.equal(at(24.99, 'Normal', 60), 1);
  assert.equal(at(25, 'Normal', 60), 3);
});

test('priority order: first matching rule wins', () => {
  const low = { ...HEALTHY, battery: 10 };
  assert.equal(evaluateDecision({ components: low, driverState: 'Tired', ers: 70 }).priority, 2, 'Tired beats Slow Down and Service');
  assert.equal(evaluateDecision({ components: low, driverState: 'Angry', ers: 10 }).priority, 3, 'Angry beats Service');
  assert.equal(evaluateDecision({ components: low, driverState: 'Normal', ers: 10 }).priority, 4);
  assert.equal(evaluateDecision({ components: HEALTHY, driverState: 'Tired', ers: 90 }).priority, 1, 'ERS >= 85 beats Tired');
  assert.equal(evaluateDecision({ components: HEALTHY, driverState: 'Happy', ers: 10 }).priority, 5);
});

test('illustrative composite never changes the selection', () => {
  const a = evaluateDecision({ components: HEALTHY, driverState: 'Normal', ers: 59.9 });
  assert.equal(a.priority, 5);
  const b = evaluateDecision({ components: ALL(60), driverState: 'Happy', ers: 59.9 });
  assert.equal(b.priority, 5);
  assert.ok(a.netRisk !== b.netRisk, 'composite differs while the selection is the same');
});

test('VHS formula: weights 0.25 / 0.30 / 0.25 / 0.20', () => {
  assert.equal(computeVHS(BASELINE_COMPONENTS), 94.3);
  assert.equal(computeVHSExact({ battery: 100, brakes: 0, engine: 0, tires: 0 }), 25);
  assert.equal(computeVHSExact({ battery: 0, brakes: 100, engine: 0, tires: 0 }), 30);
  assert.equal(computeVHSExact({ battery: 0, brakes: 0, engine: 100, tires: 0 }), 25);
  assert.equal(computeVHSExact({ battery: 0, brakes: 0, engine: 0, tires: 100 }), 20);
});

test('ERS formula: weights 0.30 / 0.25 / 0.25 / 0.20 and the paper scores', () => {
  assert.deepEqual(ERS_WEIGHTS, { weather: 0.3, traffic: 0.25, road: 0.25, visibility: 0.2 });
  assert.deepEqual(WEATHER_SCORES, { Clear: 0, Rain: 45, Fog: 65, Storm: 90 });
  assert.deepEqual(ROAD_SCORES, { Dry: 0, Wet: 40, Icy: 90 });
  const e = (W, d, R, v) => 0.3 * W + 0.25 * (100 * d) + 0.25 * R + 0.2 * (100 * (1 - Math.min(10, Math.max(0, v)) / 10));
  const r = computeErs({ weatherCategory: 'Storm', roadCategory: 'Icy', density: 0.8, visibilityKm: 2 });
  assert.ok(Math.abs(r.ersExact - e(90, 0.8, 90, 2)) < 1e-9);
  assert.equal(r.ersExact, 85.5);
  assert.equal(computeErs({ weatherCategory: 'Clear', roadCategory: 'Dry', density: 0, visibilityKm: 25 }).ersExact, 0, 'visibility clipped to 10 km');
  assert.equal(computeErs({ weatherCategory: 'Storm', roadCategory: 'Icy', density: 1, visibilityKm: 0 }).ersExact, 94.5, 'maximum ERS');
});

test('an exact ERS of 60 computed from inputs triggers Slow Down (no floating-point miss)', () => {
  // Storm 27 + density 0.52 -> 13 + Wet 10 + visibility 5 km -> 10 = 60
  const r = computeErs({ weatherCategory: 'Storm', roadCategory: 'Wet', density: 0.52, visibilityKm: 5 });
  assert.equal(r.ersExact, 60);
  assert.equal(evaluateDecision({ components: HEALTHY, driverState: 'Normal', ers: r.ersExact }).priority, 3);
});

test('every Environment Twin scenario is reproducible from its displayed inputs and uses paper-range visibility', () => {
  const expected = { drizzle: 39, rain: 65.4, fog: 57.4, clear: 8.8 };
  for (const [k, p] of Object.entries(weatherPresets)) {
    const i = p.inputs;
    const hand = 0.3 * WEATHER_SCORES[i.weatherCategory] + 0.25 * 100 * i.density + 0.25 * ROAD_SCORES[i.roadCategory] + 0.2 * 100 * (1 - i.visibilityKm / 10);
    assert.ok(Math.abs(p.ersExact - hand) < 1e-9, `${k}: ${p.ersExact} vs ${hand}`);
    assert.equal(p.ers, expected[k], k);
    const [lo, hi] = VISIBILITY_RANGE_KM[i.weatherCategory];
    assert.ok(i.visibilityKm >= lo && i.visibilityKm <= hi, `${k}: visibility ${i.visibilityKm} km outside Table III range ${lo}-${hi} for ${i.weatherCategory}`);
    assert.ok(i.density >= 0 && i.density <= 1);
  }
});

test('Decision Engine scenarios: every ERS is computed (no override); Icy Storm = Storm + Icy + 0.80 + 2 km = 85.5', () => {
  for (const w of WEATHER_PRESETS) {
    const r = computeErs(w.inputs);
    assert.equal(w.ersExact, r.ersExact, `${w.name} must equal computeErs(inputs)`);
    assert.equal(w.computed, undefined, 'no computed:false override flag may exist');
    const [lo, hi] = VISIBILITY_RANGE_KM[w.inputs.weatherCategory];
    assert.ok(w.inputs.visibilityKm >= lo && w.inputs.visibilityKm <= hi, `${w.name} visibility range`);
  }
  const icy = WEATHER_PRESETS.find((w) => w.name === 'Icy Storm');
  assert.deepEqual(icy.inputs, { weatherCategory: 'Storm', roadCategory: 'Icy', density: 0.8, visibilityKm: 2 });
  assert.equal(icy.ersExact, 85.5);
  assert.equal(evaluateDecision({ components: HEALTHY, driverState: 'Normal', ers: icy.ersExact }).priority, 1);
});

test('scenario outcomes: Heavy Rain (Storm + Wet) -> Slow Down; Fog, Drizzle, Clear -> no ERS rule', () => {
  assert.equal(P({ ers: weatherPresets.rain.ersExact }), 3, '65.4 >= 60');
  assert.equal(P({ ers: weatherPresets.fog.ersExact }), 5, '57.4 < 60');
  assert.equal(P({ ers: weatherPresets.drizzle.ersExact }), 5);
  assert.equal(P({ ers: weatherPresets.clear.ersExact }), 5);
});
