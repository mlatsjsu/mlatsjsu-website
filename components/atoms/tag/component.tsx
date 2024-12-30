'use client';

import { cn } from '@/lib/cn';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export const Tag: React.FC<Props> = ({ children, className, ...props }) => {
  const [id, setId] = React.useState('');
  React.useEffect(() => setId(Math.random().toString(36).substring(7)), []);
  return (
    <span>
      <input {...props} className="peer sr-only" id={id} />
      <label
        className={cn(
          'flex cursor-pointer items-center gap-xs rounded-lg bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm transition-all duration-100 ease-in-out peer-checked:!bg-light-secondary peer-checked:!text-light-background peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-light-secondary peer-focus:ring-offset-2 peer-enabled:hover:opacity-50 peer-enabled:active:opacity-25 peer-disabled:text-light-neutral-gray',
          className,
        )}
        htmlFor={id}
      >
        {children}
      </label>
    </span>
  );
};
