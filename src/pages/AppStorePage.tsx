import React from 'react';
import { Apple, Smartphone } from 'lucide-react';

const AppStorePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Coming Soon to Mobile
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The TaskMates mobile app is currently under development. Stay tuned for a seamless task management experience on your phone!
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* App Store */}
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-50"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-black rounded-xl mb-6">
                <Apple className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">iOS App Store</h2>
              <p className="text-gray-600 mb-6">
                Download TaskMates for iPhone and iPad. Experience the power of efficient task management on iOS.
              </p>
              <button disabled className="w-full btn bg-black hover:bg-gray-900">
                Coming Soon on App Store
              </button>
            </div>
          </div>

          {/* Play Store */}
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-50"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-xl mb-6">
                <Smartphone className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Google Play Store</h2>
              <p className="text-gray-600 mb-6">
                Get TaskMates for Android devices. Manage tasks efficiently on your Android smartphone or tablet.
              </p>
              <button disabled className="w-full btn bg-green-600 hover:bg-green-700">
                Coming Soon on Play Store
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Notified</h3>
          <p className="text-gray-600 mb-6">
            Leave your email to be the first to know when our mobile apps are ready!
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button type="submit" className="btn">
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppStorePage;