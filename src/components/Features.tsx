import React from 'react';
import { CheckCircle, Globe, MapPin, CreditCard } from 'lucide-react';

const Features = () => {
  return (
    <div id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to manage tasks efficiently
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            TaskMates provides a comprehensive platform for both task givers and takers
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Globe className="h-6 w-6" />,
                title: 'Online & Offline Tasks',
                description: 'From digital work to physical tasks, we cover it all'
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: 'Location-Based Matching',
                description: 'Find tasks and workers in your vicinity'
              },
              {
                icon: <CreditCard className="h-6 w-6" />,
                title: 'Secure Payments',
                description: 'Safe and transparent payment processing'
              },
              {
                icon: <CheckCircle className="h-6 w-6" />,
                title: 'Quality Assurance',
                description: 'Verified workers and task completion tracking'
              }
            ].map((feature, index) => (
              <div key={index} className="relative p-6 bg-gray-50 rounded-lg">
                <div className="text-blue-600">{feature.icon}</div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;