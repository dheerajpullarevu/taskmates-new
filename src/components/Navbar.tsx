import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BriefcaseIcon, Menu, X, Smartphone, Apple, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useTranslation('common');

  const isAdmin = user?.role === 'admin' || user?.role === 'master_admin';
  const isAdminPage = location.pathname.startsWith('/admin');

  // Don't show regular navbar on admin pages
  if (isAdminPage) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TaskMates</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/tasks" className="text-gray-600 hover:text-blue-600">
              {t('nav.tasks')}
            </Link>
            <Link to="/mobile-apps" className="text-gray-600 hover:text-blue-600 flex items-center">
              <Smartphone className="h-4 w-4 mr-1" />
              Android
            </Link>
            <Link to="/mobile-apps" className="text-gray-600 hover:text-blue-600 flex items-center">
              <Apple className="h-4 w-4 mr-1" />
              iOS
            </Link>
            <LanguageSwitcher />
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {t('nav.signUp')}
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/create-task" className="text-gray-600 hover:text-blue-600">
                  {t('nav.createTask')}
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                  {t('nav.profile')}
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/tasks"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {t('nav.tasks')}
              </Link>
              <Link
                to="/mobile-apps"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Android App
                </div>
              </Link>
              <Link
                to="/mobile-apps"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Apple className="h-4 w-4 mr-2" />
                  iOS App
                </div>
              </Link>
              <LanguageSwitcher />
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {t('nav.signIn')}
                  </Link>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {t('nav.signUp')}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/create-task"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {t('nav.createTask')}
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {t('nav.profile')}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Panel
                      </div>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;