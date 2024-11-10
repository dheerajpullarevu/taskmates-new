import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AnalyticsData {
  tasksCompleted: { date: string; count: number }[];
  earnings: { date: string; amount: number }[];
  tasksByCategory: { category: string; count: number }[];
}

interface DashboardChartsProps {
  data: AnalyticsData;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Tasks Completed Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.tasksCompleted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#2196F3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Earnings Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.earnings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Tasks by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.tasksByCategory} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#FF9800" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;