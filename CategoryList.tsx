import React, { memo } from 'react';
import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelectCategory?: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = memo(({ 
  categories, 
  selectedCategoryId, 
  onSelectCategory 
}) => {
  const handleCategoryClick = (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };

  const getCategoryButtonClasses = (isSelected: boolean) => {
    return isSelected 
      ? 'bg-blue-900 text-white' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button 
        onClick={(e) => handleCategoryClick(e, '')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedCategoryId ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={(e) => handleCategoryClick(e, category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${getCategoryButtonClasses(selectedCategoryId === category.id)}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
});

CategoryList.displayName = 'CategoryList';

export default CategoryList;
