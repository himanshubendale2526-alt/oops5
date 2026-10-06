import { useState } from 'react';

const INITIAL = {
  systemName: '',
  interval: '5',
  threshold: '70',
  email: '',
  mode: 'edge',
  advanced: false,
  retention: '30',
};

function validate(v) {
  const e = {};
  if (!v.systemName.trim()) e.systemName = 'System name is required';
  else if (v.systemName.trim().length < 3) e.systemName = 'Minimum 3 characters';

  const interval = Number(v.interval);
  if (v.interval === '' || Number.isNaN(interval)) e.interval = 'Enter a number';
  else if (interval < 1 || interval > 60) e.interval = 'Must be between 1 and 60 seconds';

  const threshold = Number(v.threshold);
  if (v.threshold === '' || Number.isNaN(threshold)) e.threshold = 'Enter a number';
  else if (threshold < 0 || threshold > 100) e.threshold = 'Must be between 0 and 100';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address';

  if (v.advanced) {
    const r = Number(v.retention);
    if (v.retention === '' || Number.isNaN(r) || r < 1 || r > 365) {
      e.retention = 'Retention must be 1 to 365 days';
    }
  }
  return e;
}

export default function ConfigForm() {
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [saved, setSaved] = useState(null);

  const errors = validate(values);          // real-time validation on every render
  const errorCount = Object.keys(errors).length;

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setSaved(null);
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ systemName: true, interval: true, threshold: true, email: true, retention: true });
    if (errorCount === 0) setSaved(values);
  }

  function handleReset() {
    setValues(INITIAL);
    setTouched({});
    setSaved(null);
  }

  const err = (name) => touched[name] && errors[name] && <small className="error">{errors[name]}</small>;
  const cls = (name) => (touched[name] ? (errors[name] ? 'invalid' : 'valid') : '');

  return (
    <form className="config-form" onSubmit={handleSubmit} noValidate>
      <label>
        System name
        <input name="systemName" value={values.systemName} onChange={handleChange} onBlur={handleBlur} className={cls('systemName')} />
        {err('systemName')}
      </label>

      <label>
        Sampling interval (seconds)
        <input name="interval" type="number" value={values.interval} onChange={handleChange} onBlur={handleBlur} className={cls('interval')} />
        {err('interval')}
      </label>

      <label>
        Alert threshold (%)
        <input name="threshold" type="number" value={values.threshold} onChange={handleChange} onBlur={handleBlur} className={cls('threshold')} />
        {err('threshold')}
      </label>

      <label>
        Alert email
        <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={cls('email')} />
        {err('email')}
      </label>

      <label>
        Processing mode
        <select name="mode" value={values.mode} onChange={handleChange}>
          <option value="edge">Edge</option>
          <option value="cloud">Cloud</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </label>

      <label className="inline">
        <input name="advanced" type="checkbox" checked={values.advanced} onChange={handleChange} />
        Show advanced settings
      </label>

      {/* Conditional rendering: only visible when the checkbox is ticked */}
      {values.advanced && (
        <label>
          Data retention (days)
          <input name="retention" type="number" value={values.retention} onChange={handleChange} onBlur={handleBlur} className={cls('retention')} />
          {err('retention')}
        </label>
      )}

      <p className={errorCount === 0 ? 'ok-text' : 'error'}>
        {errorCount === 0 ? 'Form is valid' : `${errorCount} validation error(s)`}
      </p>

      <div className="row">
        <button type="submit" disabled={errorCount > 0}>Save configuration</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>

      {saved && (
        <div className="success-box">
          <h3>Configuration saved</h3>
          <pre>{JSON.stringify(saved, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}
