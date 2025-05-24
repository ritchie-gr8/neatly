import React from 'react';

const OptionButton = ({ optionText, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left p-3 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center justify-between mb-2 transition-colors"
    >
      <span className="font-medium text-gray-700">{optionText}</span>
      <span className="text-gray-400">›</span>
    </button>
  );
};

export default OptionButton;
