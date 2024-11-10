export type UserRole = 'user' | 'admin' | 'support' | 'master_admin';
export type VerificationStatus = 'unverified' | 'pending' | 'verified';
export type BadgeType = 'top_rated' | 'verified' | 'expert' | 'rising_star';

export interface UserBadge {
  type: BadgeType;
  earnedAt: string;
  description: string;
}

export interface WorkHistory {
  id: string;
  title: string;
  description: string;
  category: string;
  completedAt: string;
  rating?: number;
  review?: string;
  clientId: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  link?: string;
  createdAt: string;
}

export interface UserVerification {
  status: VerificationStatus;
  documents: {
    id: string;
    type: 'id_proof' | 'address_proof' | 'professional_cert';
    url: string;
    status: VerificationStatus;
    submittedAt: string;
    verifiedAt?: string;
  }[];
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  permissions?: string[];
  createdAt: string;
  updatedAt: string;
  lastActive?: string;
  avatar?: string;
  activeRole?: 'taskgiver' | 'tasktaker';
  roles?: ('taskgiver' | 'tasktaker')[];
  rating?: number;
  tasksCompleted?: number;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    latitude: number;
    longitude: number;
  };
  wallet?: {
    balance: number;
    transactions: Transaction[];
  };
  // New fields
  bio?: string;
  skills?: string[];
  languages?: string[];
  education?: {
    degree: string;
    institution: string;
    year: number;
  }[];
  workHistory?: WorkHistory[];
  portfolio?: PortfolioItem[];
  verification?: UserVerification;
  badges?: UserBadge[];
  profileCompletion?: {
    percentage: number;
    missingFields: string[];
  };
  socialLinks?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'task_payment' | 'task_earning';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

export interface RegisterData {
  name: string;
  email: string;
  roles: ('taskgiver' | 'tasktaker')[];
  activeRole: 'taskgiver' | 'tasktaker';
}