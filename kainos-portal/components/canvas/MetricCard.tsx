type SubVariant = 'muted' | 'green' | 'amber' | 'red';

const subColour: Record<SubVariant, string> = {
  muted: 'text-[var(--canvas-licorice-400)]',
  green: 'text-[var(--canvas-sourpatch-500)]',
  amber: 'text-[var(--canvas-cantaloupe-500)]',
  red:   'text-[var(--canvas-cinnamon-500)]',
};

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  subVariant?: SubVariant;
}

export function MetricCard({ label, value, sub, subVariant = 'muted' }: MetricCardProps) {
  return (
    <div className="bg-white border border-[var(--canvas-licorice-200)] rounded-[4px] px-5 py-4">
      <div className="text-[11px] uppercase tracking-wide text-[var(--canvas-licorice-400)] mb-1">{label}</div>
      <div className="text-2xl font-semibold text-[var(--canvas-licorice-600)]">{value}</div>
      {sub && <div className={`text-xs mt-1 ${subColour[subVariant]}`}>{sub}</div>}
    </div>
  );
}
