import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        <div className="mt-8 prose prose-blue max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using TaskMates, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>2. User Eligibility</h2>
          <p>
            You must be at least 18 years old to use TaskMates. By using our services, you represent that you are capable of entering into a binding contract.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            Users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials.
          </p>

          <h2>4. Task Creation and Execution</h2>
          <ul>
            <li>Task Givers must provide clear and accurate task descriptions</li>
            <li>Task Takers must complete tasks as specified</li>
            <li>All tasks must comply with local laws and regulations</li>
          </ul>

          <h2>5. Payments and Fees</h2>
          <p>
            TaskMates charges a 10% platform fee for task creation and a 10% fee for withdrawals. All payments are processed securely through our platform.
          </p>

          <h2>6. Cancellations and Refunds</h2>
          <p>
            Cancellation policies vary by task type. Refunds are processed according to our refund policy and may be subject to platform fees.
          </p>

          <h2>7. User Conduct</h2>
          <p>
            Users must maintain professional conduct and respect community guidelines. Harassment, fraud, or illegal activities will result in account termination.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            Users retain rights to their content while granting TaskMates license to use content for platform operations.
          </p>

          <h2>9. Liability Limitations</h2>
          <p>
            TaskMates is not liable for disputes between users or task outcomes. Users agree to resolve disputes through our mediation process.
          </p>

          <h2>10. Termination</h2>
          <p>
            TaskMates reserves the right to terminate accounts that violate these terms or engage in fraudulent activities.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We may update these terms periodically. Continued use of TaskMates after changes constitutes acceptance of new terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            For questions about these terms, please contact our support team at support@taskmates.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;