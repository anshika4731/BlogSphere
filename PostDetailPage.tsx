import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Calendar, Clock, User } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from '../components/CommentSection';
import ReactMarkdown from 'react-markdown';
import { formatDate, calculateReadingTime } from '../lib/utils';

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPostById, likePost, addComment } = useBlog();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const fetchedPost = await getPostById(id);
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            setError('Post not found');
          }
        }
      } catch (err) {
        setError('Failed to load post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }

    try {
      if (id) {
        const updatedPost = await likePost(id);
        setPost(updatedPost);
      }
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handleAddComment = async (content: string) => {
    try {
      if (id) {
        await addComment(id, content);
        // Refresh post to get updated comments
        const updatedPost = await getPostById(id);
        if (updatedPost) {
          setPost(updatedPost);
        }
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
      throw err;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch((err) => {
        console.error('Failed to share', err);
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Post not found'}</h1>
        <p className="text-gray-600 mb-8">The post you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white">
      {/* Hero Section with Cover Image */}
      <div className="relative h-[40vh] md:h-[60vh] bg-gray-900">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category: any) => (
              <Link 
                key={category.id} 
                to={`/category/${category.slug}`}
                className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-teal-700 transition"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Author and Meta Info */}
          <div className="flex flex-wrap items-center justify-between py-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <Link to={`/author/${post.author.id}`} className="font-medium text-gray-800 hover:text-blue-900">
                  {post.author.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {post.author.bio.substring(0, 60)}...
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-6">
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock size={16} className="mr-1" />
                <span>{calculateReadingTime(post.content)} min read</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none py-8">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-8">
            {post.tags.map((tag: string) => (
              <Link 
                key={tag} 
                to={`/tag/${tag.toLowerCase()}`}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 ${
                  post.isLikedByUser 
                    ? 'text-red-500' 
                    : 'text-gray-600 hover:text-red-500'
                } transition`}
              >
                <Heart size={20} className={post.isLikedByUser ? 'fill-current' : ''} />
                <span>{post.likes} likes</span>
              </button>
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-900 transition"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-xl p-6 my-10">
            <div className="flex items-start">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-gray-600 mb-4">{post.author.bio}</p>
                <Link 
                  to={`/author/${post.author.id}`}
                  className="flex items-center text-blue-900 hover:text-teal-600 font-medium"
                >
                  <span className="mr-1">View Profile</span>
                  <User size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection 
            comments={post.comments} 
            onAddComment={handleAddComment}
          />
        </div>
      </div>
    </article>
  );
};

export default PostDetailPage;