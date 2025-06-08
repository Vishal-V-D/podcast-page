import React from 'react';
import { Sparkles, Filter } from 'lucide-react';

<<<<<<< HEAD
const GenerationOptions = ({ selectedPostType, setSelectedPostType, targetWordCount, setTargetWordCount, tone, setTone, focusKeywords, setFocusKeywords }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-inner border border-gray-200 mb-8 animate-fade-in delay-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
        <Sparkles className="mr-2 text-gray-600" size={24} /> Generation Options
      </h2>
      {/* Post Type Filter */}
      <div className="mb-6">
        <label htmlFor="post-type-filter" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Filter className="mr-2" size={18} /> Select Post Type(s) to Generate
=======
const GenerationOptions = ({
  selectedPostType,
  setSelectedPostType,
  targetWordCount,
  setTargetWordCount,
  tone,
  setTone,
  focusKeywords,
  setFocusKeywords,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 mb-8 animate-fade-in delay-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <Sparkles className="mr-2 text-blue-500" size={24} /> Generation Options
      </h2>

      {/* Post Type Filter */}
      <div className="mb-6">
        <label htmlFor="post-type-filter" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Filter className="mr-2 text-blue-500" size={18} /> Select Post Type(s) to Generate
>>>>>>> 44625a2 (new)
        </label>
        <div className="flex flex-wrap gap-2">
          {['All', 'blog', 'linkedin', 'newsletter', 'twitter'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedPostType(type)}
<<<<<<< HEAD
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform
                ${selectedPostType === type
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
=======
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                ${selectedPostType === type
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
>>>>>>> 44625a2 (new)
                }`}
            >
              {type === 'All' ? 'All Post Types' : type.charAt(0).toUpperCase() + type.slice(1).replace('linkedin', 'LinkedIn').replace('twitter', 'Twitter/X')}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Options */}
      {(selectedPostType === 'All' || selectedPostType === 'blog') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          <div>
            <label htmlFor="word-count" className="block text-sm font-medium text-gray-700 mb-1">Target Word Count (for Blog)</label>
            <input
              type="number"
              id="word-count"
              value={targetWordCount}
<<<<<<< HEAD
              onChange={(e) => setTargetWordCount(Math.max(50, parseInt(e.target.value) || 0))} // Min 50 words
              min="50"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
=======
              onChange={(e) => setTargetWordCount(Math.max(50, parseInt(e.target.value) || 0))}
              min="50"
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
>>>>>>> 44625a2 (new)
            />
          </div>
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
<<<<<<< HEAD
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
=======
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
>>>>>>> 44625a2 (new)
            >
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Enthusiastic">Enthusiastic</option>
              <option value="Formal">Formal</option>
              <option value="Humorous">Humorous</option>
              <option value="Informative">Informative</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="focus-keywords" className="block text-sm font-medium text-gray-700 mb-1">Focus Keywords/Areas (comma-separated)</label>
            <textarea
              id="focus-keywords"
              value={focusKeywords}
              onChange={(e) => setFocusKeywords(e.target.value)}
              rows="3"
              placeholder="e.g., AI in marketing, content automation, solopreneur tools"
<<<<<<< HEAD
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-y"
=======
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 resize-y"
>>>>>>> 44625a2 (new)
            ></textarea>
          </div>
        </div>
      )}
<<<<<<< HEAD
      {(selectedPostType !== 'All' && selectedPostType !== 'blog') && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              >
                <option value="Professional">Professional</option>
                <option value="Casual">Casual</option>
                <option value="Enthusiastic">Enthusiastic</option>
                <option value="Formal">Formal</option>
                <option value="Humorous">Humorous</option>
                <option value="Informative">Informative</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="focus-keywords" className="block text-sm font-medium text-gray-700 mb-1">Focus Keywords/Areas (comma-separated)</label>
              <textarea
                id="focus-keywords"
                value={focusKeywords}
                onChange={(e) => setFocusKeywords(e.target.value)}
                rows="3"
                placeholder="e.g., AI in marketing, content automation, solopreneur tools"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-y"
              ></textarea>
            </div>
         </div>
=======

      {(selectedPostType !== 'All' && selectedPostType !== 'blog') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
            >
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Enthusiastic">Enthusiastic</option>
              <option value="Formal">Formal</option>
              <option value="Humorous">Humorous</option>
              <option value="Informative">Informative</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="focus-keywords" className="block text-sm font-medium text-gray-700 mb-1">Focus Keywords/Areas (comma-separated)</label>
            <textarea
              id="focus-keywords"
              value={focusKeywords}
              onChange={(e) => setFocusKeywords(e.target.value)}
              rows="3"
              placeholder="e.g., AI in marketing, content automation, solopreneur tools"
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 resize-y"
            ></textarea>
          </div>
        </div>
>>>>>>> 44625a2 (new)
      )}
    </div>
  );
};

<<<<<<< HEAD
export default GenerationOptions;
=======
export default GenerationOptions;
>>>>>>> 44625a2 (new)
