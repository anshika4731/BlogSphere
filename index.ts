export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  joinedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  author: User;
  likes: number;
  comments: Comment[];
  categories: Category[];
  tags: string[];
  isLikedByUser: boolean;
}

export interface Comment {
  id: string;
  content: string;
  publishedAt: string;
  author: User;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}