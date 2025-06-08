import React from 'react';
import { Settings } from 'lucide-react';

const SettingsDisplay = () => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-inner border border-gray-200 animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
      <Settings className="mr-2 text-gray-600" size={24} /> App Settings
    </h2>
    <p className="text-gray-600">Customize your application preferences, manage integrations, and update your account details here.</p>
    <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
      <li>Account Information</li>
      <li>Integrations (e.g., Social Media APIs)</li>
      <li>Notification Preferences</li>
      <li>Billing & Subscription</li>
    </ul>
  </div>
);

export default SettingsDisplay;