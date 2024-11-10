import React, { useEffect } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { Clock, MapPin, IndianRupee, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TaskSearch from './TaskSearch';
import { formatINR } from '../../utils/currency';

const TaskList = () => {
  const navigate = useNavigate();
  const { filteredTasks, loading, error, fetchTasks, setSearchQuery, setFilters } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <TaskSearch
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/tasks/${task.id}`)}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500 line-clamp-3">{task.description}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <IndianRupee className="h-4 w-4 mr-2" />
                {formatINR(task.budget)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                {new Date(task.deadline).toLocaleDateString()}
              </div>
              {task.location && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {task.location.address}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <Tag className="h-4 w-4 mr-2" />
                {task.skills.join(', ')}
              </div>
            </div>

            <div className="mt-4">
              <button className="w-full btn">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;