import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app">
      <header className="topbar">
        <h1>Intelligent Data Dashboard</h1>
        <nav>
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/telemetry">Telemetry</NavLink>
          <NavLink to="/config">Configuration</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
