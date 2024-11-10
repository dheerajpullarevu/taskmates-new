import { create } from 'zustand';
import { TaskTemplate, CategoryMetadata } from '../types/taskTemplate';

interface TemplateState {
  templates: TaskTemplate[];
  categories: CategoryMetadata[];
  loading: boolean;
  error: string | null;
  createTemplate: (template: Omit<TaskTemplate, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTemplate: (id: string, template: Partial<TaskTemplate>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  createCategory: (category: Omit<CategoryMetadata, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<CategoryMetadata>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  reorderCategories: (orderedIds: string[]) => Promise<void>;
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  categories: [],
  loading: false,
  error: null,

  createTemplate: async (templateData) => {
    set({ loading: true, error: null });
    try {
      const template: TaskTemplate = {
        ...templateData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      set(state => ({
        templates: [...state.templates, template],
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateTemplate: async (id, templateData) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        templates: state.templates.map(template =>
          template.id === id
            ? { ...template, ...templateData, updatedAt: new Date().toISOString() }
            : template
        ),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteTemplate: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        templates: state.templates.filter(template => template.id !== id),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      const category: CategoryMetadata = {
        ...categoryData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      set(state => ({
        categories: [...state.categories, category],
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateCategory: async (id, categoryData) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        categories: state.categories.map(category =>
          category.id === id
            ? { ...category, ...categoryData, updatedAt: new Date().toISOString() }
            : category
        ),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      set(state => ({
        categories: state.categories.filter(category => category.id !== id),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  reorderCategories: async (orderedIds) => {
    set({ loading: true, error: null });
    try {
      const categories = [...get().categories];
      const reordered = orderedIds.map((id, index) => {
        const category = categories.find(c => c.id === id);
        return category ? { ...category, order: index } : null;
      }).filter(Boolean) as CategoryMetadata[];
      
      set({ categories: reordered, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));