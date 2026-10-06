import { memo } from 'react';

function FilterBar({ filters, onChange, onReset }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={filters.search}
        onChange={(e) => onChange('search', e.target.value)}
      />
      <select value={filters.status} onChange={(e) => onChange('status', e.target.value)}>
        <option value="all">All status</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="warning">Warning</option>
      </select>
      <select value={filters.type} onChange={(e) => onChange('type', e.target.value)}>
        <option value="all">All types</option>
        <option value="Temperature">Temperature</option>
        <option value="Pressure">Pressure</option>
        <option value="Vibration">Vibration</option>
        <option value="Humidity">Humidity</option>
      </select>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default memo(FilterBar);
