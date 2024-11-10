import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface OTPVerificationProps {
  phoneNumber?: string;
  email?: string;
  onVerificationComplete: () => void;
}

const OTPVerification = ({ phoneNumber, email, onVerificationComplete }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { verifyOTP, isAuthenticated } = useAuthStore();

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError(null);

    try {
      const enteredOtp = otp.join('');
      await verifyOTP(enteredOtp);
      onVerificationComplete();
    } catch (error: any) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError(null);

    try {
      // In real app, implement resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError('New OTP has been sent');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification code to:
          <br />
          <span className="font-medium">{phoneNumber}</span>
          {email && (
            <>
              <br />
              <span className="font-medium">{email}</span>
            </>
          )}
        </p>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Enter verification code
        </label>
        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
          ))}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div className="space-y-4">
        <button
          onClick={handleVerify}
          disabled={loading || otp.some(digit => !digit)}
          className="w-full btn"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={loading}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;