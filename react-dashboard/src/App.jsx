import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import TelemetryPage from './pages/TelemetryPage.jsx';
import ConfigPage from './pages/ConfigPage.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/device/:id" element={<DetailPage />} />
        <Route path="/telemetry" element={<TelemetryPage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
