import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { Post } from '../types';
import BlogCard from '../components/BlogCard';
import CategoryList from '../components/CategoryList';
import FeaturedPosts from '../components/FeaturedPosts';

const HomePage: React.FC = () => {
  const { posts, categories, loading, getAllPosts, getPostsByCategory, likePost } = useBlog();
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  const fetchPosts = useCallback(async (categoryId: string) => {
    try {
      const fetchedPosts = categoryId
        ? await getPostsByCategory(categoryId)
        : await getAllPosts();
      setDisplayedPosts(fetchedPosts);
      setPage(1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [getAllPosts, getPostsByCategory]);

  useEffect(() => {
    fetchPosts(selectedCategoryId);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
  }, []);

  const handleLikePost = useCallback((postId: string) => {
    likePost(postId);
    setDisplayedPosts(prevPosts => 
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
  }, [likePost]);

  const paginatedPosts = displayedPosts.slice(0, page * postsPerPage);
  const hasMorePosts = displayedPosts.length > page * postsPerPage;
  const featuredPosts = posts.slice(0, 5);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Share Your Ideas With The World
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our community of writers and readers to discover stories that matter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/create"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full transition transform hover:scale-105"
            >
              Start Writing
            </Link>
            <Link
              to="/categories"
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-full transition"
            >
              Explore Topics
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <FeaturedPosts posts={featuredPosts} />

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
            <CategoryList 
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={handleCategorySelect}
            />
          </div>

          {/* Blog Posts */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
          ) : (
            <>
              {displayedPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPosts.map((post) => (
                      <BlogCard 
                        key={post.id} 
                        post={post} 
                        onLike={handleLikePost}
                      />
                    ))}
                  </div>
                  
                  {/* Load More Button */}
                  {hasMorePosts && (
                    <div className="mt-10 text-center">
                      <button
                        onClick={loadMore}
                        className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts found</h3>
                  <p className="text-gray-500 mb-6">There are no posts in this category yet.</p>
                  <Link
                    to="/create"
                    className="inline-flex items-center text-blue-900 hover:text-teal-600 font-medium"
                  >
                    <span>Write the first post</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to share your story?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who have found their voice and audience on BlogSphere.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-full transition transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;