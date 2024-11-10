import React from 'react';
import TaskTemplateList from '../../components/tasks/TaskTemplateList';
import CategoryManager from '../../components/tasks/CategoryManager';

const TemplatesPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Templates & Categories</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TaskTemplateList />
        </div>
        <div>
          <CategoryManager />
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;