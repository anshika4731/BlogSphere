import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import BlogCard from '../components/BlogCard';
import { formatDate } from '../lib/utils';
import { User, Post } from '../types';

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPostsByAuthor, likePost } = useBlog();
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isCurrentUser = currentUser && (id === currentUser.id || !id);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = isCurrentUser ? currentUser!.id : id!;
        
        // In a real app, you would fetch the user profile here
        // For now, we'll use the currentUser if it's the user's own profile
        if (isCurrentUser) {
          setUser(currentUser);
        } else {
          // For demo, we'll get the author from their posts
          const posts = await getPostsByAuthor(userId);
          if (posts.length > 0) {
            setUser(posts[0].author);
            setUserPosts(posts);
          } else {
            setError('User not found');
          }
        }
        
        if (!isCurrentUser || userPosts.length === 0) {
          const posts = await getPostsByAuthor(userId);
          setUserPosts(posts);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [id, currentUser, isCurrentUser, getPostsByAuthor]);

  const handleLikePost = (postId: string) => {
    likePost(postId);
    // Update the userPosts array with the updated post
    setUserPosts(prevPosts => 
      prevPosts.map(post => 
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || 'User not found'}</h1>
        <p className="text-gray-600 mb-8">The user you're looking for doesn't exist or has been removed.</p>
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
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-blue-100 max-w-2xl mb-4">{user.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start items-center space-x-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">Joined {formatDate(user.joinedAt)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">Earth</span>
                </div>
              </div>
            </div>
            {isCurrentUser && (
              <div className="md:ml-auto">
                <Link
                  to="/settings"
                  className="inline-block bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                >
                  Edit Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts by {user.name}</h2>
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  onLike={handleLikePost}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                {isCurrentUser 
                  ? "You haven't written any posts yet." 
                  : `${user.name} hasn't written any posts yet.`
                }
              </p>
              {isCurrentUser && (
                <Link
                  to="/create"
                  className="inline-block bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
                >
                  Create Your First Post
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;