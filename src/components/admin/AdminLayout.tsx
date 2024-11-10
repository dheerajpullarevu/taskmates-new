import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TicketCheck,
  ListTodo,
  BarChart2,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuthStore();

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard />, label: 'Dashboard' },
    { path: '/admin/tickets', icon: <TicketCheck />, label: 'Support Tickets' },
    { path: '/admin/tasks', icon: <ListTodo />, label: 'Task Management' },
    { path: '/admin/analytics', icon: <BarChart2 />, label: 'Analytics' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 pt-16">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => logout()}
            className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50"
          >
            <LogOut className="mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;