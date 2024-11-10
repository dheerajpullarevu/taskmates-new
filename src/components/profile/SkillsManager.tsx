import React, { useState } from 'react';
import { Search, Plus, X, Award } from 'lucide-react';
import { Skill } from '../../types/user';

const skillCategories = {
  technical: ['Web Development', 'Mobile Development', 'Data Entry', 'IT Support'],
  professional: ['Consulting', 'Legal Services', 'Accounting', 'Project Management'],
  creative: ['Graphic Design', 'Content Writing', 'Video Editing', 'Photography'],
  manual: ['Plumbing', 'Electrical Work', 'Carpentry', 'Painting'],
  other: ['Delivery', 'Customer Service', 'Teaching', 'Translation']
};

interface SkillsManagerProps {
  userSkills: Skill[];
  onAddSkill: (skill: Skill) => void;
  onRemoveSkill: (skillId: string) => void;
  onUpdateSkill: (skill: Skill) => void;
}

const SkillsManager = ({ userSkills, onAddSkill, onRemoveSkill, onUpdateSkill }: SkillsManagerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof skillCategories | 'all'>('all');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'technical',
    yearsOfExperience: 0
  });

  const filteredSkills = userSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddSkill = () => {
    onAddSkill({
      id: Math.random().toString(36).substr(2, 9),
      ...newSkill
    });
    setShowAddSkill(false);
    setNewSkill({ name: '', category: 'technical', yearsOfExperience: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={() => setShowAddSkill(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Skill
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Skills
        </button>
        {Object.keys(skillCategories).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as keyof typeof skillCategories)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{skill.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{skill.category}</p>
              </div>
              <button
                onClick={() => onRemoveSkill(skill.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {skill.yearsOfExperience && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-1" />
                {skill.yearsOfExperience} years experience
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Skill</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as Skill['category'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {Object.keys(skillCategories).map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  value={newSkill.yearsOfExperience}
                  onChange={(e) => setNewSkill({ ...newSkill, yearsOfExperience: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowAddSkill(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;