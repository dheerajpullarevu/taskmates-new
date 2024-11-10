import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import PhoneVerification from '../components/auth/PhoneVerification';
import { BriefcaseIcon } from 'lucide-react';

const LoginPage = () => {
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BriefcaseIcon className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to TaskMates
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                authMethod === 'phone'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Phone Number
            </button>
            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                authMethod === 'email'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Email
            </button>
          </div>

          {authMethod === 'phone' ? (
            <PhoneVerification />
          ) : (
            <>
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 text-center text-sm font-medium ${
                    isLogin
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 text-center text-sm font-medium ${
                    !isLogin
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {isLogin ? <LoginForm /> : <RegisterForm />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;