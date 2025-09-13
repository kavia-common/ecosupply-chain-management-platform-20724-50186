import React, { createContext, useContext, useMemo, useState } from 'react';
import { users as seedUsers } from '../data/users';

// Role constants
export const ROLES = { ADMIN: 'Admin', USER: 'User', SUPPLIER: 'Supplier' };

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

  const login = async ({ email, password }) => {
    // Simulate auth by checking in-memory users
    const match = seedUsers.find(u => u.email === email && password === 'password');
    if (!match) throw new Error('Invalid credentials');
    const sessionUser = { id: match.id, name: match.name, email: match.email, role: match.role };
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
