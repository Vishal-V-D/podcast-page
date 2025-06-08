import React from 'react';
import { BarChart2 } from 'lucide-react';

const AnalyticsDisplay = () => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-inner border border-gray-200 animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
      <BarChart2 className="mr-2 text-gray-600" size={24} /> Analytics & Insights
    </h2>
    <p className="text-gray-600">Track the performance and engagement of your content across various platforms. Get insights into what resonates with your audience.</p>
    <ul className="mt-4 space-y-2 text-gray-700">
      <li><span className="font-semibold">Content Views:</span> 12,345</li>
      <li><span className="font-semibold">Engagement Rate:</span> 8.2%</li>
      <li><span className="font-semibold">Top Performing Post:</span> "The Future of Content: AI's Transformative Power"</li>
    </ul>
  </div>
);

export default AnalyticsDisplay;