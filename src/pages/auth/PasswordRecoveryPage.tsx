import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Mail, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword'>('email');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSendRecoveryEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // In real app, implement password recovery email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
    } catch (error: any) {
      setError(error.message || 'Failed to send recovery email');
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // In real app, verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('newPassword');
    } catch (error: any) {
      setError(error.message || 'Invalid OTP');
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // In real app, reset password
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/login');
    } catch (error: any) {
      setError(error.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <KeyRound className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'email' && (
            <form onSubmit={handleSendRecoveryEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}

              <button
                type="submit"
                className="w-full btn"
              >
                Send Recovery Email
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}

              <button
                type="submit"
                className="w-full btn"
              >
                Verify OTP
              </button>
            </form>
          )}

          {step === 'newPassword' && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}

              <button
                type="submit"
                className="w-full btn"
              >
                Reset Password
              </button>
            </form>
          )}

          <div className="mt-6">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;