import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import OTPVerification from './OTPVerification';
import { TEST_PHONE_NUMBER } from '../../config/testAuth';

const PhoneVerification = () => {
  const [verificationMethod, setVerificationMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { sendOTP, isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Always keep the +91 prefix
    if (!value.startsWith('+91')) {
      value = '+91';
    }
    
    // Remove any non-digit characters after +91
    const digits = value.slice(3).replace(/\D/g, '');
    
    // Limit to 10 digits after +91
    if (digits.length <= 10) {
      setPhoneNumber(`+91${digits}`);
    }
  };

  const handleVerificationStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (verificationMethod === 'phone') {
        // Validate phone number
        if (phoneNumber.length !== 13) {
          setError('Please enter a valid 10-digit mobile number');
          return;
        }

        await sendOTP(phoneNumber);
        setShowOTP(true);
      } else {
        // Validate email
        if (!email || !email.includes('@')) {
          setError('Please enter a valid email address');
          return;
        }

        // In real app, implement email verification
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowOTP(true);
      }
    } catch (error: any) {
      if (error.code === 'auth/billing-not-enabled') {
        setError('Phone verification is temporarily unavailable. Please use email verification.');
        setVerificationMethod('email');
      } else {
        setError(error.message || 'Verification failed. Please try again.');
      }
    }
  };

  const handleVerificationComplete = () => {
    // Navigation will be handled by the useEffect hook when isAuthenticated changes
  };

  if (showOTP) {
    return (
      <OTPVerification
        phoneNumber={verificationMethod === 'phone' ? phoneNumber : undefined}
        email={verificationMethod === 'email' ? email : undefined}
        onVerificationComplete={handleVerificationComplete}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          {verificationMethod === 'phone' ? (
            <Phone className="h-8 w-8 text-blue-600" />
          ) : (
            <Mail className="h-8 w-8 text-blue-600" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Identity</h2>
        <p className="mt-2 text-sm text-gray-600">
          {verificationMethod === 'phone'
            ? "We'll send you a verification code to confirm your phone number"
            : "We'll send you a verification code to your email"}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setVerificationMethod('phone')}
            className={`flex items-center px-4 py-2 rounded-md ${
              verificationMethod === 'phone'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Phone className="h-4 w-4 mr-2" />
            Phone
          </button>
          <button
            onClick={() => setVerificationMethod('email')}
            className={`flex items-center px-4 py-2 rounded-md ${
              verificationMethod === 'email'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </button>
        </div>
      </div>

      <form onSubmit={handleVerificationStart} className="space-y-6">
        {verificationMethod === 'phone' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="+91 9876543210"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-12"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                +91
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Enter your 10-digit mobile number with country code (+91)
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full btn"
          disabled={
            verificationMethod === 'phone'
              ? phoneNumber.length !== 13
              : !email.includes('@')
          }
        >
          Send Verification Code
        </button>
      </form>

      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneVerification;