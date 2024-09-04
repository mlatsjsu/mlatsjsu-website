'use client';

import { VerticalLine } from '@/components/atoms';
import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Something went wrong ;(
          </h3>
          <p className="w-full text-light-neutral-dark max-lg:pb-md max-lg:text-h5-mobile lg:pb-xl lg:text-h5-desktop">
            There&apos;s been an error on our end. Please try again later.
          </p>
          <button
            onClick={() => reset()}
            className="whitespace-nowrap rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-lg py-sm text-button text-light-primary transition-all duration-100 ease-in-out hover:opacity-75"
          >
            Try again
          </button>
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>
    </main>
  );
}
