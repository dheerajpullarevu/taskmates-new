import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Task-Based Work in India',
      excerpt: 'Exploring how the gig economy is transforming the way Indians work and earn.',
      author: 'Team TaskMates',
      date: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'How to Succeed as a TaskMate',
      excerpt: 'Tips and strategies for maximizing your earnings and building a great reputation.',
      author: 'TaskMates Success Team',
      date: '2024-03-10',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Safety First: Our Commitment to User Protection',
      excerpt: 'Learn about the measures we take to ensure a safe and secure platform for all users.',
      author: 'TaskMates Security Team',
      date: '2024-03-05',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">TaskMates Blog</h1>
          <p className="mt-4 text-xl text-gray-500">
            Insights, Updates, and Stories from the TaskMates Community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-500 mb-4">{post.excerpt}</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                  Read More <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;