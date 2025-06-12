import { ChevronRight } from 'lucide-react';
import React from 'react';

const OptionButton = ({ optionText, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer w-full text-left p-3 bg-green-200 rounded-md hover:bg-green-300 flex items-center justify-between mb-2 transition-colors"
    >
      <span className="font-medium text-gray-700">{optionText}</span>
      <ChevronRight className="ml-2 size-5 text-green-700" />
    </button>
  );
};

export default OptionButton;
