import React from 'react';

// PUBLIC_INTERFACE
export default function ChartPlaceholder({ title = 'Chart', height = 180 }) {
  /** Placeholder chart block to represent charts without heavy libs. */
  return (
    <div className="card">
      <div className="card-header"><div className="text-lg">{title}</div></div>
      <div style={{ height }}>
        <div style={{
          height: '100%', background:
            'repeating-linear-gradient(90deg, rgba(99,102,241,0.15), rgba(99,102,241,0.15) 10px, transparent 10px, transparent 20px)'
        }} />
      </div>
    </div>
  );
}
