import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import TaskProgress from './TaskProgress';
import TaskAnalytics from './TaskAnalytics';
import TaskMap from '../tasks/TaskMap';

const TaskGiverDashboard = () => {
  const { tasks } = useTaskStore();
  const myTasks = tasks.filter(task => task.taskGiverId === 'current-user-id');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Active Tasks</h3>
          <TaskProgress tasks={myTasks.filter(t => t.status === 'in_progress')} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Task Analytics</h3>
          <TaskAnalytics tasks={myTasks} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Task Distribution</h3>
          <TaskMap tasks={myTasks} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Recent Tasks</h3>
        <div className="space-y-4">
          {myTasks.map(task => (
            <div key={task.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {task.progress.completedTasks}/{task.maxTakers} Completed
                  </p>
                  <p className="text-sm text-gray-500">
                    ${task.progress.totalEarnings} Earned
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};