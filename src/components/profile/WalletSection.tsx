import React, { useState } from 'react';
import { Wallet, CreditCard, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Transaction } from '../../types/user';

const WalletSection = () => {
  const { user, updateWallet } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [showDeposit, setShowDeposit] = useState(false);

  if (!user) return null;

  const handleDeposit = async () => {
    try {
      await updateWallet({
        type: 'deposit',
        amount: Number(amount),
        description: 'Wallet deposit',
        status: 'completed'
      });
      setAmount('');
      setShowDeposit(false);
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Wallet className="h-5 w-5 mr-2" />
          Wallet
        </h2>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">Available Balance</p>
            <p className="text-3xl font-bold text-gray-900">
              ${user.wallet.balance.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => setShowDeposit(!showDeposit)}
            className="btn"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Add Money
          </button>
        </div>

        {showDeposit && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={handleDeposit}
                className="btn"
                disabled={!amount || Number(amount) <= 0}
              >
                Deposit
              </button>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {user.wallet.transactions.map((transaction: Transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  {transaction.type === 'deposit' || transaction.type === 'task_earning' ? (
                    <ArrowUpCircle className="h-8 w-8 text-green-500 mr-3" />
                  ) : (
                    <ArrowDownCircle className="h-8 w-8 text-red-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.timestamp)}</p>
                  </div>
                </div>
                <span className={`font-medium ${
                  transaction.type === 'deposit' || transaction.type === 'task_earning'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' || transaction.type === 'task_earning' ? '+' : '-'}
                  ${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSection;