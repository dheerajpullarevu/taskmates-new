import React from 'react';
import { HelpCircle, Book, MessageCircle, FileText } from 'lucide-react';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Support Center
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Find answers to common questions and get help when you need it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">FAQ</h3>
            <p className="mt-2 text-gray-500">Find answers to common questions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Book className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Guides</h3>
            <p className="mt-2 text-gray-500">Learn how to use TaskMates</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
            <p className="mt-2 text-gray-500">Chat with our support team</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Submit Ticket</h3>
            <p className="mt-2 text-gray-500">Create a support ticket</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "How do I create an account?",
                    a: "Click the 'Sign Up' button and follow the registration process. You'll need to verify your email and phone number."
                  },
                  {
                    q: "How does payment work?",
                    a: "Payments are held in escrow until task completion. We release funds to task takers after the task giver confirms completion."
                  },
                  {
                    q: "What if there's a dispute?",
                    a: "Our support team helps mediate disputes. Both parties can submit evidence and we'll help reach a fair resolution."
                  },
                  {
                    q: "How do I become a task taker?",
                    a: "Complete your profile, add skills, and verify your identity. You can then start browsing and applying for tasks."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Need More Help?</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="w-full btn">
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;