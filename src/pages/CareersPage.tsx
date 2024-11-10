import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const CareersPage = () => {
  const openings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      location: 'Hyderabad',
      type: 'Full-time',
      department: 'Engineering',
      experience: '5+ years'
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'Hyderabad',
      type: 'Full-time',
      department: 'Product',
      experience: '3+ years'
    },
    {
      id: 3,
      title: 'Customer Success Manager',
      location: 'Remote',
      type: 'Full-time',
      department: 'Operations',
      experience: '2+ years'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Join Our Team</h1>
          <p className="mt-4 text-xl text-gray-500">
            Help us build the future of task-based work in India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg text-blue-600 mb-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Meaningful Work</h3>
            <p className="mt-2 text-gray-500">
              Make a real impact on millions of lives across India
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg text-green-600 mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Work-Life Balance</h3>
            <p className="mt-2 text-gray-500">
              Flexible work hours and generous time off
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg text-purple-600 mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Great Location</h3>
            <p className="mt-2 text-gray-500">
              Modern office in the heart of T-Hub, Hyderabad
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {openings.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                      <span className="mx-2">•</span>
                      {job.type}
                      <span className="mx-2">•</span>
                      {job.experience}
                    </div>
                  </div>
                  <button className="btn">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;