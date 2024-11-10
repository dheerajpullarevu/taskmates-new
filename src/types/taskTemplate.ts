import { TaskCategory, TaskPriority } from './task';

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  estimatedDuration: number;
  suggestedBudget: number;
  requiredSkills: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface CategoryMetadata {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  parentId?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}