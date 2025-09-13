import { users } from '../data/users';

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Simulated login. Accepts password 'password' for demo users. */
  const user = users.find(u => u.email === email && password === 'password');
  if (!user) throw new Error('Invalid credentials');
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Simulated logout (no-op). */
  return true;
}
