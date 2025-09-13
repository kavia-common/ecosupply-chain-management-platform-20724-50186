import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../constants/roles';

function LinkItem({ to, label }) {
  return (
    <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to={to}>
      {label}
    </NavLink>
  );
}

// PUBLIC_INTERFACE
export default function SideBar() {
  /** Left navigation sidebar with sections and role-based visibility. */
  const { hasRole } = useAuth();

  return (
    <nav>
      <div className="nav-group">
        <div className="nav-title">Overview</div>
        <LinkItem to="/dashboard" label="Dashboard" />
        <LinkItem to="/reporting" label="Reporting" />
      </div>
      <div className="nav-group">
        <div className="nav-title">Suppliers</div>
        <LinkItem to="/suppliers" label="Supplier Directory" />
        <LinkItem to="/categorization" label="Categorization" />
      </div>
      <div className="nav-group">
        <div className="nav-title">Compliance</div>
        <LinkItem to="/compliance" label="Compliance Manager" />
        <LinkItem to="/auditing" label="Auditing" />
        {hasRole([ROLES.ADMIN, ROLES.USER]) && <LinkItem to="/verification" label="Verification" />}
      </div>
      <div className="nav-group">
        <div className="nav-title">Programs</div>
        <LinkItem to="/goals" label="Sustainability Goals" />
        <LinkItem to="/corrective-actions" label="Corrective Actions" />
        <LinkItem to="/education" label="Educational Resources" />
      </div>
      <div className="nav-group">
        <div className="nav-title">Data</div>
        <LinkItem to="/ingestion" label="Data Ingestion" />
      </div>
    </nav>
  );
}
