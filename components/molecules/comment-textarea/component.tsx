'use client';
import { cn } from '@/lib/cn'; //import tailwind utility
import { Btn } from '@/components/atoms/btn'; //imports atom btn
import React from 'react';
//import UserSmallComponent from './user-small.tsx'

interface CTAProps {
  //add props if needed
}

export const CommentTextArea: React.FC<CTAProps> = ({}) => {
  const [sent, setSent] = React.useState<boolean>(false);

  function sendHandler() {
    sent ? setSent(false) : setSent(true); //handles button to send data
  }

  return (
    <div className="text-light h-141px w-862px flex flex-col rounded-sm bg-light-neutral-gray">
      <div> Slot in Small User component here</div>
      Hi
      <div className="flex justify-end">
        <Btn variant={'primary'} className="text-light-primary">
          {' '}
          Send{' '}
        </Btn>
      </div>
    </div>
  );
};
