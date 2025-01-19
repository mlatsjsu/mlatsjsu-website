'use client';

import React from 'react';
import { Tag } from '@/components/atoms/tag';
import { cn } from '@/lib/cn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterGroupProps {
  options: string[];
  onChange?: (selectedOptions: string[]) => void;
  className?: string;
  type?: 'checkbox' | 'radio'; 
  paramKey?: string; //  prop for the dynamic URL parameter key
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  options,
  onChange,
  className,
  type = 'checkbox', // Default to checkbox?
  paramKey = 'tags', // Default parameter key?
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const tagsFromUrl = params.getAll(paramKey); // Use paramKey for the query parameter
    setSelectedOptions(tagsFromUrl);
  }, [searchParams, paramKey]);

  const handleOptionChange = (option: string) => {
    let updatedOptions: string[];

    if (type === 'checkbox') {
      updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
    } else {
      updatedOptions = [option]; // Radio buttons allow only one selection
    }

    setSelectedOptions(updatedOptions);
    onChange?.(updatedOptions);

    // Update URL parameters
    const params = new URLSearchParams(searchParams);
    params.delete(paramKey); // paramKey for the query parameter
    updatedOptions.forEach((tag) => params.append(paramKey, tag));
    router.replace(`${pathname}?${params.toString()}`);
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
          type={type} 
          checked={selectedOptions.includes(option)}
          onChange={() => handleOptionChange(option)}
        >
          <p className={cn('text-p text-light-text text-center whitespace-nowrap')}>
            {option}
          </p>
        </Tag>
      ))}
    </div>
  );
};
