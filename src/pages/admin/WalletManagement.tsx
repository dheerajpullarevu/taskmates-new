import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { WithdrawalRequest } from '../../types/wallet';
import { DollarSign, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const WalletManagement = () => {
  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(null);
  const { stats, withdrawalRequests, processWithdrawal } = useAdminStore();

  const handleProcessWithdrawal = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      await processWithdrawal(requestId, action);
    } catch (error) {
      console.error('Failed to process withdrawal:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Wallet Management</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-2xl font-semibold">${stats.totalBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Withdrawals</p>
              <p className="text-2xl font-semibold">${stats.pendingWithdrawals.toFixed(2)}</p>
            </div>
          </div>
        </div>
        {/* Add more stats cards */}
      </div>

      {/* Withdrawal Requests */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Withdrawal Requests</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {withdrawalRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">
                    Withdrawal Request #{request.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Amount: ${request.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Method: {request.paymentMethod.toUpperCase()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleProcessWithdrawal(request.id, 'approve')}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleProcessWithdrawal(request.id, 'reject')}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletManagement;