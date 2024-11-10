import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IndianRupee, Tag, AlertCircle } from 'lucide-react';
import { calculateTotalAmount, validateAndApplyPromoCode, formatINR } from '../../services/pricing';
import { createPaymentSession } from '../../services/payments';
import { AppliedPromo } from '../../types/promo';

interface TaskCheckoutProps {
  taskId: string;
  amount: number;
  category?: string;
  onPaymentComplete: () => void;
}

const promoCodeSchema = z.object({
  code: z.string().min(1, 'Please enter a promo code')
});

const TaskCheckout: React.FC<TaskCheckoutProps> = ({
  taskId,
  amount,
  category,
  onPaymentComplete
}) => {
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(promoCodeSchema)
  });

  const totals = calculateTotalAmount(appliedPromo?.finalAmount || amount);

  const handlePromoSubmit = async (data: { code: string }) => {
    setIsApplyingPromo(true);
    setPromoError(null);

    try {
      const result = await validateAndApplyPromoCode(data.code, amount, category);
      if (result) {
        setAppliedPromo(result);
      } else {
        setPromoError('Invalid or expired promo code');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    try {
      await createPaymentSession({
        amount: totals.totalAmount,
        taskId,
        description: `Payment for Task #${taskId}`,
      });
      onPaymentComplete();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Details</h2>

      <div className="space-y-4">
        {/* Promo Code Section */}
        <div className="border-b pb-4">
          <form onSubmit={handleSubmit(handlePromoSubmit)} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Have a promo code?
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  {...register('code')}
                  type="text"
                  placeholder="Enter promo code"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isApplyingPromo}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isApplyingPromo ? 'Applying...' : 'Apply'}
              </button>
            </div>
            {errors.code && (
              <p className="text-sm text-red-600">{errors.code.message}</p>
            )}
            {promoError && (
              <div className="flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {promoError}
              </div>
            )}
          </form>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Base Amount</span>
            <span className="text-gray-900">{formatINR(amount)}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600 flex items-center">
                Promo Discount ({appliedPromo.code})
                <button
                  onClick={removePromoCode}
                  className="ml-2 text-xs text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </span>
              <span className="text-green-600">
                -{formatINR(appliedPromo.discountAmount)}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Platform Fee (10%)</span>
            <span className="text-gray-900">{formatINR(totals.platformFee)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">GST (18%)</span>
            <span className="text-gray-900">{formatINR(totals.gst)}</span>
          </div>

          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-gray-900">{formatINR(totals.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessingPayment}
          className="w-full mt-6 btn flex items-center justify-center"
        >
          <IndianRupee className="h-5 w-5 mr-2" />
          {isProcessingPayment ? 'Processing...' : `Pay ${formatINR(totals.totalAmount)}`}
        </button>
      </div>
    </div>
  );
};

export default TaskCheckout;