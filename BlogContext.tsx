import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, Comment, Category } from '../types';
import { posts as initialPosts, categories as initialCategories } from '../data/mockData';
import { useAuth } from './AuthContext';

type BlogContextType = {
  posts: Post[];
  categories: Category[];
  loading: boolean;
  getAllPosts: () => Promise<Post[]>;
  getPostById: (id: string) => Promise<Post | undefined>;
  getPostsByCategory: (categoryId: string) => Promise<Post[]>;
  getPostsByAuthor: (authorId: string) => Promise<Post[]>;
  searchPosts: (query: string) => Promise<Post[]>;
  createPost: (post: Omit<Post, 'id' | 'author' | 'publishedAt' | 'updatedAt' | 'likes' | 'comments' | 'isLikedByUser'>) => Promise<Post>;
  updatePost: (id: string, post: Partial<Post>) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<Post>;
  addComment: (postId: string, content: string) => Promise<Comment>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [categories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Load posts from localStorage if available
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const getAllPosts = async (): Promise<Post[]> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return posts;
    } finally {
      setLoading(false);
    }
  };

  const getPostById = async (id: string): Promise<Post | undefined> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      return posts.find((post) => post.id === id);
    } finally {
      setLoading(false);
    }
  };

  const getPostsByCategory = async (categoryId: string): Promise<Post[]> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return posts.filter((post) => post.categories.some((cat) => cat.id === categoryId));
    } finally {
      setLoading(false);
    }
  };

  const getPostsByAuthor = async (authorId: string): Promise<Post[]> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return posts.filter((post) => post.author.id === authorId);
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async (query: string): Promise<Post[]> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const lowercaseQuery = query.toLowerCase();
      return posts.filter((post) => 
        post.title.toLowerCase().includes(lowercaseQuery) || 
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        post.categories.some((cat) => cat.name.toLowerCase().includes(lowercaseQuery))
      );
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Omit<Post, 'id' | 'author' | 'publishedAt' | 'updatedAt' | 'likes' | 'comments' | 'isLikedByUser'>): Promise<Post> => {
    if (!currentUser) {
      throw new Error('You must be logged in to create a post');
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newPost: Post = {
        id: `${Date.now()}`,
        ...postData,
        author: currentUser,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        isLikedByUser: false,
      };
      
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, postData: Partial<Post>): Promise<Post> => {
    if (!currentUser) {
      throw new Error('You must be logged in to update a post');
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const existingPost = posts.find((post) => post.id === id);
      
      if (!existingPost) {
        throw new Error('Post not found');
      }
      
      if (existingPost.author.id !== currentUser.id) {
        throw new Error('You can only edit your own posts');
      }
      
      const updatedPost: Post = {
        ...existingPost,
        ...postData,
        updatedAt: new Date().toISOString(),
      };
      
      setPosts((prevPosts) => 
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
      
      return updatedPost;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    if (!currentUser) {
      throw new Error('You must be logged in to delete a post');
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const existingPost = posts.find((post) => post.id === id);
      
      if (!existingPost) {
        throw new Error('Post not found');
      }
      
      if (existingPost.author.id !== currentUser.id) {
        throw new Error('You can only delete your own posts');
      }
      
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (id: string): Promise<Post> => {
    if (!currentUser) {
      throw new Error('You must be logged in to like a post');
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const existingPost = posts.find((post) => post.id === id);
      
      if (!existingPost) {
        throw new Error('Post not found');
      }
      
      const updatedPost: Post = {
        ...existingPost,
        likes: existingPost.isLikedByUser 
          ? existingPost.likes - 1 
          : existingPost.likes + 1,
        isLikedByUser: !existingPost.isLikedByUser,
      };
      
      setPosts((prevPosts) => 
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
      
      return updatedPost;
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId: string, content: string): Promise<Comment> => {
    if (!currentUser) {
      throw new Error('You must be logged in to add a comment');
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const existingPost = posts.find((post) => post.id === postId);
      
      if (!existingPost) {
        throw new Error('Post not found');
      }
      
      const newComment: Comment = {
        id: `${Date.now()}`,
        content,
        publishedAt: new Date().toISOString(),
        author: currentUser,
      };
      
      const updatedPost: Post = {
        ...existingPost,
        comments: [newComment, ...existingPost.comments],
      };
      
      setPosts((prevPosts) => 
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
      
      return newComment;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    posts,
    categories,
    loading,
    getAllPosts,
    getPostById,
    getPostsByCategory,
    getPostsByAuthor,
    searchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};