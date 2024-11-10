import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const AdminTickets = () => {
  const { supportTickets, fetchSupportTickets, updateTicketStatus } = useAdminStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchSupportTickets();
  }, [fetchSupportTickets]);

  const filteredTickets = supportTickets.filter(ticket => 
    filter === 'all' || ticket.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        <div className="flex gap-2">
          {['all', 'open', 'in_progress', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md ${
                filter === status
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="divide-y divide-gray-200">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {ticket.subject}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Created: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {ticket.status !== 'resolved' && (
                    <>
                      {ticket.status === 'open' && (
                        <button
                          onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                          className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Start
                        </button>
                      )}
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                        className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mt-4 space-y-4">
                {ticket.messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === 'admin' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === 'admin'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;