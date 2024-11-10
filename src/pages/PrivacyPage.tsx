import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <div className="mt-8 prose prose-blue max-w-none">
          <p className="lead">
            Effective Date: March 15, 2024
          </p>

          <h2>1. Information We Collect</h2>
          <h3>Personal Information</h3>
          <ul>
            <li>Name and contact information</li>
            <li>Phone number and email address</li>
            <li>Location data</li>
            <li>Payment information</li>
            <li>Profile pictures and documents</li>
          </ul>

          <h3>Usage Information</h3>
          <ul>
            <li>Device information</li>
            <li>Log data and analytics</li>
            <li>Task history and interactions</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide and improve our services</li>
            <li>To process payments and transactions</li>
            <li>To verify user identity and prevent fraud</li>
            <li>To communicate with users</li>
            <li>To personalize user experience</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We share information only as necessary for task completion and platform operation:
          </p>
          <ul>
            <li>Between Task Givers and Task Takers</li>
            <li>With payment processors</li>
            <li>With service providers</li>
            <li>When required by law</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data:
          </p>
          <ul>
            <li>Encryption of sensitive data</li>
            <li>Regular security audits</li>
            <li>Access controls and monitoring</li>
          </ul>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request data deletion</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>6. Contact Information</h2>
          <p>
            For privacy-related inquiries, contact us at:
            <br />
            Email: privacy@taskmates.in
            <br />
            Address: [Company Address]
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;