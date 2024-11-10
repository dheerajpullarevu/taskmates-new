import React from 'react';
import { Newspaper, Download } from 'lucide-react';

const PressPage = () => {
  const pressReleases = [
    {
      id: 1,
      title: 'TaskMates Raises $5M to Expand Services Across India',
      date: '2024-03-01',
      source: 'TechCrunch',
      excerpt: 'TaskMates, the leading task-based services platform in India, announces successful funding round to fuel expansion.'
    },
    {
      id: 2,
      title: 'TaskMates Launches Operations in 10 New Cities',
      date: '2024-02-15',
      source: 'Economic Times',
      excerpt: 'Platform expands its footprint to tier-2 cities, bringing flexible earning opportunities to more Indians.'
    }
  ];

  const mediaKit = {
    logos: [
      { name: 'TaskMates Logo - Dark', format: 'PNG, SVG' },
      { name: 'TaskMates Logo - Light', format: 'PNG, SVG' },
      { name: 'TaskMates Icon', format: 'PNG, SVG' }
    ],
    photos: [
      { name: 'Office Photos', format: 'JPG' },
      { name: 'Team Photos', format: 'JPG' },
      { name: 'Product Screenshots', format: 'PNG' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Press Room</h1>
          <p className="mt-4 text-xl text-gray-500">
            Latest news and media resources from TaskMates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Press Releases</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {pressReleases.map((release) => (
                  <div key={release.id} className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Newspaper className="h-4 w-4 mr-1" />
                      <span>{release.source}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(release.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {release.title}
                    </h3>
                    <p className="text-gray-500 mb-4">{release.excerpt}</p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Read More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Media Contact</h2>
              <div className="space-y-2">
                <p className="text-gray-500">For press inquiries:</p>
                <p className="font-medium">press@taskmates.in</p>
                <p className="text-gray-500">+91-9916666560</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Media Kit</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Logos</h3>
                  <div className="space-y-2">
                    {mediaKit.logos.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-500">{item.name}</span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Photos</h3>
                  <div className="space-y-2">
                    {mediaKit.photos.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-500">{item.name}</span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;