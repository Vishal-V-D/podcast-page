import React from 'react';
import { LifeBuoy } from 'lucide-react';

const HelpSupportDisplay = () => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-inner border border-gray-200 animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
      <LifeBuoy className="mr-2 text-gray-600" size={24} /> Help & Support
    </h2>
    <p className="text-gray-600">Need assistance? Visit our comprehensive help center, browse FAQs, or contact our support team for personalized help.</p>
    <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
      <li><a href="#" className="text-blue-600 hover:underline">FAQs</a></li>
      <li><a href="#" className="text-blue-600 hover:underline">Contact Support</a></li>
      <li><a href="#" className="text-blue-600 hover:underline">Video Tutorials</a></li>
    </ul>
  </div>
);

export default HelpSupportDisplay;