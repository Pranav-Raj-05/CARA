// Vehicle component health: ILLUSTRATIVE sample inputs, and the Vehicle Health Score (VHS) formula from the
// research draft (latest conference version, Eq. 1): VHS = sum(w_i * H_i) over battery, brakes, engine and tires.
// The weights w = 0.25, 0.30, 0.25, 0.20 (battery, brakes, engine, tires) are SPECIFIED in the paper. (The paper calls
// the ERS weights, and the decision thresholds, design choices; it does not say that about these VHS weights.)
// Nothing is trained.
//
// No vehicle model is connected: the component values below are hardcoded sample inputs. The VHS shown anywhere
// in the UI is computed from these inputs (never typed in by hand), so the displayed numbers are always consistent.
//
// computeVHSExact is the UNROUNDED value (used by the decision rules). computeVHS is rounded to one decimal and is for
// display only.

import { round1, snap } from '../utils/numeric';

export const VHS_WEIGHTS = { battery: 0.25, brakes: 0.3, engine: 0.25, tires: 0.2 };

export const COMPONENT_KEYS = ['battery', 'brakes', 'engine', 'tires'];

export const COMPONENT_LABELS = {
  battery: 'Battery',
  brakes: 'Brakes',
  engine: 'Engine / Powertrain',
  tires: 'Tires & Chassis',
};

// Illustrative sample component health (0-100).
export const BASELINE_COMPONENTS = { battery: 94, brakes: 91, engine: 98, tires: 95 };

export function computeVHSExact(components) {
  return snap(COMPONENT_KEYS.reduce((sum, k) => sum + VHS_WEIGHTS[k] * components[k], 0));
}

export function computeVHS(components) {
  return round1(computeVHSExact(components));
}

export const BASELINE_VHS = computeVHS(BASELINE_COMPONENTS); // 94.3
