import React from 'react';
import { Book } from 'lucide-react';

const ContentLibraryDisplay = () => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-inner border border-gray-200 animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
      <Book className="mr-2 text-gray-600" size={24} /> Content Library
    </h2>
    <p className="text-gray-600">This section will allow you to view, edit, and manage all your generated blog posts, LinkedIn posts, and newsletters in one centralized location.</p>
    <ul className="mt-4 space-y-2 text-gray-700">
      <li><span className="font-semibold">Blog:</span> "The Future of Content: AI's Transformative Power"</li>
      <li><span className="font-semibold">LinkedIn:</span> "🚀 The AI Revolution is here!"</li>
      <li><span className="font-semibold">Newsletter:</span> "Your Weekly Content Insights!"</li>
      <li><span className="font-semibold">Twitter:</span> "AI is changing content creation!"</li>
    </ul>
  </div>
);

export default ContentLibraryDisplay;