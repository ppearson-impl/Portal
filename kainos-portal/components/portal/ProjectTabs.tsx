'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProjectTabsProps {
  projectId: string;
}

const TAB_DEFS = [
  { label: 'Overview',          path: 'overview' },
  { label: 'Financials',        path: 'financials' },
  { label: 'Milestones & risks', path: 'milestones' },
  { label: 'Documents',         path: 'documents' },
  { label: 'Team',              path: 'team' },
];

export function ProjectTabs({ projectId }: ProjectTabsProps) {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-[var(--canvas-licorice-200)] px-6 flex gap-0">
      {TAB_DEFS.map((tab) => {
        const href = `/projects/${projectId}/${tab.path}`;
        const active = pathname.startsWith(href);
        return (
          <Link
            key={tab.path}
            href={href}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              active
                ? 'border-[var(--canvas-blueberry-400)] text-[var(--canvas-blueberry-400)]'
                : 'border-transparent text-[var(--canvas-licorice-400)] hover:text-[var(--canvas-licorice-600)]'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
