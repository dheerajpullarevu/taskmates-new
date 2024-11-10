export type AdminRole = 'admin' | 'support' | 'moderator';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
  lastActive: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  taskId?: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    attachments?: string[];
  }[];
}