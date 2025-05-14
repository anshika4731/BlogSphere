// Format date to readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Options for date formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};

// Create excerpt from content
export const createExcerpt = (content: string, maxLength = 150): string => {
  // Remove HTML tags
  const textContent = content.replace(/<\/?[^>]+(>|$)/g, '');
  
  if (textContent.length <= maxLength) {
    return textContent;
  }
  
  // Find the last space before maxLength
  const lastSpace = textContent.lastIndexOf(' ', maxLength);
  
  // If no space found, just cut at maxLength
  if (lastSpace === -1) {
    return textContent.substring(0, maxLength) + '...';
  }
  
  // Cut at the last space and add ellipsis
  return textContent.substring(0, lastSpace) + '...';
};

// Calculate reading time
export const calculateReadingTime = (content: string): number => {
  // Average reading speed (words per minute)
  const wordsPerMinute = 200;
  
  // Remove HTML tags and count words
  const textContent = content.replace(/<\/?[^>]+(>|$)/g, '');
  const wordCount = textContent.split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, with at least one uppercase, one lowercase, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Sanitize HTML content to prevent XSS
export const sanitizeHtml = (html: string): string => {
  // This is a very basic implementation
  // In production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/javascript:/g, '');
};

// Generate random ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Debounce function for search inputs
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => func(...args), waitFor);
  };
}