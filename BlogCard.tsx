import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, Clock } from 'lucide-react';
import { Post } from '../types';
import { formatDate } from '../lib/utils';

interface BlogCardProps {
  post: Post;
  onLike?: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onLike }) => {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLike) {
      onLike(post.id);
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/post/${post.id}`} className="block">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
          {post.categories.length > 0 && (
            <span className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {post.categories[0].name}
            </span>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{Math.ceil(post.content.length / 1000)} min read</span>
          </div>
        </div>

        <Link to={`/post/${post.id}`} className="block">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-900 transition">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        </Link>

        <div className="flex items-center justify-between">
          <Link to={`/author/${post.author.id}`} className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLikeClick}
              className={`flex items-center ${post.isLikedByUser ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition`}
            >
              <Heart size={16} className={post.isLikedByUser ? 'fill-current' : ''} />
              <span className="ml-1">{post.likes}</span>
            </button>
            <Link to={`/post/${post.id}#comments`} className="flex items-center text-gray-500 hover:text-blue-900 transition">
              <MessageCircle size={16} />
              <span className="ml-1">{post.comments.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;