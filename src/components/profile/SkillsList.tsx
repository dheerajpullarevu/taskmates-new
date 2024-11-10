import React from 'react';
import { Tag } from 'lucide-react';

interface SkillsListProps {
  skills: string[];
  onAddSkill?: (skill: string) => void;
  onRemoveSkill?: (skill: string) => void;
  editable?: boolean;
}

const SkillsList = ({ skills, onAddSkill, onRemoveSkill, editable = false }: SkillsListProps) => {
  const [newSkill, setNewSkill] = React.useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && onAddSkill) {
      onAddSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              <Tag className="h-4 w-4 mr-1" />
              {skill}
              {editable && onRemoveSkill && (
                <button
                  onClick={() => onRemoveSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {editable && onAddSkill && (
          <form onSubmit={handleAddSkill} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SkillsList;