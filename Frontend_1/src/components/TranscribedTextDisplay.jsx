import React from 'react';
import { FileText, ClipboardCopy, CheckCircle } from 'lucide-react';

const TranscribedTextDisplay = ({ transcribedText, copyToClipboard, copiedSection }) => {
  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
        <FileText className="mr-2 text-gray-600" size={24} /> Transcribed Text
      </h2>
      <div className="relative">
        <textarea
          value={transcribedText}
          readOnly
          rows="10"
          className="w-full p-4 border border-gray-300 rounded-lg bg-white text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
        ></textarea>
        <button
          onClick={() => copyToClipboard(transcribedText, 'transcription')}
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition duration-200"
          title="Copy transcription"
        >
          {copiedSection === 'transcription' ? <CheckCircle className="text-green-500" size={18} /> : <ClipboardCopy size={18} />}
        </button>
      </div>
    </div>
  );
};

export default TranscribedTextDisplay;