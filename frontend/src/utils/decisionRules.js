// FRONTEND SIMULATION of the documented decision rules. NOT a validated or certified safety system.
//
// The rules below are Table II of the research draft (latest conference version), "Decision rules, highest
// priority first". The thresholds are used exactly as written there; none are invented or adjusted here. The
// draft itself says the thresholds "are design choices of the prototype and have not been validated against real
// driving". The first matching rule wins; if none matches the recommendation is Safe Driving.
//
// There is no backend, trained model or live telemetry behind this: the inputs are what-if values chosen on screen.
//
// The weighted "composite" at the bottom (driver 0.40, environment 0.35, vehicle 0.25) is an ILLUSTRATIVE
// PLACEHOLDER kept from the Stitch design. It is not calibrated, it is not part of the research methodology and it
// plays NO part in which recommendation is selected.

import { computeVHSExact, COMPONENT_KEYS, COMPONENT_LABELS } from '../data/vehicleHealth';
import { round1, snap, showNear } from './numeric';

export const TABLE_II = {
  brakeCritical: 30, // brake health < 30
  engineCritical: 25, // engine health < 25
  componentService: 40, // any component health < 40
  vhsService: 60, // VHS < 60
  ersSlowDown: 60, // ERS >= 60
  ersEmergency: 85, // ERS >= 85
};

// Exact condition text of each Table II row (used for display).
export const RULE_TEXT = {
  1: '(Brake health < 30 or engine health < 25) and (driver Tired, Angry, or Stressed, or ERS ≥ 60); or ERS ≥ 85',
  2: 'Driver state is Tired',
  3: 'ERS ≥ 60, or driver state is Angry or Stressed',
  4: 'VHS < 60, or any component health < 40',
  5: 'None of the above',
};

export const PRIORITY_NAMES = { 1: 'Emergency Alert', 2: 'Take Rest', 3: 'Slow Down', 4: 'Vehicle Service', 5: 'Safe Driving' };

const PRIORITY_CLASS = {
  1: 'bg-error text-on-error',
  2: 'bg-surface-container-highest text-error font-semibold',
  3: 'bg-surface-container-highest text-primary font-semibold',
  4: 'bg-surface-container-highest text-secondary font-semibold',
  5: 'bg-surface-container-highest text-tertiary',
};

// Badge styling per outcome (palette colours only).
const BADGE_CLASS = {
  1: 'bg-error text-on-error',
  2: 'bg-error-container text-on-error-container',
  3: 'bg-primary-container text-on-primary-container',
  4: 'bg-secondary-container text-on-secondary-container',
  5: 'bg-tertiary text-on-tertiary shadow-[0_0_12px_rgba(106,247,186,0.5)]',
};

// What the prototype shows for each outcome. These describe the simulated rule match only: this prototype does not
// monitor a driver, read a vehicle or control anything.
const CONTENT = {
  1: ['Emergency Alert rule matched', 'The simulated Emergency Alert rule from Table II matched. CARA is advisory-only; this prototype only displays which rule matched.'],
  2: ['Take Rest rule matched', 'The driver state is set to Tired, so the simulated Take Rest rule matched. No driver monitoring is connected; the state is chosen by hand.'],
  3: ['Slow Down rule matched', 'The simulated Slow Down rule matched (ERS at or above 60, or driver Angry or Stressed). This prototype only displays which rule matched.'],
  4: ['Vehicle Service rule matched', 'The simulated Vehicle Service rule matched (VHS below 60, or a component below 40). No vehicle data is connected; the values are what-if inputs.'],
  5: ['Safe Driving: no rule matched', 'None of the Table II conditions matched, so the simulated recommendation is Safe Driving.'],
};

const DRIVER_RISK = { Normal: 12, Happy: 10, Tired: 75, Angry: 65, Stressed: 48 }; // placeholder values (illustrative)
const IMPAIRED = ['Tired', 'Angry', 'Stressed'];

// `ers` must be the UNROUNDED ERS (preset.ersExact). Thresholds are compared against unrounded VHS and ERS; rounding
// is applied only to the numbers returned for display (`vhs`, `ersDisplay`).
export function evaluateDecision({ components, driverState, ers: ersInput }) {
  const ers = snap(ersInput);
  const vhsExact = computeVHSExact(components);
  const vhs = round1(vhsExact);
  const ersDisplay = round1(ers);
  const impaired = IMPAIRED.includes(driverState);
  const brakeCritical = components.brakes < TABLE_II.brakeCritical;
  const engineCritical = components.engine < TABLE_II.engineCritical;
  const criticalComponent = brakeCritical || engineCritical;
  const lowComponents = COMPONENT_KEYS.filter((k) => components[k] < TABLE_II.componentService);

  const emergency = (criticalComponent && (impaired || ers >= TABLE_II.ersSlowDown)) || ers >= TABLE_II.ersEmergency;
  const rest = driverState === 'Tired';
  const slow = ers >= TABLE_II.ersSlowDown || driverState === 'Angry' || driverState === 'Stressed';
  const service = vhsExact < TABLE_II.vhsService || lowComponents.length > 0;

  let priority = 5;
  let because = [];
  if (emergency) {
    priority = 1;
    if (ers >= TABLE_II.ersEmergency) because.push(`ERS ${showNear(ers, 85)} ≥ 85`);
    else {
      if (brakeCritical) because.push(`brake health ${components.brakes} < 30`);
      if (engineCritical) because.push(`engine health ${components.engine} < 25`);
      because.push(impaired ? `driver ${driverState}` : `ERS ${showNear(ers, 60)} ≥ 60`);
    }
  } else if (rest) {
    priority = 2;
    because = ['driver state is Tired'];
  } else if (slow) {
    priority = 3;
    if (ers >= TABLE_II.ersSlowDown) because.push(`ERS ${showNear(ers, 60)} ≥ 60`);
    if (driverState === 'Angry' || driverState === 'Stressed') because.push(`driver ${driverState}`);
  } else if (service) {
    priority = 4;
    if (vhsExact < TABLE_II.vhsService) because.push(`VHS ${showNear(vhsExact, 60)} < 60`);
    for (const k of lowComponents) because.push(`${COMPONENT_LABELS[k].toLowerCase()} health ${components[k]} < 40`);
  } else {
    because = ['no condition matched'];
  }

  // Illustrative composite (placeholder weights; not used for the selection above).
  const driverRisk = DRIVER_RISK[driverState] ?? 12;
  const vehRisk = round1(Math.max(0, 100 - vhsExact));
  const contributions = { driver: driverRisk * 0.4, environment: ers * 0.35, vehicle: vehRisk * 0.25 };
  const netRisk = Math.round(contributions.driver + contributions.environment + contributions.vehicle);

  return {
    vhs, // rounded, display only
    vhsExact,
    ersDisplay,
    priority,
    priorityName: PRIORITY_NAMES[priority],
    priorityText: `PRIORITY ${priority} : ${PRIORITY_NAMES[priority].toUpperCase()}`,
    priorityClass: PRIORITY_CLASS[priority],
    badgeClass: BADGE_CLASS[priority],
    ruleText: RULE_TEXT[priority],
    because: because.join('; '),
    titleText: CONTENT[priority][0],
    descText: CONTENT[priority][1],
    // illustrative composite
    driverRisk,
    vehRisk,
    envRisk: ersDisplay,
    contributions,
    netRisk,
  };
}
