import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { TaskCategory, TaskPriority, TaskStatus } from '../../types/task';
import { useTaskStore } from '../../store/taskStore';

export interface TaskFilters {
  category?: TaskCategory;
  priority?: TaskPriority;
  status?: TaskStatus;
  minBudget?: number;
  maxBudget?: number;
}

const TaskSearch = () => {
  const { setSearchQuery, setFilters, setSortBy, sortBy } = useTaskStore();
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [filters, setLocalFilters] = React.useState<TaskFilters>({});

  const handleFilterChange = (newFilters: Partial<TaskFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
        <select
          onChange={(e) => setSortBy(e.target.value as any)}
          value={sortBy}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="budget_high">Budget: High to Low</option>
          <option value="budget_low">Budget: Low to High</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>

      {isFilterOpen && (
        <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                onChange={(e) => handleFilterChange({ category: e.target.value as TaskCategory })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="specialized">Specialized</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                onChange={(e) => handleFilterChange({ priority: e.target.value as TaskPriority })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                onChange={(e) => handleFilterChange({ status: e.target.value as TaskStatus })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="under_review">Under Review</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  onChange={(e) => handleFilterChange({ minBudget: Number(e.target.value) })}
                  className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  onChange={(e) => handleFilterChange({ maxBudget: Number(e.target.value) })}
                  className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSearch;