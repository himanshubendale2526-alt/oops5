// Simulated backend call (800 ms delay)
export function fetchTelemetry(simulateFailure = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateFailure) {
        reject(new Error('503 Service Unavailable: telemetry service not responding'));
        return;
      }
      resolve({
        time: new Date().toLocaleTimeString(),
        temperature: +(60 + Math.random() * 40).toFixed(1),
        pressure: +(30 + Math.random() * 40).toFixed(1),
        vibration: +(2 + Math.random() * 8).toFixed(2),
        cpu: Math.round(Math.random() * 100),
      });
    }, 800);
  });
}
