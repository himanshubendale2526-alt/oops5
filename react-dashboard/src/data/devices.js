const TYPES = ['Temperature', 'Pressure', 'Vibration', 'Humidity'];
const STATUSES = ['online', 'offline', 'warning'];

// 2000 items, to demonstrate efficient rendering of a large list
export const devices = Array.from({ length: 2000 }, (_, i) => ({
  id: i + 1,
  name: `Node-${String(i + 1).padStart(4, '0')}`,
  type: TYPES[i % TYPES.length],
  status: STATUSES[(i * 7 + Math.floor(i / 3)) % 3],
  value: 20 + ((i * 37) % 80),
  threshold: 70,
}));
