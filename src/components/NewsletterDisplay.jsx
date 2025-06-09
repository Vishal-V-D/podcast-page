// components/NewsletterDisplay.jsx
import React, { useState, useEffect } from 'react';
import { Mail, Save, Edit, ClipboardCopy, CheckCircle, Send, Loader2 } from 'lucide-react'; // Added Loader2 icon

const NewsletterDisplay = ({ content, onCopy, copiedSection, onSave, onPost, isLoading, message }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  // NEW STATE: For the newsletter title
  const [newsletterTitle, setNewsletterTitle] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Utility function to convert newlines to <br /> for HTML display/posting
  const convertNewlinesToBr = (text) => {
    if (!text) return '';
    // Use a regex to replace all newline characters with <br />
    return text.replace(/\n/g, '<br />');
  };

  // Utility function to dedent text
  const dedentText = (text) => {
    if (!text) return '';
    const lines = text.split('\n');
    let minIndent = Infinity;

    for (const line of lines) {
      if (line.trim().length === 0) continue;
      const leadingWhitespaceMatch = line.match(/^\s*/);
      const leadingWhitespace = leadingWhitespaceMatch ? leadingWhitespaceMatch[0].length : 0;
      minIndent = Math.min(minIndent, leadingWhitespace);
    }

    if (minIndent === Infinity || minIndent === 0) {
      return text;
    }

    return lines.map(line => line.substring(minIndent)).join('\n');
  };

  useEffect(() => {
    const dedentedContent = dedentText(content);
    setEditedContent(dedentedContent);

    // Only set initial title if the current newsletterTitle state is empty.
    // This allows user input to override the default suggestion.
    // If the user clears the title, it will be reset to a suggestion when `content` changes.
    if (!newsletterTitle) {
        const firstLine = dedentedContent.split('\n')[0].trim();
        if (firstLine) {
            setNewsletterTitle(`Newsletter: ${firstLine.substring(0, 50)}${firstLine.length > 50 ? '...' : ''}`);
        } else {
            setNewsletterTitle('New Newsletter Draft'); // Default title if content is empty
        }
    }
  }, [content, newsletterTitle]); // Add newsletterTitle to dependency array to re-evaluate when it's cleared by user

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    onSave(editedContent, 'newsletter');
    setIsEditing(false);
  };

  const handlePostClick = async () => {
    if (!newsletterTitle.trim()) {
        alert("Please enter a title for your newsletter before posting.");
        return;
    }
    // Show a confirmation before posting
    if (window.confirm(`Are you sure you want to post "${newsletterTitle.substring(0, 50)}..." to your subscribers?`)) {
      setShowConfirmation(true);
      // Convert newlines to <br /> for HTML content before posting
      const contentForPost = convertNewlinesToBr(editedContent);
      await onPost(contentForPost, newsletterTitle); // Pass formatted content and title
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100 mb-8 animate-slide-up delay-200">
      <h3 className="text-2xl font-bold text-pink-700 mb-4 flex items-center">
        <Mail className="mr-2 text-pink-600" size={24} /> Newsletter Draft
      </h3>
      <div className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 max-w-2xl mx-auto">
        {/* Simulated Email Interface */}
        <div className="bg-white p-4 rounded-t-lg border-b border-gray-200">
          {/* NEW: Title Input Field */}
          <div className="mb-3">
              <label htmlFor="newsletterTitle" className="block text-sm font-medium text-gray-700">
                Newsletter Title:
              </label>
              <input
                  type="text"
                  id="newsletterTitle"
                  value={newsletterTitle}
                  onChange={(e) => setNewsletterTitle(e.target.value)}
                  readOnly={isLoading} // Disable input while loading/posting
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter a unique title for your newsletter"
              />
          </div>
          <p className="text-gray-600 text-sm">From: Your Agent &lt;noreply@yourapp.com&gt;</p>
        </div>
        <div className="p-4 bg-white rounded-b-lg">
          {isEditing ? ( // When editing, use textarea
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              readOnly={isLoading} // readOnly when loading
              rows="15"
              className="w-full p-2 text-gray-800 resize-none focus:outline-none overflow-y-auto custom-scrollbar"
            ></textarea>
          ) : ( // When not editing, use div with dangerouslySetInnerHTML
            <div
              className="prose max-w-none p-2 text-gray-800 overflow-y-auto custom-scrollbar"
              dangerouslySetInnerHTML={{ __html: convertNewlinesToBr(editedContent) }} // Convert newlines for display
              style={{ maxHeight: '400px' }} // Example max height
            />
          )}
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
              disabled={isLoading}
            >
              <Save size={18} />
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition duration-200"
              title="Edit newsletter"
              disabled={isLoading}
            >
              <Edit size={18} />
            </button>
          )}
          <button
            onClick={() => onCopy(editedContent, 'newsletter')}
            className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition duration-200"
            title="Copy newsletter"
            disabled={isLoading}
          >
            {copiedSection === 'newsletter' ? <CheckCircle size={18} className="text-green-500" /> : <ClipboardCopy size={18} />}
          </button>

          {/* New Post Button */}
          {content && (
            <button
              onClick={handlePostClick}
              className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition duration-200"
              title="Post newsletter to subscribers"
              disabled={isLoading || showConfirmation}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          )}
        </div>

        {showConfirmation && (
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center p-2 bg-green-500 text-white text-sm rounded-lg shadow-lg animate-bounce-in">
            <CheckCircle size={18} className="mr-2" /> Newsletter post initiated! Check your service for status.
          </div>
        )}

        {/* Display message from App.jsx's newsletterPostMessage state */}
        {message && (
          <div className={`mt-4 text-center text-sm p-2 rounded-lg ${message.includes('Error') || message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterDisplay;