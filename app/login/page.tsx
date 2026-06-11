'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/canvas/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.ok) {
      router.push('/projects');
    } else {
      setError('Invalid email or password.');
    }
  }

  function fillDemo(which: 'client' | 'kainos') {
    if (which === 'client') {
      setEmail('sarah.mitchell@globaltech.com');
      setPassword('demo-client-2026');
    } else {
      setEmail('kate.wilson@kainos.com');
      setPassword('demo-kainos-2026');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--canvas-soap-300)] px-4">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[var(--canvas-blueberry-400)] rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
            W
          </div>
          <h1 className="text-base font-semibold text-[var(--canvas-licorice-600)]">Project Portal</h1>
          <p className="text-sm text-[var(--canvas-licorice-400)]">Powered by Kainos</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[var(--canvas-licorice-200)] rounded-[4px] p-8">
          <h2 className="text-lg font-semibold text-[var(--canvas-licorice-600)] mb-6">Sign in</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-[var(--canvas-licorice-500)] mb-1" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[var(--canvas-licorice-300)] rounded-[4px] px-3 py-2 text-sm text-[var(--canvas-licorice-600)] outline-none focus:border-[var(--canvas-blueberry-400)] focus:ring-1 focus:ring-[var(--canvas-blueberry-400)]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--canvas-licorice-500)] mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-[var(--canvas-licorice-300)] rounded-[4px] px-3 py-2 text-sm text-[var(--canvas-licorice-600)] outline-none focus:border-[var(--canvas-blueberry-400)] focus:ring-1 focus:ring-[var(--canvas-blueberry-400)]"
              />
            </div>
            {error && <p className="text-sm text-[var(--canvas-cinnamon-500)]">{error}</p>}
            <Button type="submit" variant="primary" disabled={loading} className="w-full mt-2">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 border-t border-[var(--canvas-licorice-200)] pt-4">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="text-xs text-[var(--canvas-licorice-400)] hover:text-[var(--canvas-licorice-600)] flex items-center gap-1"
            >
              <span>{showDemo ? '▾' : '▸'}</span> Demo credentials
            </button>
            {showDemo && (
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo('client')}
                  className="text-left text-xs bg-[var(--canvas-soap-200)] rounded-[4px] px-3 py-2 hover:bg-[var(--canvas-blueberry-100)] transition-colors"
                >
                  <div className="font-medium text-[var(--canvas-licorice-600)]">Sarah Mitchell (Client)</div>
                  <div className="text-[var(--canvas-licorice-400)]">sarah.mitchell@globaltech.com</div>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('kainos')}
                  className="text-left text-xs bg-[var(--canvas-soap-200)] rounded-[4px] px-3 py-2 hover:bg-[var(--canvas-blueberry-100)] transition-colors"
                >
                  <div className="font-medium text-[var(--canvas-licorice-600)]">Kate Wilson (Kainos)</div>
                  <div className="text-[var(--canvas-licorice-400)]">kate.wilson@kainos.com</div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
