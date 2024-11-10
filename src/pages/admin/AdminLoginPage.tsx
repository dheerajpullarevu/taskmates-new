import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Shield, AlertCircle } from 'lucide-react';

const AdminLoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [error, setError] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { sendOTP, verifyOTP, isAuthenticated, isMasterAdmin } = useAuthStore();

  // Redirect if already authenticated as admin
  React.useEffect(() => {
    if (isAuthenticated && isMasterAdmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, isMasterAdmin, navigate]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+91')) {
      value = '+91';
    }
    const digits = value.slice(3).replace(/\D/g, '');
    if (digits.length <= 10) {
      setPhoneNumber(`+91${digits}`);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (phoneNumber.length !== 13) {
        setError('Please enter a valid 10-digit mobile number');
        return;
      }

      await sendOTP(phoneNumber);
      setShowOTP(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await verifyOTP(otp);
      
      // The user store will handle the redirection if the user is an admin
      // If not an admin, show error
      if (!isMasterAdmin) {
        setError('You do not have admin privileges');
      }
    } catch (error: any) {
      setError(error.message || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure access for TaskMates administrators
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!showOTP ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Admin Phone Number
                </label>
                <div className="mt-1 relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 9916666560"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Enter your registered admin phone number
                </p>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Enter the 6-digit code sent to your phone
                </p>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowOTP(false)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Change Phone Number
                </button>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Resend OTP
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify & Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;