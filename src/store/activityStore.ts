import { create } from 'zustand';
import { ActivityLog, ActivityType } from '../types/activity';
import { db } from '../config/firebase';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

interface ActivityState {
  logs: ActivityLog[];
  loading: boolean;
  error: string | null;
  logActivity: (type: ActivityType, description: string, metadata?: Record<string, any>) => Promise<void>;
  fetchUserActivities: (userId: string, limit?: number) => Promise<void>;
  fetchAdminLogs: (filters?: { severity?: string; type?: string }) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  logs: [],
  loading: false,
  error: null,

  logActivity: async (type, description, metadata = {}) => {
    try {
      const log: Omit<ActivityLog, 'id'> = {
        userId: 'current-user-id', // Replace with actual user ID
        type,
        description,
        metadata,
        ipAddress: await fetch('https://api.ipify.org?format=json').then(r => r.json()).then(data => data.ip),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        severity: 'info'
      };

      const docRef = await addDoc(collection(db, 'activity_logs'), log);
      
      set(state => ({
        logs: [...state.logs, { ...log, id: docRef.id }]
      }));
    } catch (error: any) {
      console.error('Failed to log activity:', error);
    }
  },

  fetchUserActivities: async (userId: string, limitCount = 50) => {
    set({ loading: true, error: null });
    try {
      const q = query(
        collection(db, 'activity_logs'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ActivityLog[];

      set({ logs, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAdminLogs: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      let q = query(
        collection(db, 'activity_logs'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      if (filters.severity) {
        q = query(q, where('severity', '==', filters.severity));
      }

      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }

      const snapshot = await getDocs(q);
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ActivityLog[];

      set({ logs, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));