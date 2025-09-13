import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Login page shown as first landing page with validation and redirects. */
  const [email, setEmail] = useState('admin@eco.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  // If already logged in, redirect to dashboard immediately
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const validate = () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return false;
    }
    // very light validation for email format
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;
    setBusy(true);
    try {
      await login({ email, password });
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <div className="text-xl mb-2">Welcome to EcoSupply</div>
        <div className="text-sm text-muted mb-4">
          Sign in with a demo user:
          {' '}
          admin@eco.com, user@eco.com, supplier@eco.com
          {' '}
          (password: password)
        </div>
        {error && <div className="tag red mb-2">Error: {error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            className="input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            autoComplete="username"
            required
            aria-invalid={!!error}
          />
          <label className="label mt-2" htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button className="btn mt-4" type="submit" disabled={busy}>
            {busy ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
