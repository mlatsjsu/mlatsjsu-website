import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative w-[460px] h-[42px]">
        <input
          ref={ref}
          className={cn(
            'w-full h-full rounded-sm px-3 py-2 pr-10 transition-colors bg-light-neutral-gray-opaque bg-opacity-25 placeholder:text-light-neutral-gray focus:placeholder:text-light-text text-light-text focus:outline-none',
            className
          )}
          {...props}
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-black"
          >
            <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z" />
          </svg>
        </div>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
