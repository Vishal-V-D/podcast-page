<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Youtube, FileText, Linkedin, Mail, Loader2, Sparkles, ClipboardCopy, CheckCircle, Home, Book, Rss, Menu, X, Image, Calendar, UserRound, Twitter, Filter, Edit, Save, Folder, Settings, LifeBuoy, Info, BarChart2, Clock, CheckCircle2, XCircle, UserCircle, LogOut } from 'lucide-react';

// Import all refactored components
import ActionButton from './components/ActionButton';
import BlogDisplay from './components/BlogDisplay';
import LinkedInDisplay from './components/LinkedInDisplay';
import NewsletterDisplay from './components/NewsletterDisplay';
import TwitterDisplay from './components/TwitterDisplay';
import ProfilePage from './components/ProfilePage';
import Sidebar from './components/Sidebar';
import MainContentHeader from './components/MainContentHeader';
import InputSection from './components/InputSection';
import GenerationOptions from './components/GenerationOptions';
import TranscribedTextDisplay from './components/TranscribedTextDisplay';
import ActionButtons from './components/ActionButtons'; // Plural 'ActionButtons' component
import RecentUploadsDisplay from './components/RecentUploadsDisplay';
import ContentLibraryDisplay from './components/ContentLibraryDisplay';
import AnalyticsDisplay from './components/AnalyticsDisplay';
import SettingsDisplay from './components/SettingsDisplay';
import HelpSupportDisplay from './components/HelpSupportDisplay';
import GeneratedContentOverview from './components/GeneratedContentOverview'; // NEW IMPORT


// Main App component
const App = () => {
  // Define the backend URL here as a single variable
  // IMPORTANT: Remember to update this with your active ngrok URL or deployment URL!
  const BACKEND_URL = "https://4f27-35-226-52-255.ngrok-free.app"; // Your provided ngrok URL

  // State variables for inputs, transcription, generated content, and UI states
  const [audioFile, setAudioFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [youtubeThumbnail, setYoutubeThumbnail] = useState(''); // New state for YouTube thumbnail
  const [transcribedText, setTranscribedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({
    blog: '',
    linkedin: '',
    newsletter: '',
    twitter: '', // New content type
    linkedinImage: null, // To store base64 image for LinkedIn
    twitterImage: null,  // To store base64 image for Twitter
  });
  const [error, setError] = useState('');
  const [copiedSection, setCopiedSection] = useState(''); // To show which section was copied
  // Added 'generated-content-overview' to possible active tabs
  const [activeTab, setActiveTab] = useState('generate'); // 'generate', 'blog', 'linkedin', 'newsletter', 'twitter', 'recent-uploads', 'content-library', 'analytics', 'settings', 'help', 'profile', 'generated-content-overview'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar overlay
  const [isSidebarHovered, setIsSidebarHovered] = useState(false); // Tracks hover state for desktop sidebar
  const [isSidebarLockedOpen, setIsSidebarLockedOpen] = useState(false); // Tracks if desktop sidebar is explicitly clicked open
  const [isDragging, setIsDragging] = useState(false); // Correctly initialized here

  // Derived state for actual desktop sidebar expansion
  // Sidebar is expanded if it's locked open OR if it's hovered (and not locked open)
  const isSidebarExpanded = isSidebarLockedOpen || (isSidebarHovered && !isSidebarLockedOpen);

  // State for granular content generation options
  const [contentSettings, setContentSettings] = useState({
    all: { targetWordCount: 500, tone: 'Professional', focusKeywords: '' },
    blog: { targetWordCount: 500, tone: 'Professional', focusKeywords: '' },
    linkedin: { targetWordCount: 150, tone: 'Professional', focusKeywords: '' },
    newsletter: { targetWordCount: 300, tone: 'Professional', focusKeywords: '' },
    twitter: { targetWordCount: 200, tone: 'Professional', focusKeywords: '' },
  });
  const [selectedPostType, setSelectedPostType] = useState('all'); // 'all', 'blog', 'linkedin', 'newsletter', 'twitter'

  // New state for recent uploads
  const [recentUploads, setRecentUploads] = useState([]); // Stores { id: string, name: string, type: 'file' | 'youtube', status: 'Transcribing' | 'Processed' | 'Failed' }

  // Function to extract YouTube video ID and set thumbnail
  useEffect(() => {
    const getYoutubeThumbnail = (url) => {
      // Regex to extract video ID from various YouTube URL formats
      const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(regExp);
      if (match && match[1] && match[1].length === 11) {
        // Use a more reliable YouTube thumbnail URL format
        return `http://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
      }
      return '';
    };

    if (youtubeLink) {
      setYoutubeThumbnail(getYoutubeThumbnail(youtubeLink));
    } else {
      setYoutubeThumbnail('');
    }
  }, [youtubeLink]);


  // Function to handle audio file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setError('');
      setYoutubeLink(''); // Clear YouTube link if file is uploaded
      setYoutubeThumbnail(''); // Clear thumbnail
      setTranscribedText(''); // Clear previous transcription
      setGeneratedContent({ blog: '', linkedin: '', newsletter: '', twitter: '', linkedinImage: null, twitterImage: null }); // Clear generated content
    } else {
      setAudioFile(null);
      setError('Please upload a valid audio file.');
    }
  };

  // Function to remove selected audio file
  const handleRemoveAudioFile = () => {
    setAudioFile(null);
    // Optionally clear transcription and generated content if removing source file
    setTranscribedText('');
    setGeneratedContent({ blog: '', linkedin: '', newsletter: '', twitter: '', linkedinImage: null, twitterImage: null });
  };

  // Drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setError('');
      setYoutubeLink('');
      setYoutubeThumbnail('');
      setTranscribedText('');
      setGeneratedContent({ blog: '', linkedin: '', newsletter: '', twitter: '', linkedinImage: null, twitterImage: null });
    } else {
      setAudioFile(null);
      setError('Please drop a valid audio file.');
    }
  };


  // Function to handle YouTube link input
  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
    setAudioFile(null); // Clear audio file if YouTube link is entered
    setTranscribedText(''); // Clear previous transcription
    setGeneratedContent({ blog: '', linkedin: '', newsletter: '', twitter: '', linkedinImage: null, twitterImage: null }); // Clear generated content
    setError('');
  };

  // Function to handle transcription API call
  const handleTranscribe = async () => {
    if (!audioFile && !youtubeLink) {
      setError('Please upload an audio file or provide a YouTube link.');
      return;
    }

    setIsTranscribing(true);
    setError('');
    setTranscribedText(''); // Clear previous transcription
    setGeneratedContent({ blog: '', linkedin: '', newsletter: '', twitter: '', linkedinImage: null, twitterImage: null }); // Clear generated content

    const newUploadId = Date.now().toString(); // Simple unique ID
    let uploadName = '';
    let uploadType = '';
    const formData = new FormData();

    if (audioFile) {
      uploadName = audioFile.name;
      uploadType = 'file';
      formData.append('file', audioFile);
    } else if (youtubeLink) {
      const videoIdMatch = youtubeLink.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      uploadName = videoIdMatch ? `YouTube Video (ID: ${videoIdMatch[1].substring(0, 7)}...)` : `YouTube Link: ${youtubeLink.substring(0, 20)}...`;
      uploadType = 'youtube';
      formData.append('youtube_url', youtubeLink);
    }

    // Add to recent uploads with 'Transcribing' status
    setRecentUploads(prev => [{ id: newUploadId, name: uploadName, type: uploadType, status: 'Transcribing' }, ...prev].slice(0, 5)); // Keep last 5

    try {
      const res = await fetch(`${BACKEND_URL}/api/transcribe`, {
        method: "POST",
        body: formData, // Use FormData for file uploads or mixed data
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setTranscribedText(data.transcript);
        // Update status to 'Processed'
        setRecentUploads(prev => prev.map(upload =>
          upload.id === newUploadId ? { ...upload, status: 'Processed' } : upload
        ));
      } else {
        setError(data.error || 'Failed to transcribe audio/video.');
        // Update status to 'Failed'
        setRecentUploads(prev => prev.map(upload =>
          upload.id === newUploadId ? { ...upload, status: 'Failed' } : upload
        ));
      }

    } catch (err) {
      setError('An error occurred during transcription. Check backend connection.');
      console.error('Transcription error:', err);
      // Update status to 'Failed'
      setRecentUploads(prev => prev.map(upload =>
        upload.id === newUploadId ? { ...upload, status: 'Failed' } : upload
      ));
    } finally {
      setIsTranscribing(false);
    }
  };

  // Function to generate content using Flask backend
  const handleGenerateContent = async () => {
    if (!transcribedText) {
      setError('Please transcribe audio/video first.');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedContent({ blog: '', linkedin: '', newsletter: '', twitter: '', linkedinImage: null, twitterImage: null }); // Clear previous generated content

    // Construct the payload with the new contentSettings structure
    const payload = {
      transcript: transcribedText,
      content_settings: { // Send the entire contentSettings object
        blog: contentSettings.blog,
        linkedin: contentSettings.linkedin,
        newsletter: contentSettings.newsletter,
        twitter: contentSettings.twitter,
      },
      selectedPostType: selectedPostType, // Still send this to backend if it's useful for overall logic
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/generate_content`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // Send the structured payload
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setGeneratedContent(prev => ({
          ...prev,
          blog: data.content.blog || '',
          linkedin: data.content.linkedin || '',
          newsletter: data.content.newsletter || '',
          twitter: data.content.twitter || '',
          linkedinImage: data.images.linkedin ? `data:image/png;base64,${data.images.linkedin}` : null,
          twitterImage: data.images.twitter ? `data:image/png;base64,${data.images.twitter}` : null,
        }));


        // Automatically switch to the generated content tab if 'All' was selected
        // Otherwise, switch to the specific tab that was generated
        if (selectedPostType === 'all') {
          if (data.content.blog) setActiveTab('blog');
          else if (data.content.linkedin) setActiveTab('linkedin');
          else if (data.content.newsletter) setActiveTab('newsletter');
          else if (data.content.twitter) setActiveTab('twitter');
        } else {
          setActiveTab(selectedPostType);
        }
      } else {
        setError(data.error || 'Failed to generate content.');
      }
    } catch (err) {
      setError('An error occurred while generating content. Check backend connection.');
      console.error('Error generating content:', err);
    } finally {
      setIsLoading(false);
    }
  };


  // Function to copy text to clipboard
  const copyToClipboard = (text, sectionName) => {
    document.execCommand('copy', false, text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(''), 2000); // Clear copy status after 2 seconds
  };

  // Function to save edited content back to state
  const handleSaveEditedContent = (content, type) => {
    setGeneratedContent(prev => ({
      ...prev,
      [type]: content
    }));
    // Optionally, show a "Saved!" message
  };

  // Function to handle navigation clicks (now switches tabs)
  const handleNavLinkClick = (tabName) => {
    setActiveTab(tabName);
    setIsSidebarOpen(false); // Close mobile sidebar after click
  };

  const handleLogout = () => {
    // Implement actual logout logic here (e.g., clearing auth tokens, redirecting)
    console.log("User logged out!");
    alert("Logged out successfully!"); // Using alert for demo purposes
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-blue-50 to-indigo-50 font-inter text-gray-800">
      {/* Mobile Menu Button - visible only on small screens */}
      <div className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center z-30 relative"> {/* z-index kept at 30 */}
        <h1 className="text-2xl font-bold text-blue-700">AI Content</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        handleNavLinkClick={handleNavLinkClick}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarExpanded={isSidebarExpanded} // Pass derived state
        setIsSidebarLockedOpen={setIsSidebarLockedOpen} // Pass setter for locked state
        setIsSidebarHovered={setIsSidebarHovered} // Pass setter for hover state
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 pt-4 sm:pt-6 lg:pt-0 transition-all duration-300 ease-in-out
          ${isSidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`} /* Adjusted collapsed width to ml-20 (80px) */
      >
        <main className="p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Title and Description outside the main content box for 'generate' tab */}
          {activeTab === 'generate' && (
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 mb-4 mt-4 animate-fade-in">
                Just🎙️Speak
              </h1>
              <p className="text-lg sm:text-xl font-bold text-gray-600 animate-fade-in delay-100">
                Create engaging content from your audio or YouTube videos effortlessly.
              </p>
            </div>
          )}

          <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-300 hover:shadow-2xl">
            {/* Titles for other tabs remain inside the box */}
            {activeTab !== 'generate' && activeTab !== 'generated-content-overview' && <MainContentHeader activeTab={activeTab} />}

            {/* Input and Transcribed Text Section (visible on 'generate' tab) */}
            {activeTab === 'generate' && (
              <>
                <InputSection
                  audioFile={audioFile}
                  handleFileChange={handleFileChange}
                  handleRemoveAudioFile={handleRemoveAudioFile}
                  youtubeLink={youtubeLink}
                  handleYoutubeLinkChange={handleYoutubeLinkChange}
                  youtubeThumbnail={youtubeThumbnail}
                  isDragging={isDragging} // Pass isDragging
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDrop={handleDrop}
                />

                <GenerationOptions
                  selectedPostType={selectedPostType}
                  setSelectedPostType={setSelectedPostType}
                  contentSettings={contentSettings} // Pass the new contentSettings state
                  setContentSettings={setContentSettings} // Pass the setter
                />

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 animate-fade-in" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <ActionButtons
                  handleTranscribe={handleTranscribe}
                  isTranscribing={isTranscribing}
                  isLoading={isLoading}
                  audioFile={audioFile}
                  youtubeLink={youtubeLink}
                  handleGenerateContent={handleGenerateContent}
                  transcribedText={transcribedText}
                  error={error}
                />

                {transcribedText && (
                  <TranscribedTextDisplay
                    transcribedText={transcribedText}
                    copyToClipboard={copyToClipboard}
                    copiedSection={copiedSection}
                  />
                )}
              </>
            )}

            {/* NEW: Generated Content Overview Section */}
            {activeTab === 'generated-content-overview' && (
              <GeneratedContentOverview
                generatedContent={generatedContent}
                onCopy={copyToClipboard}
                copiedSection={copiedSection}
                onSave={handleSaveEditedContent}
              />
            )}

            {/* Output Tabs Navigation (ONLY for direct display of single generated content) */}
            {/* This section will now only show if activeTab is one of the specific content types,
                not if it's 'generate' or 'generated-content-overview' */}
            {(generatedContent.blog || generatedContent.linkedin || generatedContent.newsletter || generatedContent.twitter) &&
             (activeTab === 'blog' || activeTab === 'linkedin' || activeTab === 'newsletter' || activeTab === 'twitter') && (
              <div className="mt-10 animate-fade-in delay-300">
                <div className="flex border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
                  <button
                    onClick={() => handleNavLinkClick('blog')}
                    className={`py-3 px-6 text-lg font-medium transition-colors duration-200
                      ${activeTab === 'blog' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-800'}
                      ${!generatedContent.blog ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!generatedContent.blog}
                  >
                    Blog Post
                  </button>
                  <button
                    onClick={() => handleNavLinkClick('linkedin')}
                    className={`py-3 px-6 text-lg font-medium transition-colors duration-200
                      ${activeTab === 'linkedin' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-800'}
                      ${!generatedContent.linkedin ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!generatedContent.linkedin}
                  >
                    LinkedIn Post
                  </button>
                  <button
                    onClick={() => handleNavLinkClick('newsletter')}
                    className={`py-3 px-6 text-lg font-medium transition-colors duration-200
                      ${activeTab === 'newsletter' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-800'}
                      ${!generatedContent.newsletter ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!generatedContent.newsletter}
                  >
                    Newsletter
                  </button>
                  <button
                    onClick={() => handleNavLinkClick('twitter')}
                    className={`py-3 px-6 text-lg font-medium transition-colors duration-200
                      ${activeTab === 'twitter' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600 hover:text-gray-800'}
                      ${!generatedContent.twitter ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!generatedContent.twitter}
                  >
                    Twitter/X Post
                  </button>
                </div>

                {/* Render content based on active output tab */}
                {activeTab === 'blog' && generatedContent.blog && (
                  <BlogDisplay content={generatedContent.blog} onCopy={copyToClipboard} copiedSection={copiedSection} onSave={handleSaveEditedContent} />
                )}
                {activeTab === 'linkedin' && generatedContent.linkedin && (
                  <LinkedInDisplay content={generatedContent.linkedin} onCopy={copyToClipboard} copiedSection={copiedSection} onSave={handleSaveEditedContent} linkedinImage={generatedContent.linkedinImage} />
                )}
                {activeTab === 'newsletter' && generatedContent.newsletter && (
                  <NewsletterDisplay content={generatedContent.newsletter} onCopy={copyToClipboard} copiedSection={copiedSection} onSave={handleSaveEditedContent} />
                )}
                {activeTab === 'twitter' && generatedContent.twitter && (
                  <TwitterDisplay content={generatedContent.twitter} onCopy={copyToClipboard} copiedSection={copiedSection} onSave={handleSaveEditedContent} twitterImage={generatedContent.twitterImage} />
                )}

                {/* Message if no content is generated for the selected tab */}
                {activeTab !== 'generate' && !generatedContent[activeTab] && (
                  <p className="text-center text-gray-500 mt-8">No {activeTab.replace('linkedin', 'LinkedIn').replace('blog', 'blog post').replace('newsletter', 'newsletter draft').replace('twitter', 'Twitter/X post')} generated yet.</p>
                )}
              </div>
            )}

            {/* Placeholder content for new sidebar items */}
            {activeTab === 'recent-uploads' && <RecentUploadsDisplay recentUploads={recentUploads} />}
            {activeTab === 'content-library' && <ContentLibraryDisplay />}
            {activeTab === 'analytics' && <AnalyticsDisplay />}
            {activeTab === 'settings' && <SettingsDisplay />}
            {activeTab === 'help' && <HelpSupportDisplay />}
            {activeTab === 'profile' && <ProfilePage onLogout={handleLogout} />}

          </div>
        </main>
      </div>

      {/* Tailwind CSS Custom Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in.delay-300 { animation-delay: 0.3s; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.7s ease-out forwards;
        }
        .animate-slide-up.delay-100 { animation-delay: 0.1s; }
        .animate-slide-up.delay-200 { animation-delay: 0.2s; }
        .animate-slide-up.delay-300 { animation-delay: 0.3s; }


        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.7; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out forwards;
        }
        .animate-bounce-in.delay-200 { animation-delay: 0.2s; }

        /* Custom scrollbar for textareas to make them look cleaner */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Gradient Text Styling */
        .text-gradient-blue-purple {
          background: linear-gradient(to right, #4A90E2, #8A2BE2); /* Blue to Purple */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent; /* Fallback for browsers that don't support background-clip */
        }
      `}</style>
    </div>
  );
};

export default App;
=======
// src/App.jsx   ← or src/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PendingApproval from './pages/PendingApproval';
import Mainpage from './mainpage';

import { getAuth } from 'firebase/auth';
import UserAuth from './pages/userauth';

// Simple protected route
function ProtectedRoute({ children }) {
  const user = getAuth().currentUser;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<UserAuth />} />

      <Route
        path="/homepage"
        element={
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        }
      />

      <Route path="/pending" element={<PendingApproval />} />

      {/* Catch-all → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
>>>>>>> 44625a2 (new)
