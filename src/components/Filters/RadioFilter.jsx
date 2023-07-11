import React, { useState, useEffect } from 'react';
import './RadioFilter.css';

const RadioFilter = ({ options, onChange, resetFilters }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
    onChange(optionValue);
  };

  useEffect(() => {
    if (resetFilters) {
      setSelectedOption('');
    }
  }, [resetFilters]);

  return (
    <div className="radioFilter">
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioFilter;

