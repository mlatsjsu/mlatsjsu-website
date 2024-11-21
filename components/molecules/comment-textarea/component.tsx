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
  const [txt, setTxt] = React.useState('');

  function sendHandler() {
    sent ? setSent(false) : setSent(true); //handles button to send data
    console.log(txt);
    setTxt('');
  }

  function writeHandler(_event: any) {
    setTxt(_event.target.value);
    console.log(_event.target.value);
    //ideally writes to post endpoint that creates a comment
  }

  return (
    //redo cta according to figma design
    <div className="text-light h-141px  w-862px m-sm flex flex-col rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] p-md ">
      <div className="m-sm flex gap-8">
        <img src="nothing.com" alt="insert smaller user component" />
        <div> name here </div>
      </div>
      <textarea
        className="m-sm resize-none border-none bg-[rgb(var(--color-light-neutral-gray)/0)] text-light-neutral-gray outline-none"
        value={txt}
        onChange={writeHandler}
        placeholder="Add your thoughts..."
      ></textarea>
      <div className="m-sm flex justify-end pb-sm pt-sm">
        <Btn
          variant={'primary'}
          className="text-light-primary"
          onClick={sendHandler}
        >
          {' '}
          Send{' '}
        </Btn>
      </div>
    </div>

    /*
    //wrong text area
    <div className="text-light h-141px w-862px m-sm flex flex-col rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)]">
      <div className="m-sm"> Slot in Small User component here</div>
      <input
        className="m-sm border-none bg-[rgb(var(--color-light-neutral-gray)/0)] text-light-neutral-gray outline-none"
        type="text"
        value={txt}
        onChange={writeHandler}
      ></input>
      <div className="m-sm flex justify-end">
        <Btn variant={'primary'} className="text-light-primary">
          {' '}
          Send{' '}
        </Btn>
      </div>
    </div>
    */
  );
};
