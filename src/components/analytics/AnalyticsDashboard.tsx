import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TaskAnalytics, PaymentAnalytics, PerformanceMetrics } from '../../services/analytics';

interface AnalyticsDashboardProps {
  taskAnalytics: TaskAnalytics;
  paymentAnalytics: PaymentAnalytics;
  performanceMetrics: PerformanceMetrics;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  taskAnalytics,
  paymentAnalytics,
  performanceMetrics
}) => {
  const categoryData = Object.entries(taskAnalytics.categoryDistribution).map(
    ([category, count]) => ({
      category,
      count
    })
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Task Overview</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-2xl font-semibold">{taskAnalytics.totalTasks}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-2xl font-semibold">
                {taskAnalytics.completionRate.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-semibold">
                {taskAnalytics.averageRating.toFixed(1)}/5
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Payment Analytics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold">
                ${paymentAnalytics.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Task Value</p>
              <p className="text-2xl font-semibold">
                ${paymentAnalytics.averageTaskValue.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Refund Rate</p>
              <p className="text-2xl font-semibold">
                {paymentAnalytics.refundRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">User Satisfaction</p>
              <p className="text-2xl font-semibold">
                {performanceMetrics.userSatisfaction.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Task Success Rate</p>
              <p className="text-2xl font-semibold">
                {performanceMetrics.taskSuccessRate.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User Retention</p>
              <p className="text-2xl font-semibold">
                {performanceMetrics.userRetentionRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Task Categories Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;