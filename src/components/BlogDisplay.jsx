import React, { useState, useEffect } from 'react';
import { Book, UserRound, Calendar, Save, Edit, ClipboardCopy, CheckCircle } from 'lucide-react';

const BlogDisplay = ({ content, onCopy, copiedSection, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setEditedContent(content); // Update editedContent when content prop changes
  }, [content]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    onSave(editedContent, 'blog'); // Pass edited content to parent
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 mb-8 animate-slide-up">
      <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
        <Book className="mr-2 text-blue-600" size={24} /> SEO-Optimized Blog Post
      </h3>
      <div className="relative border border-gray-200 rounded-lg p-6 bg-gray-50 max-w-3xl mx-auto">
        {/* Simulated Blog Post Header */}
        <h4 className="text-3xl font-extrabold text-gray-900 mb-2">The Future of Content: AI's Transformative Power</h4>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <UserRound className="w-4 h-4 mr-1" /> <span className="mr-3">By AI Content Agent</span>
          <Calendar className="w-4 h-4 mr-1" /> <span>June 3, 2025</span>
        </div>
        <img
          src="https://placehold.co/800x400/E0BBE4/FFFFFF?text=AI+Content+Creation" // Placeholder blog image
          alt="Blog Header"
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
        {/* Blog Post Content */}
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          readOnly={!isEditing}
          rows="15"
          className="w-full p-0 border-0 bg-transparent text-gray-800 resize-none focus:outline-none overflow-y-auto custom-scrollbar"
        ></textarea>
        {/* Simulated Blog Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
          <p>Tags: #AI #ContentMarketing #SEO #Startups</p>
        </div>
        <div className="absolute top-2 right-2 flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="p-2 bg-green-200 rounded-full text-green-600 hover:bg-green-300 transition duration-200"
              title="Save changes"
            >
              <Save size={18} />
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition duration-200"
              title="Edit blog post"
            >
              <Edit size={18} />
            </button>
          )}
          <button
            onClick={() => onCopy(editedContent, 'blog')}
            className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition duration-200"
            title="Copy blog post"
          >
            {copiedSection === 'blog' ? <CheckCircle className="text-green-500" size={18} /> : <ClipboardCopy size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDisplay;