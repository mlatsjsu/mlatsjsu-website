import React from 'react';
import { Tab } from '@/components/atoms/tab';
import { cn } from '@/lib/cn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface TabGroupProps {
  options: string[];
  onChange?: (selectedOptions: string) => void;
  className?: string;
  paramKey?: string; //  prop for the dynamic URL parameter key
}

export const TabGroup: React.FC<TabGroupProps> = ({
  options,
  onChange,
  className,
  paramKey = 'tabs', // Default parameter key? Not sure what this does
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string>(
    options[0], //I set it to check the first tab, this should probably be removed later
  );
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.getAll(paramKey).map((tab) => {
      if (tab == selectedOptions) {
        setSelectedOptions(tab);
      }
    });
    /*
    const tagsFromUrl = params.getAll(paramKey); // Use paramKey for the query parameter
    setSelectedOptions(tagsFromUrl);
    */
  }, [searchParams, paramKey]);

  const handleOptionChange = (option: string) => {
    let updatedOptions: string;

    updatedOptions = option;

    setSelectedOptions(updatedOptions);
    onChange?.(updatedOptions);

    // Update URL parameters
    const params = new URLSearchParams(searchParams);
    params.delete(paramKey); // paramKey for the query parameter
    params.append(paramKey, updatedOptions);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        'h-[74px] w-[862px] pb-xl',
        'flex flex-row items-center gap-sm',
        'flex-nowrap overflow-x-auto overflow-y-hidden',
        className,
      )}
    >
      {options.map((option) => (
        <Tab
          key={option} // necessary for iteration
          checked={selectedOptions.includes(option)}
          onChange={() => handleOptionChange(option)}
        >
          <p
            className={cn(
              'whitespace-nowrap text-center text-p text-light-text',
            )}
          >
            {option}
          </p>
        </Tab>
      ))}
    </div>
  );
};
