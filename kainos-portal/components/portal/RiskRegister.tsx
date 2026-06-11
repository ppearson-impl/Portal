import type { Risk } from '@/lib/types';
import { Badge } from '@/components/canvas/Badge';

const severityVariant: Record<Risk['severity'], 'green' | 'blue' | 'amber' | 'red' | 'grey'> = {
  low: 'green', medium: 'amber', high: 'red', critical: 'red',
};

interface RiskRegisterProps {
  risks: Risk[];
}

export function RiskRegister({ risks }: RiskRegisterProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left">
        <thead>
          <tr className="border-b border-[var(--canvas-licorice-200)] text-[var(--canvas-licorice-400)] uppercase tracking-wide">
            <th className="pb-2 pr-4 font-medium">Risk</th>
            <th className="pb-2 pr-4 font-medium">Severity</th>
            <th className="pb-2 pr-4 font-medium">Likelihood</th>
            <th className="pb-2 pr-4 font-medium">Owner</th>
            <th className="pb-2 pr-4 font-medium">Mitigation</th>
            <th className="pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((r) => (
            <tr
              key={r.id}
              className={`border-b border-[var(--canvas-licorice-200)] ${r.severity === 'high' || r.severity === 'critical' ? 'bg-[var(--canvas-cantaloupe-100)]' : ''}`}
            >
              <td className="py-2 pr-4">
                <div className="font-medium text-[var(--canvas-licorice-600)]">{r.title}</div>
                <div className="text-[var(--canvas-licorice-400)] mt-0.5">{r.description}</div>
              </td>
              <td className="py-2 pr-4">
                <Badge label={r.severity} variant={severityVariant[r.severity]} />
              </td>
              <td className="py-2 pr-4 capitalize text-[var(--canvas-licorice-500)]">{r.likelihood}</td>
              <td className="py-2 pr-4 text-[var(--canvas-licorice-500)]">{r.owner}</td>
              <td className="py-2 pr-4 text-[var(--canvas-licorice-400)]">{r.mitigationAction}</td>
              <td className="py-2">
                <Badge
                  label={r.status}
                  variant={r.status === 'open' ? 'amber' : r.status === 'mitigated' ? 'blue' : 'green'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
