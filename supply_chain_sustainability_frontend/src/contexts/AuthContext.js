import React, { createContext, useContext, useMemo, useState } from 'react';
import { login as serviceLogin } from '../services/authService';
import { ROLES } from '../constants/roles';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  hasRole: () => false
});

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access authenticated user state, login/logout, and role checks. */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth and role-based access control using demo users. */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('scsp_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async ({ email, username, password }) => {
    /**
     * Accepts either email or username as the identifier.
     * For backward compatibility, email field from LoginPage will be used as the identifier.
     */
    const identifier = (username || email || '').trim();
    const authed = await serviceLogin(identifier, password);
    const sessionUser = { id: authed.id, name: authed.name, email: authed.email, role: authed.role };
    setUser(sessionUser);
    localStorage.setItem('scsp_user', JSON.stringify(sessionUser));
    return sessionUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('scsp_user');
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (!roles) return true;
    const arr = Array.isArray(roles) ? roles : [roles];
    return arr.includes(user.role);
  };

  const value = useMemo(() => ({ user, login, logout, hasRole }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
