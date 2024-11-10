import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const applicationSchema = z.object({
  coverLetter: z.string()
    .min(50, 'Cover letter must be at least 50 characters')
    .max(500, 'Cover letter must not exceed 500 characters')
    .optional(),
  proposedPrice: z.number()
    .min(1, 'Price must be greater than 0')
    .optional(),
  estimatedDuration: z.number()
    .min(1, 'Duration must be at least 1 day')
    .optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface TaskApplicationProps {
  taskId: string;
}

const TaskApplication = ({ taskId }: TaskApplicationProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema)
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { assignTask } = useTaskStore();

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      await assignTask(taskId, user.id);
      setSubmitted(true);
      
      setTimeout(() => {
        navigate('/tasks');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit application:', error);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <p className="text-green-600">Application submitted successfully!</p>
        <p className="text-sm text-gray-500">Redirecting to tasks page...</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Why are you the best fit for this task? (Optional)
          </label>
          <textarea
            {...register('coverLetter')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe your relevant experience and approach..."
          />
          {errors.coverLetter && (
            <p className="mt-1 text-sm text-red-600">{errors.coverLetter.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your Proposed Price (optional)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              {...register('proposedPrice', { valueAsNumber: true })}
              className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          {errors.proposedPrice && (
            <p className="mt-1 text-sm text-red-600">{errors.proposedPrice.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estimated Duration (days, optional)
          </label>
          <input
            type="number"
            {...register('estimatedDuration', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Number of days"
          />
          {errors.estimatedDuration && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedDuration.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full btn"
        >
          Apply for Task
        </button>
      </form>
    </div>
  );
};

export default TaskApplication;