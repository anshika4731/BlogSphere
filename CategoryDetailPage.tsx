import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import BlogCard from '../components/BlogCard';
import { Post, Category } from '../types';

const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, getPostsByCategory, likePost } = useBlog();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Find category by slug
        const foundCategory = categories.find(cat => cat.slug === slug);
        
        if (!foundCategory) {
          setError('Category not found');
          setLoading(false);
          return;
        }
        
        setCategory(foundCategory);
        
        // Fetch posts for this category
        const categoryPosts = await getPostsByCategory(foundCategory.id);
        setPosts(categoryPosts);
      } catch (err) {
        console.error(err);
        setError('Failed to load category posts');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndPosts();
  }, []);

  const handleLikePost = (postId: string) => {
    likePost(postId);
    // Update the posts state with the liked/unliked post
    setPosts(prevPosts => 
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

  const getCategoryImage = (categoryName: string): string => {
    // Return appropriate image URL based on category name
    switch (categoryName.toLowerCase()) {
      case 'technology':
        return 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      case 'travel':
        return 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      case 'food':
        return 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      case 'lifestyle':
        return 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      case 'business':
        return 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      case 'health':
        return 'https://images.pexels.com/photos/1394651/pexels-photo-1394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      default:
        return 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Category not found'}</h1>
        <p className="text-gray-600">The category you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Header */}
      <div className="relative h-[30vh] bg-gray-900">
        <img 
          src={getCategoryImage(category.name)} 
          alt={category.name} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {category.name}
          </h1>
          <p className="text-gray-200 mt-2">
            Explore {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                onLike={handleLikePost}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
            <p className="text-gray-500">There are no posts in this category yet. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailPage;