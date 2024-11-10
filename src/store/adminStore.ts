import { create } from 'zustand';
import { AdminUser, SupportTicket } from '../types/admin';

interface AdminState {
  adminUsers: AdminUser[];
  supportTickets: SupportTicket[];
  loading: boolean;
  error: string | null;
  fetchAdminUsers: () => Promise<void>;
  fetchSupportTickets: () => Promise<void>;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => Promise<void>;
  assignTicket: (ticketId: string, adminId: string) => Promise<void>;
  addTicketMessage: (ticketId: string, message: string, attachments?: string[]) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  adminUsers: [],
  supportTickets: [],
  loading: false,
  error: null,

  fetchAdminUsers: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, fetch from API
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch admin users', loading: false });
    }
  },

  fetchSupportTickets: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, fetch from API
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch support tickets', loading: false });
    }
  },

  updateTicketStatus: async (ticketId, status) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        supportTickets: state.supportTickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, status } : ticket
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update ticket status', loading: false });
    }
  },

  assignTicket: async (ticketId, adminId) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        supportTickets: state.supportTickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, assignedTo: adminId } : ticket
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to assign ticket', loading: false });
    }
  },

  addTicketMessage: async (ticketId, content, attachments = []) => {
    set({ loading: true, error: null });
    try {
      const message = {
        id: Math.random().toString(36).substr(2, 9),
        senderId: 'current-admin-id', // In real app, get from auth
        content,
        timestamp: new Date().toISOString(),
        attachments
      };

      set(state => ({
        supportTickets: state.supportTickets.map(ticket =>
          ticket.id === ticketId
            ? { ...ticket, messages: [...ticket.messages, message] }
            : ticket
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add message', loading: false });
    }
  }
}));