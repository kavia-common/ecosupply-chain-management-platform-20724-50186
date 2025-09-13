import { ROLES } from '../contexts/AuthContext';

export const users = [
  { id: 'u1', name: 'Alice Admin', email: 'admin@eco.com', role: ROLES.ADMIN },
  { id: 'u2', name: 'Uma User', email: 'user@eco.com', role: ROLES.USER },
  { id: 'u3', name: 'Sam Supplier', email: 'supplier@eco.com', role: ROLES.SUPPLIER }
];
