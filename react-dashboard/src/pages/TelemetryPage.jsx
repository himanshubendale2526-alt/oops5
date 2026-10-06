import { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import TelemetryPanel from '../components/TelemetryPanel.jsx';

export default function TelemetryPage() {
  const [failure, setFailure] = useState(false);
  const [crash, setCrash] = useState(false);

  return (
    <section>
      <h2>Live Telemetry</h2>
      <div className="row">
        <label className="inline">
          <input type="checkbox" checked={failure} onChange={(e) => setFailure(e.target.checked)} />
          Simulate API failure
        </label>
        <button onClick={() => setCrash(true)}>Crash component</button>
      </div>

      <ErrorBoundary onReset={() => setCrash(false)}>
        <TelemetryPanel simulateFailure={failure} crash={crash} />
      </ErrorBoundary>
    </section>
  );
}
