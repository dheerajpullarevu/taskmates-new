import { create } from 'zustand';
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, RegisterData } from '../types/user';
import { TEST_PHONE_NUMBER, TEST_OTP, TEST_USER } from '../config/testAuth';

const MASTER_ADMIN_PHONE = '+919916666560';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isMasterAdmin: boolean;
  loading: boolean;
  error: string | null;
  confirmationResult: any;
  sendOTP: (phoneNumber: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  createSubAdmin: (adminData: Omit<User, 'id'>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isMasterAdmin: false,
  loading: false,
  error: null,
  confirmationResult: null,

  sendOTP: async (phoneNumber: string) => {
    try {
      set({ loading: true, error: null });
      
      // For test account, simulate OTP send
      if (phoneNumber === TEST_PHONE_NUMBER) {
        set({ loading: false });
        return;
      }

      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible'
        });
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        (window as any).recaptchaVerifier
      );

      set({ confirmationResult, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  verifyOTP: async (otp: string) => {
    try {
      set({ loading: true, error: null });
      
      // For test account
      if (TEST_PHONE_NUMBER === TEST_USER.phoneNumber && otp === TEST_OTP) {
        set({ 
          user: TEST_USER,
          isAuthenticated: true,
          isMasterAdmin: TEST_USER.phoneNumber === MASTER_ADMIN_PHONE,
          loading: false 
        });
        return;
      }

      const { confirmationResult } = get();
      
      if (!confirmationResult) {
        throw new Error('No confirmation result found');
      }

      const result = await confirmationResult.confirm(otp);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        set({ 
          user: userData, 
          isAuthenticated: true,
          isMasterAdmin: userData.phoneNumber === MASTER_ADMIN_PHONE,
          loading: false 
        });
      } else {
        // For master admin's first login
        if (result.user.phoneNumber === MASTER_ADMIN_PHONE) {
          const masterAdminData: User = {
            id: result.user.uid,
            name: 'Master Admin',
            email: 'master@taskmates.in',
            phoneNumber: MASTER_ADMIN_PHONE,
            role: 'master_admin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'users', result.user.uid), masterAdminData);
          set({ 
            user: masterAdminData, 
            isAuthenticated: true, 
            isMasterAdmin: true,
            loading: false 
          });
        } else {
          throw new Error('User data not found');
        }
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      // Implement email/password login if needed
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await auth.signOut();
      set({ 
        user: null, 
        isAuthenticated: false, 
        isMasterAdmin: false,
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  register: async (userData: RegisterData) => {
    try {
      set({ loading: true, error: null });
      // In real app, implement user registration
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createSubAdmin: async (adminData: Omit<User, 'id'>) => {
    try {
      set({ loading: true, error: null });
      const { user, isMasterAdmin } = get();

      if (!user || !isMasterAdmin) {
        throw new Error('Unauthorized access');
      }

      const adminId = Math.random().toString(36).substr(2, 9);
      const newAdmin: User = {
        id: adminId,
        ...adminData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', adminId), newAdmin);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));