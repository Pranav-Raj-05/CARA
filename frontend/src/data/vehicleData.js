// Vehicle-twin content: ILLUSTRATIVE sample values. No vehicle model, CAN bus or telemetry is connected.
// Component health and the Vehicle Health Score come from data/vehicleHealth.js so every screen agrees.
import { BASELINE_COMPONENTS as C, BASELINE_VHS } from './vehicleHealth';

export const vehicleKpis = [
  { label: 'Vehicle Health Score (VHS)', value: `${BASELINE_VHS.toFixed(1)}%`, valueClass: 'text-tertiary', unit: 'weighted, 4 components', unitClass: 'text-on-surface-variant' },
  { label: 'Estimated Range', value: '442', valueClass: 'text-on-surface', unit: 'km (sample)', unitClass: 'text-on-surface-variant' },
  { label: 'Simulated Bus Voltage', value: '792', valueClass: 'text-primary', unit: 'V (sample)', unitClass: 'text-primary-fixed-dim' },
  { label: 'Efficiency', value: '94.2%', valueClass: 'text-tertiary', unit: 'sample value', unitClass: 'text-on-surface-variant' },
];

export const hotspots = [
  { id: 'hotspotBattery', label: 'Battery Pack Tray', status: `${C.battery}% Health • 38°C • Optimal Balance`, coords: 'top-[52%] left-[48%]' },
  { id: 'hotspotBrakes', label: 'Brakes: Friction & Regen', status: `${C.brakes}% Ceramic Health • 1.12g Decel`, coords: 'top-[64%] left-[28%]' },
  { id: 'hotspotPowertrain', label: 'Powertrain: Dual Motors', status: `${C.engine}% Health • 550 kW Combined`, coords: 'top-[48%] left-[78%]' },
  { id: 'hotspotChassis', label: 'Tires & Aero Suspension', status: '34.5 PSI • Optimal Chamber Arc', coords: 'top-[45%] left-[8%] sm:left-[max(8%,6.5rem)]' },
];

// size: 'base' (large value) | 'sm'
export const subsystems = [
  {
    id: 'battery',
    icon: 'battery_charging_full',
    iconBox: 'bg-primary-container/15 text-primary',
    title: 'Battery Health',
    subtitle: 'Illustrative degradation values',
    soh: `${C.battery}% SoH`,
    metrics: [
      { label: 'Estimated Range', value: '442', unit: 'km', size: 'base', valueClass: 'text-on-surface' },
      { label: 'Simulated Voltage', value: '792V LFP', size: 'sm', valueClass: 'text-primary' },
      { label: 'Thermal Condition', value: 'Nominal (28.4°C)', size: 'sm', valueClass: 'text-tertiary' },
    ],
    footer: { label: 'Degradation Rate', value: '0.12% / 1k km', valueClass: 'text-primary' },
  },
  {
    id: 'powertrain',
    icon: 'electric_bolt',
    iconBox: 'bg-primary-container/15 text-primary',
    title: 'Powertrain Health',
    subtitle: 'Illustrative inverter & stator values',
    soh: `${C.engine}% SoH`,
    metrics: [
      { label: 'Inverter Efficacy', value: '97.4%', size: 'base', valueClass: 'text-tertiary' },
      { label: 'Torque Delivery', value: '48 / 52 Dynamic Split', size: 'sm', valueClass: 'text-on-surface' },
      { label: 'Stator Winding Temp', value: '< 64°C Nominal', size: 'sm', valueClass: 'text-on-surface' },
    ],
    footer: { label: 'Front / Rear Bias', value: 'AWD split (sample)', valueClass: 'text-primary' },
  },
  {
    id: 'brakes',
    icon: 'disc_full',
    iconBox: 'bg-secondary-container/20 text-secondary',
    title: 'Brake Health',
    subtitle: 'Illustrative friction & disc wear values',
    soh: `${C.brakes}% SoH`,
    metrics: [
      { label: 'Ceramic Disc Wear', value: '9.1', unit: 'mm / 10 mm', size: 'base', valueClass: 'text-on-surface' },
      { label: 'Peak Deceleration', value: '1.12g Simulated', size: 'sm', valueClass: 'text-primary' },
      { label: 'Brake Fluid Moisture', value: '1.1% (Low)', size: 'sm', valueClass: 'text-tertiary' },
    ],
    footer: { label: 'Projected Pad Life', value: '24,000 km', valueClass: 'text-tertiary' },
  },
  {
    id: 'chassis',
    icon: 'tune',
    iconBox: 'bg-tertiary-container/20 text-on-tertiary-container',
    title: 'Tires & Chassis Health',
    subtitle: 'Illustrative tread & kinematics values',
    soh: `${C.tires}% SoH`,
    metrics: [
      { label: 'Avg Tire Pressure', value: '34.5', unit: 'PSI', size: 'base', valueClass: 'text-on-surface' },
      { label: 'Bushing Wear', value: 'Minimal Nominal', size: 'sm', valueClass: 'text-tertiary' },
      { label: 'Toe / Camber Deviation', value: '< 0.05° (True Zero)', size: 'sm', valueClass: 'text-tertiary' },
    ],
    footer: { label: 'Steering Response (sample)', value: '3.8 ms', valueClass: 'text-primary' },
  },
];
