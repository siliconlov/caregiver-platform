'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!res?.error) {
        router.push('/');
        router.refresh();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100vw', padding: 20 }}>
      {/* Back button */}
      <Link href="/" style={{ position: 'absolute', top: 40, left: 40, color: 'var(--text-secondary)' }}>
        ← Back to Home
      </Link>

      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: 440, padding: 40 }}>
        <div className="flex-col" style={{ alignItems: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: "var(--accent-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 24, marginBottom: 16 }}>
            CB
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted" style={{ marginTop: 8 }}>Log in to access your parent's Care Plan.</p>
        </div>

        {error && <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--danger-color)", padding: 12, borderRadius: 8, fontSize: "0.85rem", marginBottom: 20, textAlign: "center" }}>{error}</div>}

        <form onSubmit={handleSubmit} className="flex-col" style={{ gap: 20 }}>
          <div className="flex-col" style={{ gap: 8 }}>
            <label className="text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" 
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }} 
            />
          </div>
          
          <div className="flex-col" style={{ gap: 8 }}>
            <div className="flex-row justify-between">
               <label className="text-sm font-medium">Password</label>
               <Link href="#" className="text-xs text-accent-color">Forgot Password?</Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }} 
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", marginTop: 12, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-muted text-center" style={{ marginTop: 32 }}>
          Don't have an account? <Link href="/register" className="text-accent-color font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
