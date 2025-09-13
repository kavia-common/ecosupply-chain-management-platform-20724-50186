import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROLES } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import SuppliersPage from '../pages/suppliers/SuppliersPage';
import SupplierDetailPage from '../pages/suppliers/SupplierDetailPage';
import CompliancePage from '../pages/compliance/CompliancePage';
import AuditingPage from '../pages/auditing/AuditingPage';
import CategorizationPage from '../pages/categorization/CategorizationPage';
import GoalsPage from '../pages/goals/GoalsPage';
import ReportingPage from '../pages/reporting/ReportingPage';
import IngestionPage from '../pages/ingestion/IngestionPage';
import CorrectiveActionsPage from '../pages/corrective/CorrectiveActionsPage';
import EducationPage from '../pages/education/EducationPage';
import VerificationPage from '../pages/verification/VerificationPage';
import NotFoundPage from '../pages/misc/NotFoundPage';

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Defines application routes and protects them based on roles. */
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute roles={[ROLES.ADMIN, ROLES.USER, ROLES.SUPPLIER]} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/suppliers/:id" element={<SupplierDetailPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/auditing" element={<AuditingPage />} />
        <Route path="/categorization" element={<CategorizationPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/reporting" element={<ReportingPage />} />
        <Route path="/ingestion" element={<IngestionPage />} />
        <Route path="/corrective-actions" element={<CorrectiveActionsPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/verification" element={<VerificationPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
