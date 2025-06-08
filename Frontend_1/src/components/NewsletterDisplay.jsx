import React, { useState, useEffect } from 'react';
import { Mail, Save, Edit, ClipboardCopy, CheckCircle } from 'lucide-react';

const NewsletterDisplay = ({ content, onCopy, copiedSection, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setEditedContent(content); // Update editedContent when content prop changes
  }, [content]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    onSave(editedContent, 'newsletter'); // Pass edited content to parent
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100 mb-8 animate-slide-up delay-200">
      <h3 className="text-2xl font-bold text-pink-700 mb-4 flex items-center">
        <Mail className="mr-2 text-pink-600" size={24} /> Newsletter Draft
      </h3>
      <div className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 max-w-2xl mx-auto">
        {/* Simulated Email Interface */}
        <div className="bg-white p-4 rounded-t-lg border-b border-gray-200">
          <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">From:</span> AI Content Generator {'<noreply@aicontent.com>'}</p>
          <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">To:</span> Your Subscriber {'<subscriber@example.com>'}</p>
          <p className="text-sm text-gray-700"><span className="font-semibold">Subject:</span> Your Weekly Content Insights!</p>
        </div>
        <div className="p-4 bg-white rounded-b-lg">
          <p className="text-sm text-blue-600 mb-4 cursor-pointer hover:underline">View in browser</p>
          {/* Newsletter Content */}
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            readOnly={!isEditing}
            rows="12"
            className="w-full p-0 border-0 bg-transparent text-gray-800 resize-none focus:outline-none overflow-y-auto custom-scrollbar"
          ></textarea>
        </div>
        {/* Simulated Newsletter Footer */}
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
              className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition duration-200"
              title="Edit newsletter"
            >
              <Edit size={18} />
            </button>
          )}
          <button
            onClick={() => onCopy(editedContent, 'newsletter')}
            className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition duration-200"
            title="Copy newsletter"
          >
            {copiedSection === 'newsletter' ? <CheckCircle className="text-green-500" size={18} /> : <ClipboardCopy size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterDisplay;