import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import TaskList from '../tasks/TaskList';

const TaskTakerDashboard = () => {
  const { user } = useAuthStore();
  const { tasks } = useTaskStore();
  const myTasks = tasks.filter(task => 
    task.taskTakers.some(taker => taker.userId === user?.id)
  );

  const groupedTasks = {
    available: tasks.filter(task => 
      task.currentTakers < task.maxTakers &&
      !task.taskTakers.some(taker => taker.userId === user?.id)
    ),
    assigned: myTasks.filter(task => 
      task.taskTakers.find(taker => taker.userId === user?.id)?.status === 'assigned'
    ),
    completed: myTasks.filter(task => 
      task.taskTakers.find(taker => taker.userId === user?.id)?.status === 'completed'
    ),
    rejected: myTasks.filter(task => 
      task.taskTakers.find(taker => taker.userId === user?.id)?.status === 'cancelled'
    )
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium capitalize mb-2">{status} Tasks</h3>
            <p className="text-3xl font-bold">{tasks.length}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Browse Available Tasks</h3>
          <TaskList tasks={groupedTasks.available} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Assigned Tasks</h3>
          <TaskList tasks={groupedTasks.assigned} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Completed Tasks</h3>
          <TaskList tasks={groupedTasks.completed} />
        </div>
      </div>
    </div>
  );
};