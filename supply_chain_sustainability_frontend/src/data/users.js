import { ROLES } from '../constants/roles';

/**
 * Demo user directory (in-memory).
 * Note:
 * - Existing demo users authenticate using password 'password'.
 * - Added default admin user authenticates using username 'admin' and password 'password@1234'.
 */
export const users = [
  { id: 'u1', name: 'Alice Admin', email: 'admin@eco.com', role: ROLES.ADMIN, password: 'password' },
  { id: 'u2', name: 'Uma User', email: 'user@eco.com', role: ROLES.USER, password: 'password' },
  { id: 'u3', name: 'Sam Supplier', email: 'supplier@eco.com', role: ROLES.SUPPLIER, password: 'password' },
  // Default admin user using username credential
  { id: 'u_admin', name: 'System Admin', email: 'admin@local', username: 'admin', role: ROLES.ADMIN, password: 'password@1234' }
];
