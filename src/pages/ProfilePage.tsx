import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import ProfileHeader from '../components/profile/ProfileHeader';
import TaskHistory from '../components/profile/TaskHistory';
import SkillsList from '../components/profile/SkillsList';
import WalletSection from '../components/profile/WalletSection';
import RoleSwitcher from '../components/profile/RoleSwitcher';
import ProfileCompletion from '../components/profile/ProfileCompletion';
import UserBadges from '../components/profile/UserBadges';
import WorkPortfolio from '../components/profile/WorkPortfolio';

const ProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthStore();
  const { tasks } = useTaskStore();
  
  const user = currentUser;
  const isOwnProfile = !userId || userId === currentUser?.id;

  const userTasks = tasks.filter(task => 
    user?.activeRole === 'taskgiver' 
      ? task.taskGiverId === user.id 
      : task.taskTakerId === user.id
  );

  if (!user) {
    return <div className="text-center py-8">User not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <div className="space-y-6">
        <ProfileHeader user={user} />
        
        {isOwnProfile && <RoleSwitcher />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileCompletion user={user} />
            <TaskHistory tasks={userTasks} role={user.activeRole} />
            {user.workHistory && user.portfolio && (
              <WorkPortfolio
                workHistory={user.workHistory}
                portfolio={user.portfolio}
                editable={isOwnProfile}
              />
            )}
          </div>
          
          <div className="space-y-6">
            {isOwnProfile && <WalletSection />}
            
            {user.badges && user.badges.length > 0 && (
              <UserBadges badges={user.badges} />
            )}
            
            {(isOwnProfile || user.activeRole === 'tasktaker') && (
              <SkillsList 
                skills={user.skills || []}
                editable={isOwnProfile && user.activeRole === 'tasktaker'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;