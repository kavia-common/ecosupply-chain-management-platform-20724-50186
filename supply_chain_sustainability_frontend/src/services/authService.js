import { users } from '../data/users';

/**
 * Normalize an identifier so we can match case-insensitively for username/email.
 */
const normalize = (v) => (v || '').trim().toLowerCase();

// PUBLIC_INTERFACE
export async function login(identifier, password) {
  /**
   * Simulated login.
   * Accepts:
   * - Existing demo users via email + password 'password'
   * - Default admin via username 'admin' + password 'password@1234'
   */
  const idNorm = normalize(identifier);
  const pwd = String(password || '');

  // First, try username-based match (for default admin and any entries that define username)
  let user = users.find(u => u.username && normalize(u.username) === idNorm && u.password === pwd);

  // Fallback: email-based demo users with shared password 'password' or per-user defined password
  if (!user) {
    user = users.find(u => normalize(u.email) === idNorm && (u.password ? u.password === pwd : pwd === 'password'));
  }

  if (!user) {
    // Provide a specific error to show on UI
    throw new Error('Invalid username/email or password');
  }
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Simulated logout (no-op). */
  return true;
}
