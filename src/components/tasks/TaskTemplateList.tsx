import React from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Copy, Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaskTemplateList = () => {
  const { templates, deleteTemplate } = useTemplateStore();
  const navigate = useNavigate();

  const handleUseTemplate = (templateId: string) => {
    navigate(`/create-task?template=${templateId}`);
  };

  const handleEditTemplate = (templateId: string) => {
    navigate(`/admin/templates/${templateId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Task Templates</h2>
        <button
          onClick={() => navigate('/admin/templates/new')}
          className="btn flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                template.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {template.isPublic ? 'Public' : 'Private'}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-4">{template.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium mr-2">Category:</span>
                {template.category}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium mr-2">Suggested Budget:</span>
                ₹{template.suggestedBudget}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium mr-2">Duration:</span>
                {template.estimatedDuration} days
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <button
                onClick={() => handleUseTemplate(template.id)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Copy className="h-4 w-4 mr-1" />
                Use Template
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTemplate(template.id)}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteTemplate(template.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTemplateList;