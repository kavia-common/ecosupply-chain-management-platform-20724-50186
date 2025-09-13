import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

// PUBLIC_INTERFACE
export default function NavBar() {
  /** Top navigation bar containing brand, search, actions, and user menu. */
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="brand">
        <div className="brand-logo" aria-hidden="true" />
        <span>EcoSupply Portal</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn ghost small" onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">{user.name} · {user.role}</span>
            <button className="btn small" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
