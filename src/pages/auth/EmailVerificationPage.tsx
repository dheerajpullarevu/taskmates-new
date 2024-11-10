import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { verifyEmail, sendVerificationEmail } from '../../services/emailVerification';
import { useAuthStore } from '../../store/authStore';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (code) {
      verifyEmailWithCode(code);
    }
  }, [searchParams]);

  const verifyEmailWithCode = async (code: string) => {
    setVerifying(true);
    setError(null);
    try {
      await verifyEmail(code);
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    setError(null);
    try {
      await sendVerificationEmail(user?.email || '');
      // Show success message
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-red-600">Please log in to verify your email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mail className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {verifying ? (
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
              <p className="mt-2">Verifying your email...</p>
            </div>
          ) : success ? (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">Email Verified!</h3>
              <p className="mt-2 text-gray-500">
                Redirecting to your profile...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {error ? (
                <div className="text-center">
                  <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                  <h3 className="mt-2 text-xl font-medium text-gray-900">Verification Failed</h3>
                  <p className="mt-2 text-red-600">{error}</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500">
                    We've sent a verification email to:
                    <br />
                    <span className="font-medium text-gray-900">{user.email}</span>
                  </p>
                  <button
                    onClick={handleResendVerification}
                    className="mt-4 btn"
                  >
                    Resend Verification Email
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;