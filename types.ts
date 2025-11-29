export enum VerificationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  REVIEW = 'Review',
  COMPLETED = 'Completed',
  FAILED = 'Failed'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface VerificationCase {
  id: string;
  user: User;
  status: VerificationStatus;
  date: string; // ISO date string
  decisionTime?: string;
  template: 'Standard' | 'Enhanced';
  riskScore: number;
  country: string;
  documentType: string;
  documentNumber: string;
  address: string;
  dob: string;
}

export interface DashboardStats {
  todayVerifications: number;
  avgDecisionTime: string;
  approvalRate: number;
  pendingReview: number;
}
