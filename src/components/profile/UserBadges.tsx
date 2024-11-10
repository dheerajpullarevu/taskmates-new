import React from 'react';
import { Award, Shield, Star, TrendingUp } from 'lucide-react';
import { UserBadge } from '../../types/user';

interface UserBadgesProps {
  badges: UserBadge[];
}

const UserBadges: React.FC<UserBadgesProps> = ({ badges }) => {
  const getBadgeIcon = (type: UserBadge['type']) => {
    switch (type) {
      case 'top_rated':
        return <Star className="h-5 w-5" />;
      case 'verified':
        return <Shield className="h-5 w-5" />;
      case 'expert':
        return <Award className="h-5 w-5" />;
      case 'rising_star':
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getBadgeColor = (type: UserBadge['type']) => {
    switch (type) {
      case 'top_rated':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      case 'expert':
        return 'bg-purple-100 text-purple-800';
      case 'rising_star':
        return 'bg-green-100 text-green-800';
    }
  };

  if (!badges?.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.type}
              className={`p-4 rounded-lg ${getBadgeColor(badge.type)}`}
            >
              <div className="flex items-center mb-2">
                {getBadgeIcon(badge.type)}
                <span className="ml-2 font-medium">
                  {badge.type.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
              <p className="text-sm">{badge.description}</p>
              <p className="text-xs mt-2">
                Earned {new Date(badge.earnedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBadges;