import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import BlogCard from '../components/BlogCard';
import { debounce } from '../lib/utils';

const SearchPage: React.FC = () => {
  const { searchPosts, likePost, loading } = useBlog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const searchResults = await searchPosts(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce(performSearch, 300);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    }
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
    performSearch(searchQuery);
  };

  const handleLikePost = (postId: string) => {
    likePost(postId);
    // Update the results array with the updated post
    setResults(prevResults => 
      prevResults.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.isLikedByUser ? post.likes - 1 : post.likes + 1,
              isLikedByUser: !post.isLikedByUser 
            } 
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Posts</h1>
          
          <form onSubmit={handleSearchSubmit} className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by title, content, tags, or category..."
                className="w-full py-3 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent shadow-sm"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-900"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
          
          {loading || isSearching ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
          ) : (
            <div>
              {searchQuery && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {results.length === 0 
                      ? 'No results found' 
                      : `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    }
                  </h2>
                </div>
              )}
              
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((post) => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      onLike={handleLikePost}
                    />
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-600 mb-4">
                    No posts found for "{searchQuery}". Try different keywords or browse our categories.
                  </p>
                  <Link 
                    to="/categories" 
                    className="inline-flex items-center text-blue-900 hover:text-teal-600 font-medium"
                  >
                    Browse Categories
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-600">
                    Start typing to search for posts.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;