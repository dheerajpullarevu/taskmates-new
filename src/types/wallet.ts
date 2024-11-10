import { Transaction } from './user';

export interface BankAccount {
  id: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  bankName: string;
  verified: boolean;
  primary: boolean;
  createdAt: string;
}

export interface UPIAccount {
  id: string;
  upiId: string;
  verified: boolean;
  primary: boolean;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethod: 'bank' | 'upi';
  bankAccountId?: string;
  upiAccountId?: string;
  transactionId?: string;
  createdAt: string;
  processedAt?: string;
  adminId?: string;
}

export interface AdminWalletStats {
  totalBalance: number;
  pendingWithdrawals: number;
  totalTransactions: number;
  dailyVolume: number;
}