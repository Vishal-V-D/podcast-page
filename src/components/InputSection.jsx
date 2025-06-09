// InputSection.jsx
import React, { useState } from 'react';
import { Upload, Youtube, FileText, XCircle, Link } from 'lucide-react'; // Added Link icon for YouTube tab

const InputSection = ({
  audioFile,
  handleFileChange,
  handleRemoveAudioFile,
  youtubeLink,
  handleYoutubeLinkChange,
  youtubeThumbnail,
  youtubeVideoId,
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  // State to track if the YouTube input is focused
  const [isYoutubeInputFocused, setIsYoutubeInputFocused] = useState(false);

  return (
    <div
      className="mb-8 p-0 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 relative overflow-hidden shadow-lg transition-all duration-300 ease-in-out"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Custom CSS for glowing border effect */}
      <style>
        {`
        @keyframes glowing-border {
          0% {
            box-shadow: 0 0 0px 0px rgba(59, 130, 246, 0.4), 0 0 0px 0px rgba(168, 85, 247, 0.4);
            border-color: #d1d5db; /* Initial border color */
          }
          33% {
            box-shadow: 0 0 10px 3px rgba(59, 130, 246, 0.6), 0 0 15px 5px rgba(168, 85, 247, 0.3);
            border-color: #3b82f6; /* Blue during animation */
          }
          66% {
            box-shadow: 0 0 15px 5px rgba(59, 130, 246, 0.3), 0 0 10px 3px rgba(168, 85, 247, 0.6);
            border-color: #a855f7; /* Purple during animation */
          }
          100% {
            box-shadow: 0 0 0px 0px rgba(59, 130, 246, 0.4), 0 0 0px 0px rgba(168, 85, 247, 0.4);
            border-color: #d1d5db; /* Return to initial border color */
          }
        }
        `}
      </style>

      {/* Dragging Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 bg-opacity-70 flex items-center justify-center rounded-xl z-10 animate-fade-in">
          <p className="text-white text-2xl font-bold drop-shadow-lg">Drop your file here</p>
        </div>
      )}

      <div className="relative z-0">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 pt-6 px-6 animate-fade-in delay-100">
          Upload or Link Your Media
        </h2>

        {/* Custom Tabs implementation */}
        <div>
          {/* Tab Header for 'Upload File' and 'Paste YouTube URL' */}
          <div className="flex border-b border-gray-200 px-6 mt-6">
            {/* File Upload Tab */}
            <button
              onClick={() => setTabIndex(0)}
              className={`
                py-3 px-0 mr-8 cursor-pointer outline-none transition-all duration-300 ease-in-out
                font-semibold text-lg relative group flex items-center gap-2
                ${tabIndex === 0
                  ? 'text-blue-700' // Active tab text color
                  : 'text-gray-600 hover:text-gray-800' // Inactive tab text color and hover
                }
              `}
              aria-selected={tabIndex === 0}
            >
              <Upload size={20} /> Upload File
              {/* Underline for active tab with gradient */}
              <span className={`absolute bottom-0 left-0 w-full h-[4px] rounded-t-sm transition-all duration-300 ease-in-out
                ${tabIndex === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-md' : 'bg-transparent group-hover:bg-gray-300'}
              `}></span>
            </button>

            {/* YouTube Link Tab */}
            <button
              onClick={() => setTabIndex(1)}
              className={`
                py-3 px-0 cursor-pointer outline-none transition-all duration-300 ease-in-out
                font-semibold text-lg relative group flex items-center gap-2
                ${tabIndex === 1
                  ? 'text-blue-700' // Active tab text color
                  : 'text-gray-600 hover:text-gray-800' // Inactive tab text color and hover
                }
              `}
              aria-selected={tabIndex === 1}
            >
              <Link size={20} /> Paste YouTube URL
              {/* Underline for active tab with gradient */}
              <span className={`absolute bottom-0 left-0 w-full h-[4px] rounded-t-sm transition-all duration-300 ease-in-out
                ${tabIndex === 1 ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-md' : 'bg-transparent group-hover:bg-gray-300'}
              `}></span>
            </button>
          </div>

          {/* Content Panels */}
          <div className="bg-white p-8 rounded-b-xl min-h-[250px] flex flex-col items-center justify-center text-center">
            {/* File Upload Tab Panel */}
            {tabIndex === 0 && (
              <div className="w-full flex flex-col items-center animate-fade-in">
                {/* File Upload Section */}
                <div className="flex flex-col items-center w-full max-w-lg mb-8">
                  <input
                    type="file"
                    accept="*/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`cursor-pointer font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 flex items-center gap-2
                      bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg
                      ${audioFile ? 'mb-2' : 'mb-4'}
                    `}
                  >
                    <FileText size={20} /> Choose File
                  </label>

                  <span className="text-gray-500 text-sm">or drag and drop here (any file type)</span>

                  {audioFile && (
                    <div className="mt-4 flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full animate-bounce-in delay-200 shadow-sm">
                      <span className="truncate max-w-xs">{audioFile.name}</span>
                      <button
                        onClick={handleRemoveAudioFile}
                        className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none transition-transform transform hover:scale-110"
                        aria-label="Remove file"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* YouTube Link Tab Panel */}
            {tabIndex === 1 && (
              <div className="w-full flex flex-col items-center animate-fade-in delay-100">
                {/* YouTube Link Section */}
                <div className="w-full max-w-lg mb-8">
                  <input
                    type="text"
                    id="youtube-link"
                    className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none transition duration-200 shadow-sm"
                    placeholder="Enter YouTube video URL"
                    value={youtubeLink}
                    onChange={handleYoutubeLinkChange}
                    disabled={audioFile !== null}
                    onFocus={() => setIsYoutubeInputFocused(true)} // Set focus state to true
                    onBlur={() => setIsYoutubeInputFocused(false)}   // Set focus state to false
                    // Apply animation conditionally based on youtubeLink content OR focus
                    style={{
                      animation: (youtubeLink || isYoutubeInputFocused) ? 'glowing-border 3s infinite ease-in-out' : 'none',
                      // Ensure border exists when not animated, or is transparent when animated
                      border: (youtubeLink || isYoutubeInputFocused) ? '2px solid transparent' : '2px solid #d1d5db'
                    }}
                  />
                </div>

                {/* YouTube Thumbnail/Video Preview */}
                {(youtubeThumbnail || youtubeVideoId) && (
                  <div className="mt-4 flex flex-col items-center w-full">
                    <p className="text-md font-semibold text-gray-700 mb-2">YouTube Video Preview:</p>
                    <div className="relative w-full max-w-lg aspect-video bg-black rounded-lg overflow-hidden shadow-lg animate-fade-in delay-200">
                      {youtubeVideoId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&controls=1&showinfo=0&rel=0`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full"
                          title="YouTube video player"
                        ></iframe>
                      ) : (
                        <img
                          src={youtubeThumbnail}
                          alt="YouTube Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
