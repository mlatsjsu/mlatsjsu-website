'use client';
import { cn } from '@/lib/cn';
import { Btn } from '@/components/atoms/btn';
import { useState, useEffect, useRef } from 'react';

interface Props extends React.HTMLProps<HTMLDivElement> {
  btn: React.ReactElement;
  children?: React.ReactNode;
}

export const Popover: React.FC<Props> = ({
  btn,
  children,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={cn('flex flex-col items-center gap-sm')}>
      <section ref={buttonRef} onClick={toggleVisibility}>
        {btn}
      </section>

      {isVisible && (
        <div
          {...props}
          className={cn(
            'flex items-center rounded-md !border-line-width border-dashed border-light-neutral-gray bg-light-background p-lg text-light-primary',
            className,
          )}
          ref={contentRef}
        >
          {children}
        </div>
      )}
    </div>
  );
};
