import React, { useState } from 'react';
import { Bank, CreditCard, Plus } from 'lucide-react';
import { BankAccount, UPIAccount } from '../../types/wallet';

interface PaymentMethodsProps {
  bankAccounts: BankAccount[];
  upiAccounts: UPIAccount[];
  onAddBank: (data: Omit<BankAccount, 'id' | 'verified' | 'primary' | 'createdAt'>) => Promise<void>;
  onAddUPI: (data: Omit<UPIAccount, 'id' | 'verified' | 'primary' | 'createdAt'>) => Promise<void>;
  onSetPrimary: (type: 'bank' | 'upi', id: string) => Promise<void>;
  onRemove: (type: 'bank' | 'upi', id: string) => Promise<void>;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  bankAccounts,
  upiAccounts,
  onAddBank,
  onAddUPI,
  onSetPrimary,
  onRemove
}) => {
  const [showAddBank, setShowAddBank] = useState(false);
  const [showAddUPI, setShowAddUPI] = useState(false);
  const [newBank, setNewBank] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    bankName: ''
  });
  const [newUPI, setNewUPI] = useState({
    upiId: ''
  });

  const handleAddBank = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddBank(newBank);
      setShowAddBank(false);
      setNewBank({
        accountNumber: '',
        ifscCode: '',
        accountHolderName: '',
        bankName: ''
      });
    } catch (error) {
      console.error('Failed to add bank account:', error);
    }
  };

  const handleAddUPI = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddUPI(newUPI);
      setShowAddUPI(false);
      setNewUPI({ upiId: '' });
    } catch (error) {
      console.error('Failed to add UPI:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Bank Accounts */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Bank Accounts</h3>
            <button
              onClick={() => setShowAddBank(true)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Bank Account
            </button>
          </div>

          <div className="space-y-4">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center">
                  <Bank className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{account.bankName}</p>
                    <p className="text-sm text-gray-500">
                      Account ending in {account.accountNumber.slice(-4)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {account.primary ? (
                    <span className="text-sm text-green-600">Primary</span>
                  ) : (
                    <button
                      onClick={() => onSetPrimary('bank', account.id)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Set as Primary
                    </button>
                  )}
                  <button
                    onClick={() => onRemove('bank', account.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UPI Accounts */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">UPI IDs</h3>
            <button
              onClick={() => setShowAddUPI(true)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add UPI ID
            </button>
          </div>

          <div className="space-y-4">
            {upiAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{account.upiId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {account.primary ? (
                    <span className="text-sm text-green-600">Primary</span>
                  ) : (
                    <button
                      onClick={() => onSetPrimary('upi', account.id)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Set as Primary
                    </button>
                  )}
                  <button
                    onClick={() => onRemove('upi', account.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Bank Account Modal */}
      {showAddBank && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add Bank Account</h3>
            <form onSubmit={handleAddBank} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                <input
                  type="text"
                  value={newBank.accountHolderName}
                  onChange={(e) => setNewBank({ ...newBank, accountHolderName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  value={newBank.accountNumber}
                  onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                <input
                  type="text"
                  value={newBank.ifscCode}
                  onChange={(e) => setNewBank({ ...newBank, ifscCode: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  value={newBank.bankName}
                  onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddBank(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add UPI Modal */}
      {showAddUPI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add UPI ID</h3>
            <form onSubmit={handleAddUPI} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                <input
                  type="text"
                  value={newUPI.upiId}
                  onChange={(e) => setNewUPI({ upiId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddUPI(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add UPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;