import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: "#", 
      label: "LinkedIn",
      color: "hover:bg-[#0077b5]"
    },
    { 
      icon: <Facebook className="h-5 w-5" />, 
      href: "#", 
      label: "Facebook",
      color: "hover:bg-[#1877f2]"
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      href: "#", 
      label: "Instagram",
      color: "hover:bg-gradient-to-r hover:from-[#fd5949] hover:to-[#d6249f]"
    },
    { 
      icon: <Youtube className="h-5 w-5" />, 
      href: "#", 
      label: "YouTube",
      color: "hover:bg-[#ff0000]"
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      href: "#", 
      label: "X (Twitter)",
      color: "hover:bg-black"
    }
  ];

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center text-white mb-4">
              <BriefcaseIcon className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">TaskMates</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connect with skilled professionals for any task. Get more done with TaskMates.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white ${social.color} transition-all duration-300 transform hover:scale-110`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white">Press</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link to="/safety" className="text-gray-400 hover:text-white">Safety</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
              <li><Link to="/accessibility" className="text-gray-400 hover:text-white">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} TaskMates. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/mobile-apps" className="text-gray-400 hover:text-white">
                Download Mobile App
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;