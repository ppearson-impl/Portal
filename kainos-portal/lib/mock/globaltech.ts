import type { ProjectDetail, FinancialsPayload, Milestone, Risk, TeamMember, Document } from '../types';

export const globaltechProject: ProjectDetail = {
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
  phases: [
    {
      number: 1, name: 'Discovery & design',
      startDate: '2025-06-01', endDate: '2025-08-31',
      status: 'complete', progress: 100, statusTag: 'green',
      tags: ['Complete', '14 workshops delivered'],
    },
    {
      number: 2, name: 'Configuration',
      startDate: '2025-09-01', endDate: '2025-10-31',
      status: 'complete', progress: 100, statusTag: 'green',
      tags: ['Complete', 'HCM core & payroll configured'],
    },
    {
      number: 3, name: 'Integration build',
      startDate: '2025-11-01', endDate: '2026-01-31',
      status: 'active', progress: 60, statusTag: 'amber',
      tags: ['In progress — 60%', 'Payroll API — at risk'],
    },
    {
      number: 4, name: 'Testing & parallel run',
      startDate: '2026-01-01', endDate: '2026-02-28',
      status: 'upcoming', progress: 0, statusTag: 'grey',
      tags: ['Not started', 'UAT + parallel payroll'],
    },
    {
      number: 5, name: 'Go-live & hypercare',
      startDate: '2026-03-03', endDate: '2026-03-31',
      status: 'upcoming', progress: 0, statusTag: 'grey',
      tags: ['Not started', 'Target: 3 Mar 2026'],
    },
  ],
  recentUpdates: [
    {
      id: '1', author: 'James Morton', authorInitials: 'JM',
      message: 'Payroll API connection issue raised — working with vendor. ETA confirmed for 15 Jan.',
      timestamp: '2026-01-09T09:14:00Z',
    },
    {
      id: '2', author: 'Sunita Rao', authorInitials: 'SR',
      message: 'Integration build week 4 complete. 6 of 10 connectors signed off.',
      timestamp: '2026-01-08T16:30:00Z',
    },
    {
      id: '3', author: 'Kate Wilson', authorInitials: 'KW',
      message: 'Steering group pack sent — January session confirmed for 12th.',
      timestamp: '2026-01-06T11:00:00Z',
    },
  ],
};

export const globaltechFinancials: FinancialsPayload = {
  projectId: 'globaltech-hcm-emea',
  periodLabel: 'Nov – Dec 2025',
  ev: {
    cpi: 0.975, spi: 0.975,
    cv: -6400, sv: -6400,
    eac: 498000, vac: -18000, bac: 480000,
    hoursConsumed: 1024, hoursRemaining: 896, hoursContracted: 1920,
    amountSpent: 256000, earnedValue: 249600,
  },
  burnSeries: [
    { period: 'Jun', plannedValue: 0,    earnedValue: 0,    actualCost: 0,    forecast: null },
    { period: 'Jul', plannedValue: 96,   earnedValue: 90,   actualCost: 95,   forecast: null },
    { period: 'Aug', plannedValue: 192,  earnedValue: 185,  actualCost: 192,  forecast: null },
    { period: 'Sep', plannedValue: 384,  earnedValue: 370,  actualCost: 380,  forecast: null },
    { period: 'Oct', plannedValue: 576,  earnedValue: 558,  actualCost: 572,  forecast: null },
    { period: 'Nov', plannedValue: 768,  earnedValue: 745,  actualCost: 762,  forecast: null },
    { period: 'Dec', plannedValue: 960,  earnedValue: 935,  actualCost: 960,  forecast: 960  },
    { period: 'Jan', plannedValue: 1152, earnedValue: null, actualCost: null, forecast: 1088 },
    { period: 'Feb', plannedValue: 1536, earnedValue: null, actualCost: null, forecast: 1440 },
    { period: 'Mar', plannedValue: 1920, earnedValue: null, actualCost: null, forecast: 1992 },
  ],
  workstreams: [
    { name: 'Architecture',    budgetHours: 400, usedHours: 340, colour: '#0875e1' },
    { name: 'HCM config',      budgetHours: 480, usedHours: 480, colour: '#0db442' },
    { name: 'Integration',     budgetHours: 200, usedHours: 124, colour: '#0875e1' },
    { name: 'Testing',         budgetHours: 300, usedHours: 54,  colour: '#c5cdd6' },
    { name: 'Change mgmt',     budgetHours: 240, usedHours: 26,  colour: '#c5cdd6' },
    { name: 'PM & governance', budgetHours: 300, usedHours: 300, colour: '#de2020' },
  ],
  roleHours: [
    { role: 'Principal architect', rateGBP: 175, hoursThisPeriod: 48, budgetThisPeriod: 40,
      varianceHours: 8, cumulativeUsed: 340, cumulativeBudget: 400, colour: '#0875e1' },
    { role: 'Senior consultant',   rateGBP: 145, hoursThisPeriod: 62, budgetThisPeriod: 64,
      varianceHours: -2, cumulativeUsed: 280, cumulativeBudget: 360, colour: '#0db442' },
    { role: 'Integration dev',     rateGBP: 130, hoursThisPeriod: 44, budgetThisPeriod: 40,
      varianceHours: 4, cumulativeUsed: 124, cumulativeBudget: 200, colour: '#4a5568' },
    { role: 'Test analyst',        rateGBP: 110, hoursThisPeriod: 18, budgetThisPeriod: 20,
      varianceHours: -2, cumulativeUsed: 54, cumulativeBudget: 300, colour: '#c5cdd6' },
    { role: 'Project manager',     rateGBP: 155, hoursThisPeriod: 32, budgetThisPeriod: 28,
      varianceHours: 4, cumulativeUsed: 300, cumulativeBudget: 300, colour: '#de2020' },
    { role: 'Change mgmt lead',    rateGBP: 125, hoursThisPeriod: 8,  budgetThisPeriod: 12,
      varianceHours: -4, cumulativeUsed: 26, cumulativeBudget: 240, colour: '#c5cdd6' },
  ],
};

export const globaltechMilestones: Milestone[] = [
  { id: 'm1', name: 'Discovery sign-off', targetDate: '2025-08-31', status: 'complete' },
  { id: 'm2', name: 'Configuration sign-off', targetDate: '2025-10-31', status: 'complete' },
  { id: 'm3', name: 'Integration build complete', targetDate: '2026-01-31', status: 'at-risk', notes: 'Payroll API dependency unresolved' },
  { id: 'm4', name: 'UAT kick-off', targetDate: '2026-01-15', status: 'upcoming' },
  { id: 'm5', name: 'Parallel payroll run 1', targetDate: '2026-02-07', status: 'upcoming' },
  { id: 'm6', name: 'Go/no-go decision', targetDate: '2026-02-21', status: 'upcoming' },
  { id: 'm7', name: 'Go-live', targetDate: '2026-03-03', status: 'upcoming' },
];

export const globaltechRisks: Risk[] = [
  {
    id: 'r1', title: 'Payroll API vendor delay',
    description: 'Third-party payroll vendor has not resolved API authentication issue affecting integration build.',
    severity: 'high', likelihood: 'medium',
    owner: 'James Morton', mitigationAction: 'Vendor escalation raised; manual fallback process defined.',
    status: 'open', raisedDate: '2026-01-09',
  },
  {
    id: 'r2', title: 'UAT resource availability',
    description: 'Client UAT team has reduced capacity in February due to year-end close.',
    severity: 'medium', likelihood: 'high',
    owner: 'Sarah Mitchell', mitigationAction: 'Phased UAT plan agreed; critical path scenarios prioritised.',
    status: 'mitigated', raisedDate: '2025-12-15',
  },
  {
    id: 'r3', title: 'Data migration quality',
    description: 'Legacy HR data quality issues may require additional cleansing before migration.',
    severity: 'medium', likelihood: 'low',
    owner: 'Sunita Rao', mitigationAction: 'Data audit complete; 340 records flagged for manual review.',
    status: 'open', raisedDate: '2025-11-20',
  },
];

export const globaltechTeam: TeamMember[] = [
  { id: 't1', name: 'Kate Wilson', initials: 'KW', role: 'Project Manager', email: 'kate.wilson@kainos.com', isKainos: true },
  { id: 't2', name: 'James Morton', initials: 'JM', role: 'Principal Architect', email: 'james.morton@kainos.com', isKainos: true },
  { id: 't3', name: 'Sunita Rao', initials: 'SR', role: 'Senior Consultant', email: 'sunita.rao@kainos.com', isKainos: true },
  { id: 't4', name: 'Tom Bridges', initials: 'TB', role: 'Integration Developer', email: 'tom.bridges@kainos.com', isKainos: true },
  { id: 't5', name: 'Amy Chen', initials: 'AC', role: 'Test Analyst', email: 'amy.chen@kainos.com', isKainos: true },
  { id: 't6', name: 'Sarah Mitchell', initials: 'SM', role: 'Programme Director', email: 'sarah.mitchell@globaltech.com', isKainos: false },
  { id: 't7', name: 'David Osei', initials: 'DO', role: 'HR Systems Lead', email: 'david.osei@globaltech.com', isKainos: false },
  { id: 't8', name: 'Priya Nair', initials: 'PN', role: 'Payroll Manager', email: 'priya.nair@globaltech.com', isKainos: false },
];

export const globaltechDocuments: Document[] = [
  { id: 'd1', name: 'Project Initiation Document', type: 'PDF', uploadedDate: '2025-06-05', uploadedBy: 'Kate Wilson', url: '#' },
  { id: 'd2', name: 'Discovery & Design Sign-off', type: 'PDF', uploadedDate: '2025-08-31', uploadedBy: 'James Morton', url: '#' },
  { id: 'd3', name: 'Configuration Specification', type: 'DOCX', uploadedDate: '2025-10-15', uploadedBy: 'Sunita Rao', url: '#' },
  { id: 'd4', name: 'Integration Build Plan — Phase 3', type: 'PDF', uploadedDate: '2025-11-03', uploadedBy: 'Tom Bridges', url: '#' },
  { id: 'd5', name: 'Steering Group Deck — January 2026', type: 'PPTX', uploadedDate: '2026-01-06', uploadedBy: 'Kate Wilson', url: '#' },
];
