export type RAGStatus = 'green' | 'amber' | 'red' | 'grey';
export type PhaseStatus = 'complete' | 'active' | 'upcoming';
export type MilestoneStatus = 'complete' | 'upcoming' | 'at-risk' | 'overdue';
export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Project {
  id: string;
  name: string;
  client: string;
  region: string;
  goLiveDate: string;
  currentPhase: number;
  totalPhases: number;
  overallProgress: number;
  contractType: 'T&M' | 'fixed-price' | 'hybrid';
  health: {
    schedule: RAGStatus;
    budget: RAGStatus;
    scope: RAGStatus;
    risks: RAGStatus;
  };
  openRisks: number;
  openActions: number;
  weeksRemaining: number;
}

export interface Phase {
  number: number;
  name: string;
  startDate: string;
  endDate: string;
  status: PhaseStatus;
  progress: number;
  tags: string[];
  statusTag: RAGStatus;
}

export interface BurnPoint {
  period: string;
  plannedValue: number | null;
  earnedValue: number | null;
  actualCost: number | null;
  forecast: number | null;
}

export interface Workstream {
  name: string;
  budgetHours: number;
  usedHours: number;
  colour: string;
}

export interface EVMetrics {
  cpi: number;
  spi: number;
  cv: number;
  sv: number;
  eac: number;
  vac: number;
  bac: number;
  hoursConsumed: number;
  hoursRemaining: number;
  hoursContracted: number;
  amountSpent: number;
  earnedValue: number;
}

export interface RoleHours {
  role: string;
  rateGBP: number;
  hoursThisPeriod: number;
  budgetThisPeriod: number;
  varianceHours: number;
  cumulativeUsed: number;
  cumulativeBudget: number;
  colour: string;
}

export interface Milestone {
  id: string;
  name: string;
  targetDate: string;
  status: MilestoneStatus;
  notes?: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  severity: RiskSeverity;
  likelihood: 'low' | 'medium' | 'high';
  owner: string;
  mitigationAction: string;
  status: 'open' | 'mitigated' | 'closed';
  raisedDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  isKainos: boolean;
}

export interface ProjectUpdate {
  id: string;
  author: string;
  authorInitials: string;
  message: string;
  timestamp: string;
}

export interface ProjectDetail extends Project {
  phases: Phase[];
  recentUpdates: ProjectUpdate[];
}

export interface FinancialsPayload {
  projectId: string;
  periodLabel: string;
  ev: EVMetrics;
  burnSeries: BurnPoint[];
  workstreams: Workstream[];
  roleHours: RoleHours[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedDate: string;
  uploadedBy: string;
  url: string;
}
