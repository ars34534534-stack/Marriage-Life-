
import React, { useState } from 'react';
import { registerUser, loginUser } from '../lib/auth.js';

export default function AuthForm({ onSuccess }) {
  const [mode, setMode] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        await registerUser({ name: name.trim(), email: email.trim(), password });
      } else {
        await loginUser({ email: email.trim(), password });
      }

      if (onSuccess) await onSuccess();
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card">
      <h2>{mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}</h2>
      <p>Find your life partner with Marriage Life ❤️</p>

      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <label>
            Full Name
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>
        )}

        <label>
          Email Address
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? 'Please wait...'
            : mode === 'signup'
              ? 'Create Account'
              : 'Login'}
        </button>
      </form>

      <p className="auth-switch">
        {mode === 'signup'
          ? 'Already have an account?'
          : "Don't have an account?"}
        {' '}
        <button
          type="button"
          className="text-button"
          onClick={() => {
            setMode(mode === 'signup' ? 'login' : 'signup');
            setError('');
          }}
        >
          {mode === 'signup' ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </section>
  );
    }
            
