import { getAnalytics, logEvent } from 'firebase/analytics';
import { Task } from '../types/task';
import { Transaction } from '../types/user';

const analytics = getAnalytics();

export interface TaskAnalytics {
  totalTasks: number;
  completedTasks: number;
  averageRating: number;
  categoryDistribution: Record<string, number>;
  completionRate: number;
  averageCompletionTime: number;
}

export interface PaymentAnalytics {
  totalRevenue: number;
  averageTaskValue: number;
  transactionVolume: number;
  paymentMethodDistribution: Record<string, number>;
  refundRate: number;
}

export interface PerformanceMetrics {
  responseTime: number;
  userSatisfaction: number;
  taskSuccessRate: number;
  userRetentionRate: number;
}

export const trackTaskAnalytics = (tasks: Task[]): TaskAnalytics => {
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const ratings = completedTasks
    .flatMap(task => task.reviews?.map(review => review.rating) || []);

  const analytics: TaskAnalytics = {
    totalTasks: tasks.length,
    completedTasks: completedTasks.length,
    averageRating: ratings.length ? 
      ratings.reduce((a, b) => a + b, 0) / ratings.length : 0,
    categoryDistribution: tasks.reduce((acc, task) => ({
      ...acc,
      [task.category]: (acc[task.category] || 0) + 1
    }), {} as Record<string, number>),
    completionRate: tasks.length ? 
      (completedTasks.length / tasks.length) * 100 : 0,
    averageCompletionTime: calculateAverageCompletionTime(completedTasks)
  };

  logEvent(analytics, 'task_analytics_calculated', analytics);
  return analytics;
};

export const trackPaymentAnalytics = (transactions: Transaction[]): PaymentAnalytics => {
  const successfulTransactions = transactions.filter(
    t => t.status === 'completed'
  );
  const refunds = transactions.filter(t => t.type === 'refund');

  const analytics: PaymentAnalytics = {
    totalRevenue: successfulTransactions.reduce(
      (sum, t) => sum + t.amount, 
      0
    ),
    averageTaskValue: successfulTransactions.length ?
      successfulTransactions.reduce((sum, t) => sum + t.amount, 0) / 
      successfulTransactions.length : 0,
    transactionVolume: transactions.length,
    paymentMethodDistribution: transactions.reduce(
      (acc, t) => ({
        ...acc,
        [t.type]: (acc[t.type] || 0) + 1
      }), 
      {} as Record<string, number>
    ),
    refundRate: transactions.length ?
      (refunds.length / transactions.length) * 100 : 0
  };

  logEvent(analytics, 'payment_analytics_calculated', analytics);
  return analytics;
};

export const trackPerformanceMetrics = (
  tasks: Task[],
  responseTimeMs: number
): PerformanceMetrics => {
  const metrics: PerformanceMetrics = {
    responseTime: responseTimeMs,
    userSatisfaction: calculateUserSatisfaction(tasks),
    taskSuccessRate: calculateTaskSuccessRate(tasks),
    userRetentionRate: calculateUserRetentionRate(tasks)
  };

  logEvent(analytics, 'performance_metrics_calculated', metrics);
  return metrics;
};

const calculateAverageCompletionTime = (tasks: Task[]): number => {
  const completionTimes = tasks
    .filter(task => task.completionProof?.submittedAt)
    .map(task => {
      const start = new Date(task.createdAt).getTime();
      const end = new Date(task.completionProof!.submittedAt).getTime();
      return end - start;
    });

  return completionTimes.length ?
    completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length : 0;
};

const calculateUserSatisfaction = (tasks: Task[]): number => {
  const ratings = tasks
    .flatMap(task => task.reviews?.map(review => review.rating) || []);
  
  return ratings.length ?
    (ratings.reduce((a, b) => a + b, 0) / ratings.length) * 20 : 0; // Convert to percentage
};

const calculateTaskSuccessRate = (tasks: Task[]): number => {
  if (!tasks.length) return 0;
  const successfulTasks = tasks.filter(
    task => task.status === 'completed' && 
    task.reviews?.some(review => review.rating >= 4)
  );
  return (successfulTasks.length / tasks.length) * 100;
};

const calculateUserRetentionRate = (tasks: Task[]): number => {
  if (!tasks.length) return 0;
  const uniqueUsers = new Set(tasks.map(task => task.taskGiverId));
  const repeatUsers = new Set(
    tasks
      .filter(task => 
        tasks.filter(t => t.taskGiverId === task.taskGiverId).length > 1
      )
      .map(task => task.taskGiverId)
  );
  return (repeatUsers.size / uniqueUsers.size) * 100;
};