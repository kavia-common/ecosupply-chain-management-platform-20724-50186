import React from 'react';

// PUBLIC_INTERFACE
export default function ProgressBar({ value }) {
  /** Horizontal progress bar representation (0-100). */
  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: 999, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
      <div style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: 'var(--accent)', height: 10 }} />
    </div>
  );
}
