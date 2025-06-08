import React from 'react';
import { Loader2 } from 'lucide-react';

const ActionButton = ({ onClick, disabled, loading, icon: Icon, text, loadingText, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center px-6 py-3 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {loading ? (
      <>
        <Loader2 className="animate-spin mr-2" size={20} /> {loadingText}
      </>
    ) : (
      <>
        <Icon className="mr-2" size={20} /> {text}
      </>
    )}
  </button>
);

export default ActionButton;