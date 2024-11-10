import React from 'react';

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Accessibility Statement</h1>
        <div className="mt-8 prose prose-blue max-w-none">
          <h2>Our Commitment</h2>
          <p>
            TaskMates is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability.
          </p>

          <h2>Accessibility Standards</h2>
          <p>
            We aim to comply with WCAG 2.1 Level AA standards by:
          </p>
          <ul>
            <li>Providing text alternatives for non-text content</li>
            <li>Ensuring proper color contrast</li>
            <li>Making all functionality available from keyboard</li>
            <li>Providing clear navigation and structure</li>
            <li>Making content adaptable and compatible with assistive technologies</li>
          </ul>

          <h2>Features</h2>
          <h3>Navigation</h3>
          <ul>
            <li>Consistent navigation structure</li>
            <li>Skip to main content links</li>
            <li>Descriptive page titles</li>
            <li>Clear heading hierarchy</li>
          </ul>

          <h3>Content</h3>
          <ul>
            <li>Alt text for images</li>
            <li>Transcripts for audio content</li>
            <li>Captions for video content</li>
            <li>Resizable text without loss of functionality</li>
          </ul>

          <h3>Forms</h3>
          <ul>
            <li>Clear labels and instructions</li>
            <li>Error identification and suggestions</li>
            <li>Keyboard accessible form controls</li>
          </ul>

          <h2>Assistive Technology Support</h2>
          <p>
            Our website is designed to work with various assistive technologies:
          </p>
          <ul>
            <li>Screen readers</li>
            <li>Speech recognition software</li>
            <li>Screen magnification software</li>
            <li>Alternative input devices</li>
          </ul>

          <h2>Known Issues</h2>
          <p>
            We are continuously working to improve accessibility. Current known issues:
          </p>
          <ul>
            <li>Some older PDF documents may not be fully accessible</li>
            <li>Some third-party content may not meet all accessibility standards</li>
          </ul>

          <h2>Feedback</h2>
          <p>
            We welcome feedback on the accessibility of TaskMates. Please contact us at:
            <br />
            Email: accessibility@taskmates.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;