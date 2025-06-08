import React from 'react';
import { FileText, Youtube, Clock, CheckCircle2, XCircle } from 'lucide-react';

const RecentUploadsDisplay = ({ recentUploads }) => (
  <div className="bg-gray-100 p-6 rounded-xl shadow-inner border border-gray-200 animate-fade-in">
    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
      <FileText className="mr-2 text-gray-600" size={24} /> Recent Uploads
    </h2>
    {recentUploads.length === 0 ? (
      <p className="text-gray-600">No recent uploads yet. Upload an audio/video file or paste a YouTube link to see them here!</p>
    ) : (
      <ul className="mt-4 space-y-3 text-gray-700">
        {recentUploads.map((item) => (
          <li key={item.id} className="flex items-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
            {item.type === 'file' ? (
              <FileText size={20} className="mr-3 text-gray-500 flex-shrink-0" />
            ) : (
              <Youtube size={20} className="mr-3 text-red-500 flex-shrink-0" />
            )}
            <span className="font-medium text-gray-800 flex-grow truncate">{item.name}</span>
            {item.status === 'Transcribing' && (
              <span className="ml-2 flex items-center text-yellow-600 text-sm">
                <Clock size={16} className="mr-1 animate-pulse" /> Transcribing...
              </span>
            )}
            {item.status === 'Processed' && (
              <span className="ml-2 flex items-center text-green-600 text-sm">
                <CheckCircle2 size={16} className="mr-1" /> Processed
              </span>
            )}
            {item.status === 'Failed' && (
              <span className="ml-2 flex items-center text-red-600 text-sm">
                <XCircle size={16} className="mr-1" /> Failed
              </span>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default RecentUploadsDisplay;