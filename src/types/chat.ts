export interface ChatMessage {
  id: string;
  taskId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface ChatRoom {
  id: string;
  taskId: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
}