import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import PopularCategories from './components/PopularCategories';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import SupportPage from './pages/SupportPage';
import CreateTaskForm from './components/tasks/CreateTaskForm';
import TaskList from './components/tasks/TaskList';
import ProfilePage from './pages/ProfilePage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiePage from './pages/CookiePage';
import AccessibilityPage from './pages/AccessibilityPage';
import AppStorePage from './pages/AppStorePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTickets from './pages/admin/AdminTickets';
import AdminTasks from './pages/admin/AdminTasks';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import SubAdminManagement from './pages/admin/SubAdminManagement';

// Protected Route Component
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isMasterAdmin } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isMasterAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const isAdmin = user?.role === 'admin' || user?.role === 'master_admin';

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <PopularCategories />
              <Features />
              <HowItWorks />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/mobile-apps" element={<AppStorePage />} />
          
          <Route
            path="/tasks"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                <h1 className="text-3xl font-bold mb-8">Available Tasks</h1>
                <TaskList />
              </div>
            }
          />
          
          <Route
            path="/tasks/:taskId"
            element={<TaskDetailsPage />}
          />
          
          <Route
            path="/create-task"
            element={
              isAuthenticated ? (
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
                  <h1 className="text-3xl font-bold mb-8">Create New Task</h1>
                  <CreateTaskForm />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          <Route
            path="/profile/:userId?"
            element={
              isAuthenticated ? (
                <ProfilePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="sub-admins" element={<SubAdminManagement />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;