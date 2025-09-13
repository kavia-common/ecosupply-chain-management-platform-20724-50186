import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFoundPage() {
  /** Fallback page for unknown routes. */
  return (
    <div className="auth-wrapper">
      <div className="card auth-card" style={{ textAlign: 'center' }}>
        <div className="text-xl mb-2">Page not found</div>
        <Link className="btn" to="/dashboard">Go to Dashboard</Link>
      </div>
    </div>
  );
}
