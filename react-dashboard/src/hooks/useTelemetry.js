import { useState, useEffect, useCallback } from 'react';
import { fetchTelemetry } from '../api/telemetryApi.js';

// Custom hook: polls the API and exposes { data, loading, error, refetch }
export function useTelemetry({ intervalMs = 3000, simulateFailure = false } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const reading = await fetchTelemetry(simulateFailure);
        if (!cancelled) {
          setData((prev) => [...prev.slice(-9), reading]); // keep last 10
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, intervalMs);

    // Cleanup when component unmounts or dependencies change
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [intervalMs, simulateFailure, reloadKey]);

  const refetch = useCallback(() => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  return { data, loading, error, refetch };
}
