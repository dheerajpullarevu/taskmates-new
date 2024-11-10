import React from 'react';
import { Shield, Lock, Scale } from 'lucide-react';

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Legal Information
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Important legal documents and policies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Privacy Policy</h3>
            <p className="mt-2 text-gray-500">How we protect and handle your data</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Lock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Terms of Service</h3>
            <p className="mt-2 text-gray-500">Rules and guidelines for using TaskMates</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Scale className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">User Agreement</h3>
            <p className="mt-2 text-gray-500">Your rights and responsibilities</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <h2>Terms of Service</h2>
            <p>Last updated: March 15, 2024</p>
            
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using TaskMates, you agree to be bound by these Terms of Service...</p>
            
            <h3>2. User Responsibilities</h3>
            <p>Users must maintain accurate profile information and follow community guidelines...</p>
            
            <h3>3. Payment Terms</h3>
            <p>TaskMates processes payments securely and holds funds in escrow until task completion...</p>
            
            <h3>4. Privacy Policy</h3>
            <p>We collect and process personal data as described in our Privacy Policy...</p>
            
            <h3>5. Dispute Resolution</h3>
            <p>In case of disputes between users, TaskMates provides mediation services...</p>
            
            <h3>6. Intellectual Property</h3>
            <p>Users retain rights to their content while granting TaskMates license to use...</p>
            
            <h3>7. Limitation of Liability</h3>
            <p>TaskMates is not liable for disputes between users or task outcomes...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;