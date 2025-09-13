import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';

// PUBLIC_INTERFACE
export default function App() {
  /** Root component setting up global providers and the application routes.
   * Using HashRouter to ensure deep links like /login work in environments where the server
   * does not return index.html for client-side routes (e.g., preview URLs).
   */
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
