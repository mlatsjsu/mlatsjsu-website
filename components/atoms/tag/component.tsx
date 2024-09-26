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
          'bg-border animation peer-checked:!text-background flex cursor-pointer items-center gap-xs rounded-lg px-md py-sm peer-checked:!bg-light-primary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-light-primary peer-focus:ring-offset-2 peer-enabled:hover:opacity-50 peer-enabled:active:opacity-25 peer-disabled:text-light-neutral-gray',
          className,
        )}
        htmlFor={id}
      >
        {children}
      </label>
    </span>
  );
};
