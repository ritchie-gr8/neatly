import React from 'react';
import OptionButton from './option-button';

const OptionsMessage = ({ data, onOptionSelect }) => {
  const { title, options } = data;

  return (
    <div className="w-full">
      <p className="mb-3 text-gray-700">{title}</p>
      <div className="flex flex-col w-full">
        {options.map((option, index) => (
          <OptionButton
            key={index}
            optionText={option.optionText}
            onClick={() => onOptionSelect(option.optionText, option.detailsText)}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionsMessage;
