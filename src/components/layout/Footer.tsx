import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import { Github, Twitter, Heart } from 'lucide-react'; // Example icons

const Footer: React.FC = () => {
  console.log("Rendering Footer component");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12 py-8 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lovable Clones Inc.</h3>
            <p className="text-sm">Craft your unique digital companion.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-pink-500">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-pink-500">My Clones</Link></li>
              <li><Link to="/editor" className="hover:text-pink-500">Create New</Link></li>
              {/* Add other relevant links */}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-2">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-500" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:text-pink-500" aria-label="GitHub"><Github size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Lovable Clones Inc. Made with <Heart className="inline h-4 w-4 text-pink-500" />.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;