import React from 'react';
import { BarChart2, TrendingUp, Users, DollarSign } from 'lucide-react';
import DashboardCharts from '../../components/analytics/DashboardCharts';

const AdminAnalytics = () => {
  // Sample data - in a real app, this would come from your backend
  const analyticsData = {
    tasksCompleted: [
      { date: '2024-01', count: 45 },
      { date: '2024-02', count: 62 },
      { date: '2024-03', count: 78 }
    ],
    earnings: [
      { date: '2024-01', amount: 4500 },
      { date: '2024-02', amount: 6200 },
      { date: '2024-03', amount: 7800 }
    ],
    tasksByCategory: [
      { category: 'Delivery', count: 145 },
      { category: 'Professional', count: 89 },
      { category: 'Online', count: 234 },
      { category: 'Handyman', count: 67 }
    ]
  };

  const stats = [
    {
      title: 'Total Tasks',
      value: '1,234',
      change: '+12.5%',
      icon: <BarChart2 className="h-6 w-6 text-blue-600" />
    },
    {
      title: 'Active Users',
      value: '856',
      change: '+5.2%',
      icon: <Users className="h-6 w-6 text-green-600" />
    },
    {
      title: 'Total Revenue',
      value: '$45,678',
      change: '+8.1%',
      icon: <DollarSign className="h-6 w-6 text-purple-600" />
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+2.3%',
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500"> from last month</span>
            </div>
          </div>
        ))}
      </div>

      <DashboardCharts data={analyticsData} />
    </div>
  );
};

export default AdminAnalytics;