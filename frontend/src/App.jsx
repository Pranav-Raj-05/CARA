import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DriverStateProvider } from './context/DriverStateContext';
import { EnvironmentStateProvider } from './context/EnvironmentStateContext';
import MainLayout from './components/layout/MainLayout';
import PlaceholderScreen from './components/common/PlaceholderScreen';
import Overview from './pages/Overview';
import DriverTwinPage from './pages/DriverTwinPage';
import VehicleTwinPage from './pages/VehicleTwinPage';
import DecisionEnginePage from './pages/DecisionEnginePage';
import EnvironmentTwinPage from './pages/EnvironmentTwinPage';
import NotFoundPage from './pages/NotFoundPage';
import { placeholderPages } from './data/placeholderPages';

export default function App() {
  return (
    <DriverStateProvider>
      <EnvironmentStateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="driver-twin" element={<DriverTwinPage />} />
            <Route path="vehicle-twin" element={<VehicleTwinPage />} />
            <Route path="decision-engine" element={<DecisionEnginePage />} />
            <Route path="env-twin" element={<EnvironmentTwinPage />} />
            {placeholderPages.map((p) => (
              <Route key={p.path} path={p.path} element={<PlaceholderScreen {...p} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </EnvironmentStateProvider>
    </DriverStateProvider>
  );
}
