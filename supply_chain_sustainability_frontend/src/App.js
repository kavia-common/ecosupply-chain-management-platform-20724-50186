import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';

// PUBLIC_INTERFACE
export default function App() {
  /** Root component setting up global providers and the application routes. */
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
