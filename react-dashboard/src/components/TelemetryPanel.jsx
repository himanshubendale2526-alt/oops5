import { useTelemetry } from '../hooks/useTelemetry.js';

export default function TelemetryPanel({ simulateFailure, crash }) {
  const { data, loading, error, refetch } = useTelemetry({ intervalMs: 3000, simulateFailure });

  if (crash) throw new Error('Intentional render crash to demonstrate the Error Boundary');

  if (loading && data.length === 0) {
    return <p className="loading">Loading telemetry...</p>;
  }

  const latest = data[data.length - 1];

  return (
    <div>
      {error && (
        <div className="error-box">
          <strong>API error:</strong> {error}
          <div><button onClick={refetch}>Retry</button></div>
        </div>
      )}

      {latest && (
        <div className="stats">
          <div className="stat">Temp <b>{latest.temperature} C</b></div>
          <div className="stat">Pressure <b>{latest.pressure} psi</b></div>
          <div className="stat">Vibration <b>{latest.vibration} mm/s</b></div>
          <div className="stat">CPU <b>{latest.cpu}%</b></div>
        </div>
      )}

      <table>
        <thead>
          <tr><th>Time</th><th>Temp</th><th>Pressure</th><th>Vibration</th><th>CPU</th></tr>
        </thead>
        <tbody>
          {[...data].reverse().map((r) => (
            <tr key={r.time + r.temperature}>
              <td>{r.time}</td><td>{r.temperature}</td><td>{r.pressure}</td><td>{r.vibration}</td><td>{r.cpu}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">Auto-refresh every 3 seconds</p>
    </div>
  );
}
