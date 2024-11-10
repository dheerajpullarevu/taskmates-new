import React from 'react';
import { Users, Target, Shield, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About TaskMates
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connecting communities through tasks, empowering people to achieve more together.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-500">
                TaskMates aims to revolutionize how communities collaborate and help each other. We believe in creating opportunities for everyone while making task management efficient and accessible.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              <p className="mt-4 text-lg text-gray-500">
                To build a world where anyone can easily find help for any task, and where skilled individuals can earn by helping others in their community.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Community First</h3>
            <p className="mt-2 text-gray-500">Building stronger local connections through task sharing</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Quality Focus</h3>
            <p className="mt-2 text-gray-500">Ensuring high standards in every task completion</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 rounded-full">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Trust & Safety</h3>
            <p className="mt-2 text-gray-500">Prioritizing secure and reliable transactions</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full">
              <Globe className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Global Impact</h3>
            <p className="mt-2 text-gray-500">Making a difference in communities worldwide</p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Story</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Founded in 2024, TaskMates emerged from a simple observation: people in communities have skills to share and tasks that need completing. We built a platform that makes it easy to connect these two needs, creating a marketplace that benefits everyone.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Join Our Journey</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Whether you're looking to get tasks done or earn by helping others, TaskMates is your platform. Join our growing community and be part of the future of task management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;