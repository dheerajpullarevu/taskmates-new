import React from 'react';
import { Users2, Briefcase, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Tasks, Our Priority</span>
            <span className="block text-blue-600">Get More Done with TaskMates</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect with skilled professionals for any task. From quick deliveries to specialized services, 
            TaskMates helps you get things done efficiently and affordably.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Users2 className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Trusted Community</h3>
            <p className="mt-2 text-gray-500">Join thousands of verified TaskMates ready to help.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Briefcase className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Secure Payments</h3>
            <p className="mt-2 text-gray-500">Money is held safely until task completion.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Clock className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Quick Turnaround</h3>
            <p className="mt-2 text-gray-500">Get tasks done within hours or days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;