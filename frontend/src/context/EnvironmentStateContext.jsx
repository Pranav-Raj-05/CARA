import { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_PRESET, weatherPresets } from '../data/environmentPresets';

// Shared (simulated) environment scenario: the Environment Twin page selects it and the Overview reads it, so the
// two screens never disagree. The Decision Engine sandbox intentionally keeps its own independent what-if state.
const EnvironmentStateContext = createContext(null);

export function EnvironmentStateProvider({ children }) {
  const [presetKey, setPresetKey] = useState(DEFAULT_PRESET);
  const value = useMemo(() => ({ presetKey, setPresetKey, preset: weatherPresets[presetKey] }), [presetKey]);
  return <EnvironmentStateContext.Provider value={value}>{children}</EnvironmentStateContext.Provider>;
}

export function useEnvironmentState() {
  const ctx = useContext(EnvironmentStateContext);
  if (!ctx) throw new Error('useEnvironmentState must be used inside <EnvironmentStateProvider>');
  return ctx;
}
