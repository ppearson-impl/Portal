import type { RoleHours } from '@/lib/types';

interface RoleHoursTableProps {
  roles: RoleHours[];
}

export function RoleHoursTable({ roles }: RoleHoursTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left">
        <thead>
          <tr className="border-b border-[var(--canvas-licorice-200)] text-[var(--canvas-licorice-400)] uppercase tracking-wide">
            <th className="pb-2 pr-3 font-medium">Role</th>
            <th className="pb-2 pr-3 font-medium text-right">Rate</th>
            <th className="pb-2 pr-3 font-medium text-right">This period</th>
            <th className="pb-2 pr-3 font-medium text-right">Budget</th>
            <th className="pb-2 pr-3 font-medium text-right">Variance</th>
            <th className="pb-2 pr-3 font-medium text-right">Cumulative</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => {
            const over = r.varianceHours > 0;
            return (
              <tr key={r.role} className="border-b border-[var(--canvas-licorice-200)] text-[var(--canvas-licorice-600)]">
                <td className="py-2 pr-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: r.colour }} />
                  {r.role}
                </td>
                <td className="py-2 pr-3 text-right">£{r.rateGBP}</td>
                <td className="py-2 pr-3 text-right">{r.hoursThisPeriod}h</td>
                <td className="py-2 pr-3 text-right">{r.budgetThisPeriod}h</td>
                <td className={`py-2 pr-3 text-right font-medium ${over ? 'text-[var(--canvas-cantaloupe-500)]' : 'text-[var(--canvas-sourpatch-500)]'}`}>
                  {over ? '+' : ''}{r.varianceHours}h
                </td>
                <td className="py-2 pr-3 text-right">
                  {r.cumulativeUsed}/{r.cumulativeBudget}h
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
