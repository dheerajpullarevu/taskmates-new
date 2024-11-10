import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';

interface TaskReviewFormProps {
  taskId: string;
  reviewerId: string;
  onSuccess?: () => void;
}

const TaskReviewForm: React.FC<TaskReviewFormProps> = ({ taskId, reviewerId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const { submitTaskReview } = useTaskStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitTaskReview(taskId, {
        reviewerId,
        rating,
        comment,
      });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Review Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Share your experience..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0 || !comment}
        className="w-full btn"
      >
        Submit Review
      </button>
    </form>
  );
};

export default TaskReviewForm;