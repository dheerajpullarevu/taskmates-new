import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Calendar, IndianRupee, Tag } from 'lucide-react';
import { calculateTaskPricing, suggestPriceRange, formatINR } from '../../services/pricing';

const taskSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['online', 'offline', 'specialized']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  pricePerUnit: z.number().min(1, 'Price must be greater than 0'),
  deadline: z.string(),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  location: z.object({
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
});

type CreateTaskFormData = z.infer<typeof taskSchema>;

const CreateTaskForm = () => {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number; recommended: number } | null>(null);
  const [priceBreakdown, setPriceBreakdown] = useState<any>(null);

  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<CreateTaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const category = watch('category');
  const quantity = watch('quantity');
  const pricePerUnit = watch('pricePerUnit');

  React.useEffect(() => {
    if (category && quantity) {
      const range = suggestPriceRange(category, quantity);
      setPriceRange(range);
      setValue('pricePerUnit', range.recommended);
    }
  }, [category, quantity]);

  React.useEffect(() => {
    if (category && quantity && pricePerUnit) {
      const breakdown = calculateTaskPricing(pricePerUnit, quantity, category);
      setPriceBreakdown(breakdown);
    }
  }, [category, quantity, pricePerUnit]);

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      console.log('Task data:', data);
      console.log('Price breakdown:', priceBreakdown);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Task Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register('title')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe the task in detail"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Task Details */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="online">Online Task</option>
            <option value="offline">Offline Task</option>
            <option value="specialized">Specialized Task</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            {...register('priority')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Quantity and Price */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            {...register('quantity', { valueAsNumber: true })}
            type="number"
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price per Unit (₹)
            {priceRange && (
              <span className="text-xs text-gray-500 ml-2">
                Suggested: {formatINR(priceRange.recommended)}
              </span>
            )}
          </label>
          <input
            {...register('pricePerUnit', { valueAsNumber: true })}
            type="number"
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {priceRange && (
            <p className="mt-1 text-xs text-gray-500">
              Recommended range: {formatINR(priceRange.min)} - {formatINR(priceRange.max)}
            </p>
          )}
        </div>
      </div>

      {/* Price Breakdown */}
      {priceBreakdown && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Price Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Base Amount</span>
              <span>{formatINR(priceBreakdown.baseAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Platform Fee (10%)</span>
              <span>{formatINR(priceBreakdown.platformFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">GST (18%)</span>
              <span>{formatINR(priceBreakdown.gst)}</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2">
              <span>Total Amount</span>
              <span>{formatINR(priceBreakdown.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full btn"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;