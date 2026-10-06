export default function StatsBar({ items }) {
  const counts = items.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="stats">
      <div className="stat">Total <b>{items.length}</b></div>
      <div className="stat online">Online <b>{counts.online || 0}</b></div>
      <div className="stat warning">Warning <b>{counts.warning || 0}</b></div>
      <div className="stat offline">Offline <b>{counts.offline || 0}</b></div>
    </div>
  );
}
