import type { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'globaltech-hcm-emea',
    name: 'Workday HCM Implementation',
    client: 'GlobalTech Industries',
    region: 'EMEA',
    goLiveDate: '2026-03-03',
    currentPhase: 3,
    totalPhases: 5,
    overallProgress: 52,
    contractType: 'T&M',
    health: { schedule: 'green', budget: 'amber', scope: 'amber', risks: 'amber' },
    openRisks: 1,
    openActions: 7,
    weeksRemaining: 18,
  },
];
