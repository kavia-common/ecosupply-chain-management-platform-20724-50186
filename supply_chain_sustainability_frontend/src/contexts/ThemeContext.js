import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

// PUBLIC_INTERFACE
export function useTheme() {
  /** Access the global theme state and toggle function. */
  return useContext(ThemeContext);
}

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides theme context and persists user preference to localStorage. */
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || (process.env.REACT_APP_ENABLE_DARK_MODE === 'true' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ theme, toggle }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
