import { useState, useEffect } from 'react';
import DeviceCard from './DeviceCard.jsx';

const PAGE_SIZE = 100;

export default function DeviceList({ items }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  // When the filtered list changes, start again from the first page
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [items]);

  if (items.length === 0) {
    return <p className="empty">No devices match the current filters.</p>;
  }

  return (
    <>
      <ul className="device-list">
        {items.slice(0, visible).map((d) => (
          <DeviceCard key={d.id} device={d} />
        ))}
      </ul>
      <p className="muted">Showing {Math.min(visible, items.length)} of {items.length}</p>
      {visible < items.length && (
        <button onClick={() => setVisible((v) => v + PAGE_SIZE)}>Show more</button>
      )}
    </>
  );
}
