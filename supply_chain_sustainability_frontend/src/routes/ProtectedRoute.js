import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
export default function ProtectedRoute({ roles }) {
  /**
   * Guards routes by requiring an authenticated user and optional role list.
   * Redirects unauthenticated users to /login, preserving return path.
   */
  const { user, hasRole } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (roles && !hasRole(roles)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
