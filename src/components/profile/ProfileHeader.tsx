import React from 'react';
import { User, MapPin, Star, Briefcase } from 'lucide-react';
import { User as UserType } from '../../types/user';

interface ProfileHeaderProps {
  user: UserType;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="-mt-16 relative">
            <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-gray-100">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-full w-full p-4 text-gray-400" />
              )}
            </div>
          </div>
          <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start text-sm text-gray-500">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                {user.role === 'taskgiver' ? 'Task Giver' : 'Task Taker'}
              </div>
              {user.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location.address}
                </div>
              )}
              {user.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  {user.rating.toFixed(1)} ({user.tasksCompleted} tasks)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;