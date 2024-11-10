import React from 'react';

const CookiePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
        <div className="mt-8 prose prose-blue max-w-none">
          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit our website. They help us provide and improve our services by remembering your preferences and analyzing how you use TaskMates.
          </p>

          <h2>Types of Cookies We Use</h2>
          
          <h3>Essential Cookies</h3>
          <p>
            Required for basic website functionality:
          </p>
          <ul>
            <li>Authentication and security</li>
            <li>Session management</li>
            <li>Shopping cart functionality</li>
          </ul>

          <h3>Analytical Cookies</h3>
          <p>
            Help us understand how visitors use our site:
          </p>
          <ul>
            <li>Page visit statistics</li>
            <li>User behavior analysis</li>
            <li>Performance monitoring</li>
          </ul>

          <h3>Functional Cookies</h3>
          <p>
            Enable enhanced functionality:
          </p>
          <ul>
            <li>Language preferences</li>
            <li>Location settings</li>
            <li>Personalized content</li>
          </ul>

          <h2>Cookie Management</h2>
          <p>
            You can control cookies through your browser settings:
          </p>
          <ul>
            <li>Block all cookies</li>
            <li>Delete existing cookies</li>
            <li>Allow only essential cookies</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            We use cookies from trusted partners:
          </p>
          <ul>
            <li>Google Analytics</li>
            <li>Payment processors</li>
            <li>Social media platforms</li>
          </ul>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this policy periodically. Continue using TaskMates to accept any changes.
          </p>

          <h2>Contact Us</h2>
          <p>
            For questions about our cookie policy, contact privacy@taskmates.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePage;