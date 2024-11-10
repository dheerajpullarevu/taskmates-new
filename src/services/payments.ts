import { loadRazorpay } from '../utils/loadRazorpay';

interface PaymentOptions {
  amount: number;
  currency?: string;
  taskId: string;
  description?: string;
}

export const createPaymentSession = async ({
  amount,
  currency = 'INR',
  taskId,
  description
}: PaymentOptions) => {
  try {
    // Load Razorpay SDK
    await loadRazorpay();

    // Create order on your backend
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        taskId,
      }),
    });

    const order = await response.json();

    // Initialize Razorpay payment
    const razorpay = new (window as any).Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency,
      order_id: order.id,
      name: 'TaskMates',
      description: description || `Payment for Task #${taskId}`,
      image: 'https://taskmates.in/logo.png',
      prefill: {
        name: 'User Name', // Get from user profile
        email: 'user@example.com', // Get from user profile
        contact: '+91XXXXXXXXXX', // Get from user profile
      },
      theme: {
        color: '#2196F3',
      },
      handler: function(response: any) {
        // Verify payment on backend
        verifyPayment({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          taskId,
        });
      },
    });

    razorpay.open();
  } catch (error) {
    console.error('Payment session creation failed:', error);
    throw error;
  }
};

const verifyPayment = async (paymentData: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  taskId: string;
}) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw error;
  }
};