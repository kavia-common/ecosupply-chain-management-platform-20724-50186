import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Simple login form using demo credentials (password: password). */
  const [email, setEmail] = useState('admin@eco.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <div className="text-xl mb-2">Welcome to EcoSupply</div>
        <div className="text-sm text-muted mb-4">Sign in with a demo user: admin@eco.com, user@eco.com, supplier@eco.com (password: password)</div>
        {error && <div className="tag red mb-2">Error: {error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          <label className="label mt-2">Password</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn mt-4" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
