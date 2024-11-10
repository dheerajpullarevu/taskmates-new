export type TaskType = 'single_taker' | 'multi_taker';
export type TaskTargetType = 'quantity' | 'amount' | 'both';
export type TaskLocation = 'online' | 'location_based';
export type TaskStatus = 'open' | 'assigned' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'online' | 'offline' | 'specialized';

export interface TaskApplication {
  userId: string;
  coverLetter: string;
  proposedPrice?: number;
  estimatedDuration?: number;
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface TaskTarget {
  type: TaskTargetType;
  quantity?: number;
  amount?: number;
  completedQuantity: number;
  completedAmount: number;
}

export interface TaskPricing {
  basePrice: number;
  suggestedPrice?: number;
  priceRange: {
    min: number;
    max: number;
  };
  platformFee: number;
  gst: number;
  totalAmount: number;
}

export interface TaskProgress {
  totalTakers: number;
  completedTasks: number;
  pendingTasks: number;
  rejectedTasks: number;
  totalEarnings: number;
  averageRating: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  budget: number;
  deadline: string;
  createdAt: string;
  taskGiverId: string;
  skills: string[];
  location?: {
    address: string;
    latitude: number;
    longitude: number;
  };
  applications: TaskApplication[];
  taskTakers: {
    userId: string;
    status: TaskStatus;
    assignedAt: string;
    completedAt?: string;
    earnings?: number;
    rating?: number;
    review?: string;
  }[];
}