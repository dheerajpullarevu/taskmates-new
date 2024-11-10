import React from 'react';
import { UserPlus, FileText, CheckSquare, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How TaskMates Works
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Simple steps to get started with TaskMates
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <UserPlus className="h-8 w-8" />,
                title: 'Create Account',
                description: 'Sign up as a task giver or taker'
              },
              {
                icon: <FileText className="h-8 w-8" />,
                title: 'Post or Find Tasks',
                description: 'Create tasks or browse available ones'
              },
              {
                icon: <CheckSquare className="h-8 w-8" />,
                title: 'Complete Tasks',
                description: 'Work on tasks and track progress'
              },
              {
                icon: <DollarSign className="h-8 w-8" />,
                title: 'Get Paid',
                description: 'Secure payment upon completion'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
                    {step.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;