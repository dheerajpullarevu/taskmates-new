import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskHistoryProps {
  tasks: Task[];
  role: 'taskgiver' | 'tasktaker';
}

const TaskHistory = ({ tasks, role }: TaskHistoryProps) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Task History</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                ${task.budget}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskHistory;