import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { formatDate } from '../lib/utils';
import { ArrowRight } from 'lucide-react';

interface FeaturedPostsProps {
  posts: Post[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  const mainPost = posts[0];
  const secondaryPosts = posts.slice(1, 5);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Posts</h2>
          <Link to="/featured" className="flex items-center text-blue-900 hover:text-teal-600 transition">
            <span className="mr-1">View all</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main featured post */}
          <div className="relative group bg-white rounded-xl shadow-md overflow-hidden">
            <Link to={`/post/${mainPost.id}`}>
              <div className="relative h-64 lg:h-96 overflow-hidden">
                <img 
                  src={mainPost.coverImage} 
                  alt={mainPost.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {mainPost.categories[0]?.name || 'General'}
                    </span>
                    <span className="text-white text-sm">
                      {formatDate(mainPost.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition">
                    {mainPost.title}
                  </h3>
                  <p className="text-gray-200 line-clamp-2 mb-4">
                    {mainPost.excerpt}
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={mainPost.author.avatar} 
                      alt={mainPost.author.name} 
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span className="text-sm font-medium text-white">{mainPost.author.name}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary featured posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondaryPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link to={`/post/${post.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.categories[0]?.name || 'General'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2">{formatDate(post.publishedAt)}</div>
                    <h3 className="text-gray-800 font-bold mb-2 line-clamp-2 hover:text-blue-900 transition">
                      {post.title}
                    </h3>
                    <div className="flex items-center">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        className="w-6 h-6 rounded-full mr-2 object-cover"
                      />
                      <span className="text-xs font-medium text-gray-700">{post.author.name}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;