import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';

interface TaskCompletionFormProps {
  taskId: string;
  onSuccess?: () => void;
}

const TaskCompletionForm: React.FC<TaskCompletionFormProps> = ({ taskId, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const { submitCompletionProof } = useTaskStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitCompletionProof(taskId, description, attachments);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to submit completion proof:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploading(true);
    try {
      // In a real app, upload files to storage and get URLs
      const urls = files.map(file => URL.createObjectURL(file));
      setAttachments(prev => [...prev, ...urls]);
    } catch (error) {
      console.error('Failed to upload files:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Completion Details
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe how you completed the task..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Proof of Completion
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload files</span>
                <input
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, PDF up to 10MB each
            </p>
          </div>
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {attachments.map((url, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Attachment ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!description || attachments.length === 0 || uploading}
        className="w-full btn"
      >
        Submit for Review
      </button>
    </form>
  );
};

export default TaskCompletionForm;