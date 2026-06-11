'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/canvas/Button';

export function LandingPage() {
  const [tenantUrl, setTenantUrl] = useState(
    process.env.NEXT_PUBLIC_WORKDAY_TENANT_URL ?? '',
  );
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPassword, setDemoPassword] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState('');

  async function handleWorkdayConnect(e: React.FormEvent) {
    e.preventDefault();
    setConnecting(true);
    setConnectError('');

    try {
      const res = await fetch('/api/workday-auth/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setConnectError(data.error ?? 'Could not connect to Workday.');
        setConnecting(false);
        return;
      }

      // Redirect the browser to Workday to authenticate
      window.location.href = data.authorizeUrl;
    } catch {
      setConnectError('Network error — please try again.');
      setConnecting(false);
    }
  }

  async function handleDemoSignIn(e: React.FormEvent) {
    e.preventDefault();
    setDemoLoading(true);
    setDemoError('');
    const result = await signIn('demo-credentials', {
      email: demoEmail,
      password: demoPassword,
      redirect: false,
    });
    setDemoLoading(false);
    if (result?.ok) {
      window.location.href = '/projects';
    } else {
      setDemoError('Invalid demo credentials.');
    }
  }

  function fillDemo(which: 'client' | 'kainos') {
    if (which === 'client') {
      setDemoEmail('sarah.mitchell@globaltech.com');
      setDemoPassword('demo-client-2026');
    } else {
      setDemoEmail('kate.wilson@kainos.com');
      setDemoPassword('demo-kainos-2026');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--canvas-soap-300)] flex flex-col">
      {/* Top nav */}
      <nav className="bg-[var(--canvas-nav-bg)] h-14 flex items-center px-8">
        <div className="w-8 h-8 bg-[var(--canvas-blueberry-400)] rounded flex items-center justify-center text-white font-bold text-sm select-none mr-3">
          W
        </div>
        <span className="text-white text-sm font-medium">
          Project Portal <span className="text-[var(--canvas-licorice-300)] font-normal">· Powered by Kainos</span>
        </span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-12 max-w-xl">
          <h1 className="text-3xl font-bold text-[var(--canvas-licorice-600)] mb-4">
            Your Workday delivery, in one place
          </h1>
          <p className="text-[var(--canvas-licorice-400)] text-base leading-relaxed">
            The Kainos Project Portal gives you a real-time view of your Workday implementation —
            phases, financials, milestones and team — all surfaced directly from your Workday tenant.
          </p>
        </div>

        <div className="w-full max-w-md flex flex-col gap-4">
          {/* Connect to Workday card */}
          <div className="bg-white border border-[var(--canvas-licorice-200)] rounded-[4px] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--canvas-blueberry-400)] rounded flex items-center justify-center text-white font-bold flex-shrink-0">
                W
              </div>
              <div>
                <h2 className="text-base font-semibold text-[var(--canvas-licorice-600)]">Connect to Workday</h2>
                <p className="text-xs text-[var(--canvas-licorice-400)]">Sign in with your Workday account</p>
              </div>
            </div>

            <form onSubmit={handleWorkdayConnect} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-[var(--canvas-licorice-500)] mb-1" htmlFor="tenantUrl">
                  Workday tenant URL
                </label>
                <input
                  id="tenantUrl"
                  type="text"
                  value={tenantUrl}
                  onChange={(e) => setTenantUrl(e.target.value)}
                  placeholder="https://wd2-impl-services1.workday.com/kainos_gms"
                  required
                  className="w-full border border-[var(--canvas-licorice-300)] rounded-[4px] px-3 py-2 text-sm text-[var(--canvas-licorice-600)] outline-none focus:border-[var(--canvas-blueberry-400)] focus:ring-1 focus:ring-[var(--canvas-blueberry-400)] font-mono"
                />
                <p className="text-xs text-[var(--canvas-licorice-400)] mt-1">
                  Your Workday environment URL — ends with your tenant name
                </p>
              </div>

              {connectError && (
                <p className="text-sm text-[var(--canvas-cinnamon-500)]">{connectError}</p>
              )}

              <Button type="submit" variant="primary" disabled={connecting} className="w-full">
                {connecting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting…
                  </span>
                ) : (
                  'Sign in with Workday'
                )}
              </Button>
            </form>
          </div>

          {/* Demo access */}
          <div className="bg-white border border-[var(--canvas-licorice-200)] rounded-[4px] overflow-hidden">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="w-full flex items-center justify-between px-6 py-4 text-sm text-[var(--canvas-licorice-500)] hover:bg-[var(--canvas-soap-200)] transition-colors"
            >
              <span className="font-medium">Demo access</span>
              <span className="text-[var(--canvas-licorice-400)] text-xs">{showDemo ? '▲ Hide' : '▼ Show'}</span>
            </button>

            {showDemo && (
              <div className="px-6 pb-6 border-t border-[var(--canvas-licorice-200)] pt-4">
                <p className="text-xs text-[var(--canvas-licorice-400)] mb-4">
                  Try the portal with a realistic mock Workday project — no real tenant needed.
                </p>

                {/* Quick-fill buttons */}
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => fillDemo('client')}
                    className="flex-1 text-xs bg-[var(--canvas-soap-200)] rounded-[4px] px-3 py-2 hover:bg-[var(--canvas-blueberry-100)] transition-colors text-left"
                  >
                    <div className="font-medium text-[var(--canvas-licorice-600)]">Sarah Mitchell</div>
                    <div className="text-[var(--canvas-licorice-400)]">Client · GlobalTech</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('kainos')}
                    className="flex-1 text-xs bg-[var(--canvas-soap-200)] rounded-[4px] px-3 py-2 hover:bg-[var(--canvas-blueberry-100)] transition-colors text-left"
                  >
                    <div className="font-medium text-[var(--canvas-licorice-600)]">Kate Wilson</div>
                    <div className="text-[var(--canvas-licorice-400)]">Kainos PM</div>
                  </button>
                </div>

                <form onSubmit={handleDemoSignIn} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full border border-[var(--canvas-licorice-300)] rounded-[4px] px-3 py-2 text-sm text-[var(--canvas-licorice-600)] outline-none focus:border-[var(--canvas-blueberry-400)] focus:ring-1 focus:ring-[var(--canvas-blueberry-400)]"
                  />
                  <input
                    type="password"
                    value={demoPassword}
                    onChange={(e) => setDemoPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full border border-[var(--canvas-licorice-300)] rounded-[4px] px-3 py-2 text-sm text-[var(--canvas-licorice-600)] outline-none focus:border-[var(--canvas-blueberry-400)] focus:ring-1 focus:ring-[var(--canvas-blueberry-400)]"
                  />
                  {demoError && <p className="text-xs text-[var(--canvas-cinnamon-500)]">{demoError}</p>}
                  <Button type="submit" variant="secondary" disabled={demoLoading} className="w-full">
                    {demoLoading ? 'Signing in…' : 'Sign in with demo account'}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Feature strip */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl w-full text-center">
          {[
            { icon: '📊', title: 'Live financials', desc: 'Burn rate, earned value, and forecast — direct from Workday T&M data' },
            { icon: '🗓', title: 'Phase progress', desc: 'Visual timeline of every delivery phase with RAG health indicators' },
            { icon: '👥', title: 'Team & risks', desc: 'Delivery contacts, open risks, milestones, and key documents' },
          ].map((f) => (
            <div key={f.title}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-medium text-[var(--canvas-licorice-600)] mb-1">{f.title}</div>
              <div className="text-xs text-[var(--canvas-licorice-400)] leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-6 text-center text-xs text-[var(--canvas-licorice-400)]">
        © {new Date().getFullYear()} Kainos Group plc · Workday Project Portal
      </footer>
    </div>
  );
}
