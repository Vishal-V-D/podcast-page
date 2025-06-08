import React, { useState, useEffect } from 'react'; // Import useEffect
import { Save, Edit, ClipboardCopy, CheckCircle } from 'lucide-react'; // Added CheckCircle
import ReactMarkdown from 'react-markdown';

const TwitterDisplay = ({ content, onCopy, copiedSection, onSave, twitterImage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  // Add useEffect to update editedContent when content prop changes
  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSave = () => {
    onSave(editedContent, 'twitter');
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fade-in border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter/X" className="w-8 h-8 mr-3" />
        Twitter/X Post
      </h2>
      {/* Added relative positioning to the container that holds the content and buttons */}
      <div className="relative mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50"> {/* Added padding and background for content area */}
        {isEditing ? (
          <textarea
            className="w-full p-0 border-0 bg-transparent text-gray-800 resize-none focus:outline-none overflow-y-auto custom-scrollbar min-h-[150px]" // Removed padding from textarea itself
            value={editedContent}
            onChange={handleEditChange}
            rows="6"
          />
        ) : (
          <div className="prose max-w-none text-gray-800 p-0 bg-transparent min-h-[150px] whitespace-pre-wrap"> {/* Removed padding from div */}
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {/* Buttons moved to absolute position within the content container */}
        <div className="absolute top-2 right-2 flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-2 bg-green-200 rounded-full text-green-600 hover:bg-green-300 transition duration-200"
              title="Save changes"
            >
              <Save size={18} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition duration-200"
              title="Edit Twitter/X post"
            >
              <Edit size={18} />
            </button>
          )}
          <button
            onClick={() => onCopy(editedContent, 'Twitter/X Post')} // Changed content to editedContent for copy
            className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition duration-200"
            title="Copy Twitter/X post"
          >
            {copiedSection === 'Twitter/X Post' ? <CheckCircle className="text-green-500" size={18} /> : <ClipboardCopy size={18} />}
          </button>
        </div>
      </div>

      {twitterImage && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Generated Image:</h3>
          <img src={twitterImage} alt="Twitter Post Visual" className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200" />
        </div>
      )}
    </div>
  );
};

export default TwitterDisplay;