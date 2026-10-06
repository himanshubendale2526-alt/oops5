import { memo } from 'react';
import { Link } from 'react-router-dom';

function DeviceCard({ device }) {
  return (
    <li className={`device-card ${device.status}`}>
      <div>
        <strong>{device.name}</strong>
        <span className="muted"> {device.type}</span>
      </div>
      <div>
        <span className={`badge ${device.status}`}>{device.status}</span>
        <span className="value">{device.value}</span>
        <Link to={`/device/${device.id}`}>Details</Link>
      </div>
    </li>
  );
}

// memo: re-renders only if the "device" prop changes
export default memo(DeviceCard);
