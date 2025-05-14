import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, PenSquare, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-900">Blog<span className="text-teal-600">Sphere</span></span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-900 transition">Home</Link>
            <Link to="/categories" className="text-gray-600 hover:text-blue-900 transition">Categories</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-900 transition">About</Link>
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center relative flex-1 max-w-sm mx-8">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 text-gray-400 hover:text-blue-900">
              <Search size={18} />
            </button>
          </form>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/create" className="flex items-center space-x-1 text-blue-900 hover:text-teal-600 transition">
                  <PenSquare size={18} />
                  <span>Write</span>
                </Link>
                <div className="relative">
                  <button className="flex items-center space-x-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img 
                      src={currentUser?.avatar} 
                      alt={currentUser?.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                      <div className="py-2">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-900 hover:text-blue-700 transition">Log in</Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-full transition"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
          <nav className="flex flex-col space-y-4 mb-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-900 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-600 hover:text-blue-900 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-blue-900 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>

          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-900">
                <Search size={18} />
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={currentUser?.avatar} 
                    alt={currentUser?.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">{currentUser?.name}</span>
                </div>
                <Link 
                  to="/create" 
                  className="flex items-center space-x-2 text-blue-900 hover:text-teal-600 transition mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PenSquare size={18} />
                  <span>Write a post</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="block text-gray-600 hover:text-blue-900 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/dashboard" 
                  className="block text-gray-600 hover:text-blue-900 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/settings" 
                  className="block text-gray-600 hover:text-blue-900 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block text-red-600 hover:text-red-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="text-center py-2 text-blue-900 hover:text-blue-700 border border-blue-900 rounded-full transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="text-center bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
