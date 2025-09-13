import React from 'react';

// PUBLIC_INTERFACE
export default function StatCard({ title, value, delta, tone = 'default' }) {
  /** Simple KPI/metric card. */
  const color = tone === 'success' ? 'green' : tone === 'warning' ? 'yellow' : tone === 'danger' ? 'red' : 'blue';
  return (
    <div className="card">
      <div className="text-sm text-muted">{title}</div>
      <div className="text-xl mt-2">{value}</div>
      {delta != null && <div className={`tag mt-2 ${color}`}>{delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%</div>}
    </div>
  );
}
