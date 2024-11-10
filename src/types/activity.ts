export type ActivityType = 
  | 'login'
  | 'logout'
  | 'task_create'
  | 'task_update'
  | 'task_delete'
  | 'task_apply'
  | 'task_complete'
  | 'payment_initiated'
  | 'payment_completed'
  | 'profile_update'
  | 'category_create'
  | 'category_update'
  | 'category_delete'
  | 'admin_action';

export interface ActivityLog {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
}