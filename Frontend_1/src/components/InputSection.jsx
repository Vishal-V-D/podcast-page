// InputSection.jsx
import React, { useState } from 'react';
import { Upload, Youtube, FileText, XCircle } from 'lucide-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// No need to import react-tabs.css, we're doing custom styling

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

  return (
    <div className="mb-8 p-0 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 relative overflow-hidden">
      {/* Dragging Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center rounded-xl z-10 animate-fade-in">
          <p className="text-white text-2xl font-bold">Drop your audio file here</p>
        </div>
      )}

      <div className="relative z-0">
        {/* Adjusted title size and position to match image_b91b4d.png */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 pt-6 px-6 animate-fade-in delay-100">
          Upload or Link Your Media
        </h2>

        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          {/* Tab Header for 'Upload File' and 'Paste YouTube URL' */}
          <TabList className="flex border-b border-gray-500 px-6 mt-6"> {/* Added mt-6 for spacing from title */}
            {/* Audio File Tab */}
            <Tab
              className={`
                py-3 px-0 mr-8 cursor-pointer outline-none transition-all duration-300 ease-in-out
                font-medium text-lg relative group
                ${tabIndex === 0
                  ? 'text-blue-700' // Active tab text color
                  : 'text-gray-500 hover:text-gray-700' // Inactive tab text color and hover
                }
              `}
              aria-selected={tabIndex === 0}
            >
              Upload File
              {/* Underline for active tab */}
              <span className={`absolute bottom-0 left-0 w-full h-[3px] rounded-t-sm transition-all duration-300 ease-in-out
                ${tabIndex === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-transparent group-hover:bg-gray-300'}
              `}></span>
            </Tab>

            {/* YouTube Link Tab */}
            <Tab
              className={`
                py-3 px-0 cursor-pointer outline-none transition-all duration-300 ease-in-out
                font-medium text-lg relative group
                ${tabIndex === 1
                  ? 'text-blue-700' // Active tab text color
                  : 'text-gray-500 hover:text-gray-700' // Inactive tab text color and hover
                }
              `}
              aria-selected={tabIndex === 1}
            >
              Paste YouTube URL
              {/* Underline for active tab */}
              <span className={`absolute bottom-0 left-0 w-full h-[3px] rounded-t-sm transition-all duration-300 ease-in-out
                ${tabIndex === 1 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-transparent group-hover:bg-gray-300'}
              `}></span>
            </Tab>
          </TabList>

          {/* Content Panels (like "page information") */}
          {/* Adjusted padding and added text-center for inner content */}
          <div className="bg-white p-8 rounded-b-xl min-h-[250px] flex flex-col items-center justify-center text-center">
            <TabPanel className="w-full flex flex-col items-center">
              {/* File Upload Section */}
              <div className="flex flex-col items-center w-full max-w-lg mb-8"> {/* Added mb-8 for spacing */}
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="audio-upload"
                />
                <label
                  htmlFor="audio-upload"
                  className={`cursor-pointer font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 flex items-center gap-2
                    bg-gray-200 text-xl-gray-800  hover:bg-gray-300 shadow-sm
                    ${audioFile ? 'mb-2' : 'mb-4'}
                  `}
                >
                  <FileText size={20} /> Choose Audio File
                </label>

                <span className="text-gray-500 text-sm">or drag and drop here (mp3, wav, m4a)</span>

                {audioFile && (
                  <div className="mt-4 flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full animate-bounce-in delay-200">
                    <span className="truncate max-w-xs">{audioFile.name}</span>
                    <button
                      onClick={handleRemoveAudioFile}
                      className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none"
                      aria-label="Remove audio file"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                )}
              </div>
            </TabPanel>

            <TabPanel className="w-full flex flex-col items-center">
              {/* YouTube Link Section */}
              <div className="w-full max-w-lg animate-fade-in delay-200 mb-8"> {/* Added mb-8 for spacing */}
                <input
                  type="text"
                  id="youtube-link"
                  className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 shadow-sm"
                  placeholder="Enter YouTube video URL"
                  value={youtubeLink}
                  onChange={handleYoutubeLinkChange}
                  disabled={audioFile !== null} // Disable if audio file is selected
                />
              </div>

              {/* YouTube Thumbnail/Video Preview */}
              {(youtubeThumbnail || youtubeVideoId) && (
                <div className="mt-4 flex flex-col items-center w-full">
                  <p className="text-md font-semibold text-gray-700 mb-2">YouTube Video Preview:</p>
                  <div className="relative w-full max-w-lg aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
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
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default InputSection;