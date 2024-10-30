'use client';

import React from 'react';
import { Tag } from '@/components/atoms/tag';
import { cn } from '@/lib/cn';

interface FilterGroupProps {
  options: string[];
  onChange?: (selectedOptions: string[]) => void;
  className?: string;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({ options, onChange, className }) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(updatedOptions);
    onChange?.(updatedOptions);
  };

  return (
    <div 
      className={cn(
        'w-[862px] h-[74px] pb-xl',
        'flex flex-row items-center gap-sm',
        'flex-nowrap overflow-x-auto',
        className
      )}
    >
      {options.map((option) => (
        <Tag
          key={option}
          type="checkbox"
          checked={selectedOptions.includes(option)}
          onChange={() => handleOptionChange(option)}
          className={cn(
            'min-w-[148px] h-[42px] px-lg py-sm',
            'rounded-lg bg-[var(--light---neutral-gray---opaque,#C2CBD040)]',
            'hover:bg-opacity-75 active:bg-opacity-90 peer-checked:bg-light-primary',
            'transition-all duration-200 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-light-primary focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'flex items-center justify-center',
            'whitespace-nowrap'
          )}
        >
          <p className={cn(
            'text-p text-light-text text-center',
            'whitespace-nowrap'
          )}>
            {option}
          </p>
        </Tag>
      ))}
    </div>
  );
};

// used to test
// export default function FilterGroupExample() {
//   const filterOptions = ['Data Science', 'Self Improvement', 'Writing', 'Deep Learning', 'NLP', 'Ethics'];

//   const handleFilterChange = (selectedOptions: string[]) => {
//     console.log('Selected options:', selectedOptions);
//   };

  return (
    <FilterGroup
      options={filterOptions}
      onChange={handleFilterChange}
    />
  );
}