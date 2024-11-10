import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';
import { useAuthStore } from '../store/authStore';
import { MapPin, Calendar, IndianRupee, Tag, AlertCircle, Clock, User } from 'lucide-react';
import TaskApplication from '../components/tasks/TaskApplication';
import { formatINR } from '../utils/currency';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTaskStore();
  const { user } = useAuthStore();
  
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Task not found</h3>
          <p className="mt-1 text-sm text-gray-500">The task you're looking for doesn't exist.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/tasks')}
              className="btn"
            >
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isTaskGiver = user?.id === task.taskGiverId;
  const canApply = user && !isTaskGiver && task.status === 'open';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-5 w-5 mr-2" />
                  Posted by {isTaskGiver ? 'you' : 'Task Giver'}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-5 w-5 mr-2" />
                  Posted {new Date(task.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  Due {new Date(task.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <IndianRupee className="h-5 w-5 mr-2" />
                  Budget: {formatINR(task.budget)}
                </div>
                {task.location && (
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    {task.location.address}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Description</h2>
                <p className="mt-2 text-gray-600 whitespace-pre-wrap">{task.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Required Skills</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {task.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <Tag className="h-4 w-4 mr-1" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Section */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="text-center">
                <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${
                  task.status === 'open' ? 'bg-green-100 text-green-800' :
                  task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  task.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {task.status.replace('_', ' ')}
                </span>

                {canApply && (
                  <TaskApplication taskId={task.id} />
                )}

                {!user && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Please sign in to apply for this task.</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="mt-2 btn-outline w-full"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;