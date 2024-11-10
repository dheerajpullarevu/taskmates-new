import React from 'react';
import { UserRole } from '../../types/user';
import { useAuthStore } from '../../store/authStore';
import { Briefcase, User2 } from 'lucide-react';

const RoleSwitcher = () => {
  const { user, switchRole } = useAuthStore();

  if (!user || user.roles.length <= 1) return null;

  const handleRoleSwitch = async (role: UserRole) => {
    try {
      await switchRole(role);
    } catch (error) {
      console.error('Failed to switch role:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Switch Role</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {user.roles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSwitch(role)}
              className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                user.activeRole === role
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              {role === 'taskgiver' ? (
                <Briefcase className="h-5 w-5 mr-2" />
              ) : (
                <User2 className="h-5 w-5 mr-2" />
              )}
              {role === 'taskgiver' ? 'Task Giver' : 'Task Taker'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcher;