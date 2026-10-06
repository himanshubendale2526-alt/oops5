import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { devices } from '../data/devices.js';

export default function DetailPage() {
  const { id } = useParams();          // route parameter
  const navigate = useNavigate();
  const numId = Number(id);
  const device = devices[numId - 1];

  const readings = useMemo(
    () => (device ? Array.from({ length: 8 }, (_, k) => 20 + ((device.id * (k + 3) * 17) % 80)) : []),
    [device]
  );

  if (!device) {
    return (
      <section>
        <h2>Device not found</h2>
        <p>No device with id "{id}".</p>
        <button onClick={() => navigate('/')}>Back to overview</button>
      </section>
    );
  }

  return (
    <section>
      <h2>{device.name} - Analytical View</h2>
      <p className="muted">Route parameter id = {id}</p>
      <table>
        <tbody>
          <tr><th>Type</th><td>{device.type}</td></tr>
          <tr><th>Status</th><td><span className={`badge ${device.status}`}>{device.status}</span></td></tr>
          <tr><th>Current value</th><td>{device.value}</td></tr>
          <tr><th>Threshold</th><td>{device.threshold}</td></tr>
        </tbody>
      </table>

      <h3>Last 8 readings</h3>
      <div className="chart">
        {readings.map((r, i) => (
          <div key={i} className={`bar-col ${r > device.threshold ? 'over' : ''}`}>
            <div className="bar-fill" style={{ height: `${r}%` }} />
            <span>{r}</span>
          </div>
        ))}
      </div>

      <div className="row">
        {numId > 1 && <Link to={`/device/${numId - 1}`}>Previous</Link>}
        {numId < devices.length && <Link to={`/device/${numId + 1}`}>Next</Link>}
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </section>
  );
}
