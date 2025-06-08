// LinkedInDisplay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Save, Edit, ClipboardCopy, CheckCircle, Send, Image as ImageIcon, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const LinkedInDisplay = ({ content, onCopy, copiedSection, onSave, linkedinImage: initialLinkedinImage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [postStatus, setPostStatus] = useState(null); // 'idle', 'posting', 'success', 'error'
  const [postMessage, setPostMessage] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null); // New state for selected image file
  const [imagePreviewUrl, setImagePreviewUrl] = useState(initialLinkedinImage); // For displaying image preview
  const fileInputRef = useRef(null); // Ref for the file input

  // Add useEffect to update editedContent and imagePreviewUrl when content or initialLinkedinImage prop changes
  useEffect(() => {
    setEditedContent(content);
    setImagePreviewUrl(initialLinkedinImage); // Update preview if initial image changes
  }, [content, initialLinkedinImage]);

  // Handle redirects from LinkedIn OAuth flow and display status
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('linkedinPostStatus');
    const message = urlParams.get('message');

    if (status === 'success') {
      setPostStatus('success');
      setPostMessage('Successfully posted to LinkedIn!');
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'error') {
      setPostStatus('error');
      setPostMessage(`Failed to post to LinkedIn: ${message || 'Unknown error'}`);
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSave = () => {
    onSave(editedContent, 'linkedin');
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for image preview
    } else {
      setSelectedImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  };

  const handlePostToLinkedIn = async () => {
    setPostStatus('posting');
    setPostMessage('Posting to LinkedIn...');

    const formData = new FormData();
    formData.append('content', editedContent);
    if (selectedImageFile) {
      formData.append('image', selectedImageFile);
    }

    try {
      const response = await fetch('/api/linkedin/publish', { // Target the new unified endpoint
        method: 'POST',
        body: formData,
      });

      let responseBody;
      try {
        responseBody = await response.text(); // Read the response body as text ONCE
      } catch (textError) {
        console.error('Error reading response body as text:', textError);
        setPostStatus('error');
        setPostMessage(`Failed to post to LinkedIn: Could not read server response.`);
        return;
      }

      let data;
      try {
        data = JSON.parse(responseBody); // Try to parse the text as JSON
      } catch (jsonParseError) {
        console.error('JSON parse error:', jsonParseError);
        console.error('Raw response from server (from text):', responseBody);
        setPostStatus('error');
        setPostMessage(`Failed to post to LinkedIn: Server did not return valid JSON. Raw response: "${responseBody.substring(0, 100)}..."`);
        return;
      }

      if (response.status === 202 && data.redirect) {
        // Backend signals a redirect for OAuth login
        setPostMessage('Redirecting to LinkedIn for login...');
        window.location.href = data.redirect;
      } else if (response.ok && data.success) {
        setPostStatus('success');
        setPostMessage('Successfully posted to LinkedIn!');
        setSelectedImageFile(null); // Clear selected file on success
        setImagePreviewUrl(null); // Clear image preview on success
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setPostStatus('error');
        setPostMessage(`Failed to post to LinkedIn: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error posting to LinkedIn:', error);
      setPostStatus('error');
      setPostMessage(`Failed to post to LinkedIn: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fade-in border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" className="w-8 h-8 mr-3" />
        LinkedIn Post
      </h2>
      <div className="relative mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
        {isEditing ? (
          <textarea
            className="w-full p-0 border-0 bg-transparent text-gray-800 resize-none focus:outline-none overflow-y-auto custom-scrollbar min-h-[150px]"
            value={editedContent}
            onChange={handleEditChange}
            rows="6"
          />
        ) : (
          <div className="prose max-w-none text-gray-800 p-0 bg-transparent min-h-[150px] whitespace-pre-wrap">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

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
              title="Edit LinkedIn post"
            >
              <Edit size={18} />
            </button>
          )}
          <button
            onClick={() => onCopy(editedContent, 'LinkedIn Post')}
            className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200 transition duration-200"
            title="Copy LinkedIn post"
          >
            {copiedSection === 'LinkedIn Post' ? <CheckCircle className="text-green-500" size={18} /> : <ClipboardCopy size={18} />}
          </button>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
          <ImageIcon size={20} className="mr-2 text-gray-600" /> Attach Image (Optional)
        </h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {imagePreviewUrl && (
          <div className="mt-4 relative">
            <img src={imagePreviewUrl} alt="Image Preview" className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200" />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
              title="Remove image"
            >
              <XCircle size={20} />
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handlePostToLinkedIn}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300
          ${postStatus === 'posting' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          ${postStatus === 'success' ? 'bg-green-500' : ''}
          ${postStatus === 'error' ? 'bg-red-500' : ''} flex items-center justify-center`}
        disabled={postStatus === 'posting'}
      >
        {postStatus === 'posting' ? (
          <>
            <Send size={20} className="mr-2 animate-pulse" /> Posting...
          </>
        ) : postStatus === 'success' ? (
          <>
            <CheckCircle size={20} className="mr-2" /> Posted!
          </>
        ) : postStatus === 'error' ? (
          <>
            <span className="mr-2">❌</span> Failed
          </>
        ) : (
          <>
            <Send size={20} className="mr-2" /> Post to LinkedIn
          </>
        )}
      </button>
      {postMessage && (
        <p className={`mt-2 text-sm ${postStatus === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
          {postMessage}
        </p>
      )}
    </div>
  );
};

export default LinkedInDisplay;