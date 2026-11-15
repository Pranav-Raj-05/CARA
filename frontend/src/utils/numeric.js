// Number helpers shared by the VHS / ERS / decision-rule code.
//
// DISPLAY rounding and DECISION comparison are kept apart on purpose:
//   - round1(x) is for what is shown on screen (one decimal place).
//   - snap(x) only removes binary floating-point noise (for example 60.00000000000001 -> 60) at 1e-9. It does NOT round
//     to a displayed precision, so a true 59.96 stays 59.96 and is correctly below a threshold of 60.
// Thresholds are always compared against snap()-ed, unrounded values.

export const round1 = (x) => Math.round(x * 10) / 10;
export const snap = (x) => Math.round(x * 1e9) / 1e9;
export const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

// Display helper for the "because" text: one decimal, but never let rounding make a value look equal to a threshold
// it does not equal (59.96 against 60 is shown as 59.96, not 60).
export function showNear(x, threshold) {
  const r = round1(x);
  return r === threshold && snap(x) !== threshold ? snap(x).toFixed(2) : String(r);
}
