import { useState, useEffect, useMemo, useCallback } from 'react';
import FilterBar from '../components/FilterBar.jsx';
import StatsBar from '../components/StatsBar.jsx';
import DeviceList from '../components/DeviceList.jsx';
import { devices } from '../data/devices.js';

const DEFAULT_FILTERS = { status: 'all', type: 'all', search: '' };

function loadFilters() {
  try {
    const saved = localStorage.getItem('dashboardFilters');
    return saved ? { ...DEFAULT_FILTERS, ...JSON.parse(saved) } : DEFAULT_FILTERS;
  } catch {
    return DEFAULT_FILTERS;
  }
}

export default function OverviewPage() {
  const [filters, setFilters] = useState(loadFilters);

  const filtered = useMemo(
    () =>
      devices.filter(
        (d) =>
          (filters.status === 'all' || d.status === filters.status) &&
          (filters.type === 'all' || d.type === filters.type) &&
          d.name.toLowerCase().includes(filters.search.toLowerCase())
      ),
    [filters]
  );

  // Side effects: persist filters and update the page title
  useEffect(() => {
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
    document.title = `Dashboard (${filtered.length} devices)`;
  }, [filters, filtered.length]);

  const handleChange = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  return (
    <section>
      <h2>Device Overview</h2>
      <FilterBar filters={filters} onChange={handleChange} onReset={handleReset} />
      <StatsBar items={filtered} />
      <DeviceList items={filtered} />
    </section>
  );
}
