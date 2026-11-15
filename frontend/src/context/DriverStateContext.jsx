import { createContext, useContext, useMemo, useState } from 'react';

// Single source of truth for the (manually selected, simulated) driver state.
// Used by the top bar, the Overview selector and the Driver Twin page so they never disagree.
// NOTE: the Decision Engine sandbox intentionally keeps its own independent what-if state.
// The Stitch design shows "Alert / Normal" in the top bar for the default (Normal) state.
export const driverStateLabel = (state) => (state === 'Normal' ? 'Alert / Normal' : state);

const DriverStateContext = createContext(null);

export function DriverStateProvider({ children }) {
  const [driverState, setDriverState] = useState('Normal');
  const value = useMemo(() => ({ driverState, setDriverState }), [driverState]);
  return <DriverStateContext.Provider value={value}>{children}</DriverStateContext.Provider>;
}

export function useDriverState() {
  const ctx = useContext(DriverStateContext);
  if (!ctx) throw new Error('useDriverState must be used inside <DriverStateProvider>');
  return ctx;
}
