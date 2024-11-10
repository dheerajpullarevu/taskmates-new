import React from 'react';
import { Shield, UserCheck, Lock, AlertTriangle } from 'lucide-react';

const SafetyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Safety First</h1>
          <p className="mt-4 text-xl text-gray-500">
            Your safety is our top priority. Learn about our comprehensive safety measures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg text-blue-600 mb-4">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Verified Users</h3>
            <p className="mt-2 text-gray-500">
              All users undergo thorough verification process
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg text-green-600 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Secure Payments</h3>
            <p className="mt-2 text-gray-500">
              All transactions are protected and insured
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg text-purple-600 mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Data Protection</h3>
            <p className="mt-2 text-gray-500">
              Your personal information is encrypted and secure
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg text-orange-600 mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
            <p className="mt-2 text-gray-500">
              Round-the-clock assistance for any concerns
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Verification Process</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Every TaskMates user goes through a comprehensive verification process:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Government ID verification</li>
                  <li>Phone number verification</li>
                  <li>Email verification</li>
                  <li>Address proof verification</li>
                  <li>Background checks for task takers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Protection</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our secure payment system ensures:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Escrow protection for all transactions</li>
                  <li>Payment release only after task completion</li>
                  <li>Fraud detection and prevention</li>
                  <li>Dispute resolution system</li>
                  <li>Insurance coverage for eligible tasks</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Support</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  In case of any emergency:
                </p>
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="font-medium text-red-800">Emergency Helpline: +91-9916666560</p>
                  <p className="text-red-600 mt-2">Available 24/7 for urgent assistance</p>
                </div>
                <p className="text-gray-600">
                  You can also reach us at:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Email: safety@taskmates.in</li>
                  <li>In-app emergency button</li>
                  <li>Live chat support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;