import React from 'react';
import { PlusCircle, Search } from 'lucide-react'; // Added icons for potential CTCs

const MainContentHeader = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Create & Automate Content';
      case 'generated-content-overview':
        return 'Generated Content Overview';
      case 'blog':
        return 'Your Blog Posts';
      case 'linkedin':
        return 'Your LinkedIn Posts';
      case 'newsletter':
        return 'Your Newsletters';
      case 'twitter':
        return 'Your Twitter/X Posts';
      case 'recent-uploads':
        return 'Recent Uploads';
      case 'content-library':
        return 'Content Library';
      case 'analytics':
        return 'Analytics & Insights';
      case 'settings':
        return 'App Settings';
      case 'help':
        return 'Help & Support';
      case 'profile':
        return 'Your Profile';
      default:
        return 'Content Dashboard'; // Fallback title
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Upload audio/video or use YouTube links to effortlessly generate multi-platform content.';
      case 'generated-content-overview':
        return 'Review, refine, and share your AI-generated content across various platforms.';
      case 'blog':
        return 'Review and manage your generated blog posts here.';
      case 'linkedin':
        return 'Review and manage your generated LinkedIn posts here.';
      case 'newsletter':
        return 'Review and manage your generated newsletter drafts here.';
      case 'twitter':
        return 'Review and manage your generated Twitter/X posts here.';
      case 'recent-uploads':
        return 'View and manage your recently uploaded files and transcription statuses.';
      case 'content-library':
        return 'Access and organize all your generated content, including posts and newsletters.';
      case 'analytics':
        return 'Track the performance and engagement of your content across various platforms.';
      case 'settings':
        return 'Customize your application preferences and account details.';
      case 'help':
        return 'Find answers to your questions, browse documentation, or contact support.';
      case 'profile':
        return 'Manage your personal information, membership, and account settings.';
      default:
        return '';
    }
  };

  return (
    <div className="mb-8 sm:mb-10 text-center animate-fade-in">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gradient-main mb-3">
        {getTitle()}
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-6 animate-fade-in delay-100">
        {getDescription()}
      </p>

      {/* CTC Components - Example: dynamically show based on activeTab */}
      {activeTab === 'dashboard' && (
        <div className="flex justify-center gap-4 animate-fade-in delay-200">
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <PlusCircle className="mr-2" size={20} /> New Upload
          </button>
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <Search className="mr-2" size={20} /> Explore Content
          </button>
        </div>
      )}

      {activeTab === 'content-library' && (
        <div className="flex justify-center gap-4 animate-fade-in delay-200">
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <PlusCircle className="mr-2" size={20} /> Add New Entry
          </button>
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <Search className="mr-2" size={20} /> Search Library
          </button>
        </div>
      )}
    </div>
  );
};

export default MainContentHeader;