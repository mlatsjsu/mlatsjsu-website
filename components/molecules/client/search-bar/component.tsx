'use client';
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { cn } from '@/lib/cn';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<Props> = ({
  className,
  onSearch,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isSearched, setSearched] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearched(true);
      if (onSearch) {
        onSearch(inputValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSearched(false);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="relative flex items-center justify-end">
        <input
          type="text"
          className={cn(
            'text-light h-[42px] w-full rounded-sm bg-light-neutral-gray/25 px-md py-sm pr-[40px] placeholder-light-neutral-gray',
            className,
          )}
          placeholder="Search..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <MagnifyingGlassIcon className="absolute mr-md h-[20px] w-[20px]"></MagnifyingGlassIcon>
      </div>
      {isSearched && inputValue && (
        <p className="sm:text-h5-mobile w-full overflow-hidden pt-lg text-h5-desktop [overflow-wrap:anywhere]">
          Search results for &quot;{inputValue}&quot;
        </p>
      )}
    </div>
  );
};
