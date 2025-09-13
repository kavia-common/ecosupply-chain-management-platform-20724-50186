import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Layout({ children }) {
  /** App chrome with top Nav and left Sidebar, hides on auth pages. */
  const { pathname } = useLocation();
  const isAuth = pathname.startsWith('/login');
  if (isAuth) return <>{children}</>;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <SideBar />
      </aside>
      <main className="main">
        <NavBar />
        <div className="content">
          <div className="container">{children}</div>
        </div>
      </main>
    </div>
  );
}
