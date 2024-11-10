import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types/user';
import { Shield } from 'lucide-react';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roles: [] as UserRole[],
    activeRole: 'taskgiver' as UserRole
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/tasks');
    } catch (error) {
      console.error('Profile setup failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                I want to
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.roles.includes('taskgiver')}
                    onChange={(e) => {
                      const roles = e.target.checked
                        ? [...formData.roles, 'taskgiver']
                        : formData.roles.filter(r => r !== 'taskgiver');
                      setFormData({ ...formData, roles });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Post Tasks (Task Giver)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.roles.includes('tasktaker')}
                    onChange={(e) => {
                      const roles = e.target.checked
                        ? [...formData.roles, 'tasktaker']
                        : formData.roles.filter(r => r !== 'tasktaker');
                      setFormData({ ...formData, roles });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Complete Tasks (Task Taker)
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn"
              disabled={formData.roles.length === 0}
            >
              Complete Setup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;