import React, { useState } from 'react';
import { Plus, ExternalLink, Star } from 'lucide-react';
import { WorkHistory, PortfolioItem } from '../../types/user';

interface WorkPortfolioProps {
  workHistory: WorkHistory[];
  portfolio: PortfolioItem[];
  editable?: boolean;
  onAddPortfolioItem?: (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => void;
}

const WorkPortfolio: React.FC<WorkPortfolioProps> = ({
  workHistory,
  portfolio,
  editable = false,
  onAddPortfolioItem
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    images: [] as string[],
    link: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddPortfolioItem) {
      onAddPortfolioItem(newItem);
      setNewItem({
        title: '',
        description: '',
        category: '',
        images: [],
        link: ''
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Work History */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Work History</h2>
          <div className="space-y-6">
            {workHistory.map((work) => (
              <div key={work.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{work.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{work.description}</p>
                  </div>
                  {work.rating && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{work.rating}</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>{work.category}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(work.completedAt).toLocaleDateString()}</span>
                </div>
                {work.review && (
                  <p className="mt-2 text-sm text-gray-600 italic">"{work.review}"</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Portfolio</h2>
            {editable && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                {item.images[0] && (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700 mt-2"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Portfolio Item Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add Portfolio Item</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Project Link (Optional)</label>
                <input
                  type="url"
                  value={newItem.link}
                  onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkPortfolio;