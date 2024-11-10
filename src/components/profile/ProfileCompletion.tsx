import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { User } from '../../types/user';

interface ProfileCompletionProps {
  user: User;
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ user }) => {
  const { profileCompletion } = user;

  if (!profileCompletion) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Profile Completion</h2>
          <span className="text-2xl font-bold text-blue-600">
            {profileCompletion.percentage}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${profileCompletion.percentage}%` }}
          ></div>
        </div>

        {profileCompletion.missingFields.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Complete these items to improve your profile:</p>
            {profileCompletion.missingFields.map((field, index) => (
              <div key={index} className="flex items-center text-sm">
                <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-gray-700">
                  {field.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
            ))}
          </div>
        )}

        {profileCompletion.percentage === 100 && (
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Your profile is complete!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCompletion;