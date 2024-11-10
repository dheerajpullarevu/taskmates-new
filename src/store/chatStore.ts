import { create } from 'zustand';
import { ChatMessage, ChatRoom } from '../types/chat';

interface ChatState {
  chatRooms: ChatRoom[];
  messages: Record<string, ChatMessage[]>;
  loading: boolean;
  error: string | null;
  currentRoomId: string | null;
  fetchChatRooms: () => Promise<void>;
  fetchMessages: (roomId: string) => Promise<void>;
  sendMessage: (roomId: string, content: string, attachments?: string[]) => Promise<void>;
  markAsRead: (roomId: string) => Promise<void>;
  setCurrentRoom: (roomId: string | null) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chatRooms: [],
  messages: {},
  loading: false,
  error: null,
  currentRoomId: null,

  fetchChatRooms: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, fetch from API
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch chat rooms', loading: false });
    }
  },

  fetchMessages: async (roomId: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, fetch from API
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch messages', loading: false });
    }
  },

  sendMessage: async (roomId: string, content: string, attachments = []) => {
    set({ loading: true, error: null });
    try {
      const message: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        taskId: roomId,
        senderId: 'current-user-id', // In real app, get from auth
        recipientId: 'recipient-id', // In real app, get from chat room
        content,
        timestamp: new Date().toISOString(),
        read: false,
        attachments
      };

      set(state => ({
        messages: {
          ...state.messages,
          [roomId]: [...(state.messages[roomId] || []), message]
        },
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to send message', loading: false });
    }
  },

  markAsRead: async (roomId: string) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        messages: {
          ...state.messages,
          [roomId]: state.messages[roomId]?.map(msg => ({ ...msg, read: true })) || []
        },
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to mark messages as read', loading: false });
    }
  },

  setCurrentRoom: (roomId: string | null) => {
    set({ currentRoomId: roomId });
  }
}));