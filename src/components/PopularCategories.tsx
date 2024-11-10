import React from 'react';
import { Link } from 'react-router-dom';
import {
  Truck, Briefcase, Globe, Wrench, PenTool, ShoppingBag,
  Smartphone, Home, Book, Camera, Palette, MessageSquare
} from 'lucide-react';

const categories = [
  {
    id: 'delivery',
    name: 'Delivery & Logistics',
    icon: <Truck className="h-6 w-6" />,
    description: 'Quick deliveries, moving help, and courier services',
    color: 'bg-orange-100 text-orange-600',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'professional',
    name: 'Professional Services',
    icon: <Briefcase className="h-6 w-6" />,
    description: 'Business, legal, and consulting services',
    color: 'bg-blue-100 text-blue-600',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'online',
    name: 'Online Tasks',
    icon: <Globe className="h-6 w-6" />,
    description: 'Digital tasks, data entry, and virtual assistance',
    color: 'bg-purple-100 text-purple-600',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'handyman',
    name: 'Handyman',
    icon: <Wrench className="h-6 w-6" />,
    description: 'Repairs, maintenance, and home improvement',
    color: 'bg-yellow-100 text-yellow-600',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    icon: <PenTool className="h-6 w-6" />,
    description: 'Graphic design, content creation, and branding',
    color: 'bg-pink-100 text-pink-600',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'shopping',
    name: 'Personal Shopping',
    icon: <ShoppingBag className="h-6 w-6" />,
    description: 'Personal shopping and gift buying assistance',
    color: 'bg-green-100 text-green-600',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400'
  }
];

const subCategories = [
  { icon: <Smartphone />, name: 'Tech Support' },
  { icon: <Home />, name: 'Home Services' },
  { icon: <Book />, name: 'Tutoring' },
  { icon: <Camera />, name: 'Photography' },
  { icon: <Palette />, name: 'Art & Design' },
  { icon: <MessageSquare />, name: 'Translation' },
];

const PopularCategories = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Task Categories
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Find the perfect TaskMate for any job, big or small
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/tasks?category=${category.id}`}
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className={`inline-flex items-center justify-center p-2 rounded-lg ${category.color} mb-3`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            More Specialized Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subCategories.map((category, index) => (
              <Link
                key={index}
                to={`/tasks?category=${category.name.toLowerCase()}`}
                className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-blue-600 mb-2">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;