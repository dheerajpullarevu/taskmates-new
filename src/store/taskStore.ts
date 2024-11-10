import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';
import { TaskFilters } from '../components/tasks/TaskSearch';

interface TaskApplication {
  userId: string;
  coverLetter: string;
  proposedPrice?: number;
  estimatedDuration?: number;
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: TaskFilters;
  sortBy: 'latest' | 'oldest' | 'budget_high' | 'budget_low' | 'deadline';
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  fetchTasks: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: TaskFilters) => void;
  setSortBy: (sort: TaskState['sortBy']) => void;
  applyForTask: (taskId: string, application: TaskApplication) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: {},
  sortBy: 'latest',

  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const newTask: Task = {
        ...taskData,
        id: Math.random().toString(36).substr(2, 9),
        status: 'open',
        createdAt: new Date().toISOString(),
        applications: [],
        taskTakers: []
      };
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
      get().applyFilters();
    } catch (error) {
      set({ error: 'Failed to create task', loading: false });
    }
  },

  updateTaskStatus: async (taskId, status) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, status } : task
        ),
        loading: false,
      }));
      get().applyFilters();
    } catch (error) {
      set({ error: 'Failed to update task status', loading: false });
    }
  },

  applyForTask: async (taskId: string, application: TaskApplication) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                applications: [...(task.applications || []), application],
              }
            : task
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to submit application', loading: false });
      throw new Error('Failed to submit application');
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setFilters: (filters: TaskFilters) => {
    set({ filters });
    get().applyFilters();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().applyFilters();
  },

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      // For testing, let's add some sample tasks if none exist
      set((state) => {
        if (state.tasks.length === 0) {
          return {
            tasks: [
              {
                id: '1',
                title: 'Website Development',
                description: 'Need a professional website built using React and Tailwind CSS',
                category: 'online',
                priority: 'high',
                status: 'open',
                budget: 500,
                deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                taskGiverId: 'user1',
                skills: ['React', 'Tailwind CSS', 'TypeScript'],
                applications: [],
                taskTakers: []
              },
              {
                id: '2',
                title: 'Local Delivery',
                description: 'Need a package delivered within city limits',
                category: 'offline',
                priority: 'medium',
                status: 'open',
                budget: 50,
                location: {
                  address: 'Downtown Area',
                  latitude: 12.9716,
                  longitude: 77.5946
                },
                deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                taskGiverId: 'user2',
                skills: ['Delivery', 'Vehicle'],
                applications: [],
                taskTakers: []
              }
            ],
            loading: false
          };
        }
        return { loading: false };
      });
      get().applyFilters();
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },

  applyFilters: () => {
    const { tasks, searchQuery, filters, sortBy } = get();
    let filtered = [...tasks];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter((task) => task.category === filters.category);
    }
    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }
    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }
    if (filters.minBudget) {
      filtered = filtered.filter((task) => task.budget >= filters.minBudget!);
    }
    if (filters.maxBudget) {
      filtered = filtered.filter((task) => task.budget <= filters.maxBudget!);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'budget_high':
          return b.budget - a.budget;
        case 'budget_low':
          return a.budget - b.budget;
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        default:
          return 0;
      }
    });

    set({ filteredTasks: filtered });
  }
}));