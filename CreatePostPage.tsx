import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import RichTextEditor from '../components/RichTextEditor';
import { createExcerpt } from '../lib/utils';

const CreatePostPage: React.FC = () => {
  const { categories, createPost } = useBlog();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/create' } });
    }
  }, [isAuthenticated, navigate]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!coverImage.trim()) {
      newErrors.coverImage = 'Cover image URL is required';
    } else if (!isValidImageUrl(coverImage)) {
      newErrors.coverImage = 'Please enter a valid image URL';
    }
    
    if (selectedCategories.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidImageUrl = (url: string) => {
    // This is a simple validation. In a real app, you might want to check
    // if the URL actually points to an image
    return url.trim().startsWith('http') && 
           (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const selectedCategoriesObjects = categories.filter(cat => 
        selectedCategories.includes(cat.id)
      );
      
      const excerpt = createExcerpt(content);
      
      const postData = {
        title,
        content,
        excerpt,
        coverImage,
        categories: selectedCategoriesObjects,
        tags,
      };
      
      const newPost = await createPost(postData);
      navigate(`/post/${newPost.id}`);
    } catch (error) {
      console.error('Failed to create post:', error);
      setErrors({
        submit: 'Failed to create post. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || !currentUser) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h1>
            
            {errors.submit && (
              <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2 border ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent`}
                  placeholder="Enter post title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              
              {/* Cover Image */}
              <div className="mb-6">
                <label htmlFor="coverImage" className="block text-gray-700 font-medium mb-2">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className={`w-full px-4 py-2 border ${
                    errors.coverImage ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.coverImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
                )}
                {coverImage && !errors.coverImage && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img 
                      src={coverImage} 
                      alt="Cover preview" 
                      className="h-40 object-cover rounded-md"
                      onError={() => setErrors({...errors, coverImage: 'Invalid image URL'})}
                    />
                  </div>
                )}
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategories.includes(category.id)
                          ? 'bg-blue-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                {errors.categories && (
                  <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
                )}
              </div>
              
              {/* Tags */}
              <div className="mb-6">
                <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                  Tags
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyPress}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="Add tags and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <div 
                      key={tag} 
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Content Editor */}
              <div className="mb-8">
                <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                  Content
                </label>
                <RichTextEditor
                  onChange={setContent}
                  placeholder="Start writing your amazing post..."
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;