'use client';

import { signOut, useSession } from 'next-auth/react';
import { Avatar } from '@/components/canvas/Avatar';
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export function GlobalNav() {
  const { data: session } = useSession();
  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : '??';

  return (
    <nav className="bg-[var(--canvas-nav-bg)] h-14 flex items-center px-6 gap-4 flex-shrink-0">
      {/* Workday dub mark */}
      <div className="w-8 h-8 bg-[var(--canvas-blueberry-400)] rounded flex items-center justify-center text-white font-bold text-sm select-none">
        W
      </div>
      <span className="text-white text-sm font-medium">
        Project Portal <span className="text-[var(--canvas-licorice-300)] font-normal">· Powered by Kainos</span>
      </span>
      <div className="ml-auto flex items-center gap-3">
        <button className="text-[var(--canvas-licorice-300)] hover:text-white transition-colors p-1">
          <BellIcon className="w-5 h-5" />
        </button>
        <button className="text-[var(--canvas-licorice-300)] hover:text-white transition-colors p-1">
          <Cog6ToothIcon className="w-5 h-5" />
        </button>
        <button onClick={() => signOut({ callbackUrl: '/login' })} title="Sign out">
          <Avatar initials={initials} size="sm" />
        </button>
      </div>
    </nav>
  );
}
