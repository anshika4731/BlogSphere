import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, Link as LinkIcon, Image } from 'lucide-react';
interface RichTextEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  initialValue = '', 
  onChange,
  placeholder = 'Start writing your blog post...'
}) => {
  const [content, setContent] = useState(initialValue);
  const [isPreview, setIsPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
  };

  const insertMarkdown = (markdownSyntax: string) => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newContent = before + markdownSyntax.replace('text', selection || 'text') + after;
    setContent(newContent);
    onChange(newContent);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <button 
            type="button"
            onClick={() => insertMarkdown('**text**')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button 
            type="button"
            onClick={() => insertMarkdown('*text*')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button 
            type="button"
            onClick={() => insertMarkdown('__text__')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Underline"
          >
            <Underline size={18} />
          </button>
          <span className="border-r border-gray-300"></span>
          <button 
            type="button"
            onClick={() => insertMarkdown('\n# text\n')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>
          <button 
            type="button"
            onClick={() => insertMarkdown('\n## text\n')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>
          <span className="border-r border-gray-300"></span>
          <button 
            type="button"
            onClick={() => insertMarkdown('\n- text\n')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button 
            type="button"
            onClick={() => insertMarkdown('\n1. text\n')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
          <span className="border-r border-gray-300"></span>
          <button 
            type="button"
            onClick={() => insertMarkdown('[text](url)')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Insert Link"
          >
            <LinkIcon size={18} />
          </button>
          <button 
            type="button"
            onClick={() => insertMarkdown('![alt text](image-url)')}
            className="p-1.5 rounded hover:bg-gray-200 transition"
            title="Insert Image"
          >
            <Image size={18} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            isPreview 
              ? 'bg-blue-900 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      <div className="relative">
        {isPreview ? (
          <div className="prose p-4 min-h-[400px] bg-white">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            id="editor"
            value={content}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full p-4 min-h-[400px] focus:outline-none resize-y"
          />
        )}
      </div>

      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-sm text-gray-500 flex justify-between items-center">
        <span>{content.length} characters</span>
        <span className="text-xs text-gray-400">Supports Markdown</span>
      </div>
    </div>
  );
};

export default RichTextEditor;