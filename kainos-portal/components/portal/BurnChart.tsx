'use client';

import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { BurnPoint } from '@/lib/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BurnChartProps {
  burnSeries: BurnPoint[];
}

export function BurnChart({ burnSeries }: BurnChartProps) {
  const labels = burnSeries.map((b) => b.period);

  const datasets = [
    {
      label: 'Planned Value',
      data: burnSeries.map((b) => b.plannedValue),
      borderColor: '#0875e1',
      backgroundColor: 'transparent',
      tension: 0.3,
      pointRadius: 3,
    },
    {
      label: 'Earned Value',
      data: burnSeries.map((b) => b.earnedValue),
      borderColor: '#0db442',
      backgroundColor: 'transparent',
      tension: 0.3,
      pointRadius: 3,
    },
    {
      label: 'Actual Cost',
      data: burnSeries.map((b) => b.actualCost),
      borderColor: '#243040',
      backgroundColor: 'transparent',
      tension: 0.3,
      pointRadius: 3,
    },
    {
      label: 'Forecast',
      data: burnSeries.map((b) => b.forecast),
      borderColor: '#f5a623',
      backgroundColor: 'transparent',
      borderDash: [5, 5],
      tension: 0.3,
      pointRadius: 3,
    },
  ];

  return (
    <Line
      data={{ labels, datasets }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' as const },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          y: { title: { display: true, text: 'Hours' } },
        },
      }}
    />
  );
}
