import type { TeamMember } from '@/lib/types';
import { Avatar } from '@/components/canvas/Avatar';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="bg-white border border-[var(--canvas-licorice-200)] rounded-[4px] p-4 flex items-start gap-3">
      <Avatar initials={member.initials} />
      <div className="min-w-0">
        <div className="text-sm font-medium text-[var(--canvas-licorice-600)] truncate">{member.name}</div>
        <div className="text-xs text-[var(--canvas-licorice-400)] mb-1">{member.role}</div>
        <a href={`mailto:${member.email}`} className="text-xs text-[var(--canvas-blueberry-400)] hover:underline truncate block">
          {member.email}
        </a>
      </div>
    </div>
  );
}
