import type { EVMetrics as EVMetricsType } from '@/lib/types';

interface EVMetricsProps {
  ev: EVMetricsType;
}

function cell(label: string, value: string, good: boolean | null) {
  const colour =
    good === true  ? 'text-[var(--canvas-sourpatch-500)]' :
    good === false ? 'text-[var(--canvas-cinnamon-500)]' :
                     'text-[var(--canvas-licorice-600)]';
  return (
    <div key={label} className="bg-[var(--canvas-soap-200)] rounded-[4px] p-3">
      <div className="text-[11px] uppercase tracking-wide text-[var(--canvas-licorice-400)] mb-1">{label}</div>
      <div className={`text-lg font-semibold ${colour}`}>{value}</div>
    </div>
  );
}

export function EVMetrics({ ev }: EVMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {cell('CPI', ev.cpi.toFixed(3), ev.cpi >= 1)}
      {cell('SPI', ev.spi.toFixed(3), ev.spi >= 1)}
      {cell('CV', `£${ev.cv.toLocaleString()}`, ev.cv >= 0)}
      {cell('SV', `£${ev.sv.toLocaleString()}`, ev.sv >= 0)}
      {cell('EAC', `£${ev.eac.toLocaleString()}`, null)}
      {cell('VAC', `£${ev.vac.toLocaleString()}`, ev.vac >= 0)}
    </div>
  );
}
