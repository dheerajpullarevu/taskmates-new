import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, AlertCircle, Activity } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { supportTickets, adminUsers } = useAdminStore();

  const stats = [
    {
      label: 'Active Support Tickets',
      value: supportTickets.filter(t => t.status === 'open').length,
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'bg-blue-500',
      link: '/admin/tickets'
    },
    {
      label: 'Urgent Issues',
      value: supportTickets.filter(t => t.priority === 'urgent').length,
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'bg-red-500',
      link: '/admin/tickets'
    },
    {
      label: 'Active Support Agents',
      value: adminUsers.filter(u => u.role === 'support').length,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-green-500',
      link: '/admin/sub-admins'
    },
    {
      label: 'Response Rate',
      value: '94%',
      icon: <Activity className="h-6 w-6" />,
      color: 'bg-purple-500',
      link: '/admin/analytics'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => navigate(stat.link)}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex p-3 rounded-lg ${stat.color} text-white mb-4`}>
              {stat.icon}
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Support Tickets */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recent Support Tickets</h2>
              <button
                onClick={() => navigate('/admin/tickets')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {supportTickets.slice(0, 5).map((ticket) => (
              <div key={ticket.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Created {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Support Agents */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Active Support Agents</h2>
              <button
                onClick={() => navigate('/admin/sub-admins')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Manage Agents
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {adminUsers
              .filter(user => user.role === 'support')
              .slice(0, 5)
              .map((agent) => (
                <div key={agent.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-500">Last active: {agent.lastActive}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;