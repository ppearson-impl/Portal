'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function WorkdayRelayInner() {
  const params = useSearchParams();

  useEffect(() => {
    const workdayToken   = params.get('workdayToken')   ?? '';
    const workdayUser    = params.get('workdayUser')    ?? '';
    const workdayTenant  = params.get('workdayTenant')  ?? '';
    const workdayBaseUrl = params.get('workdayBaseUrl') ?? '';

    if (workdayToken && workdayUser) {
      signIn('workday-oauth', {
        workdayToken,
        workdayUser,
        workdayTenant,
        workdayBaseUrl,
        callbackUrl: '/projects',
        redirect: true,
      });
    } else {
      window.location.href = '/login?error=workday_relay';
    }
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--canvas-soap-300)]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[var(--canvas-blueberry-400)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--canvas-licorice-400)]">Completing Workday sign-in…</p>
      </div>
    </div>
  );
}

export default function WorkdayRelayPage() {
  return (
    <Suspense>
      <WorkdayRelayInner />
    </Suspense>
  );
}
