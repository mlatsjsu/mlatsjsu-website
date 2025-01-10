'use client';
import { Btn } from '@/components/atoms/btn';
import React from 'react';
import { UserSmallComponent } from '../client';

interface CTAProps {
  //add props if needed
  avatarUrl: string;
  name: string;
}

export const CommentTextArea: React.FC<CTAProps> = ({ avatarUrl, name }) => {
  const [sent, setSent] = React.useState<boolean>(false);
  const [txt, setTxt] = React.useState('');

  //handles button to send data
  function sendHandler() {
    sent ? setSent(false) : setSent(true);
    console.log(txt);
    setTxt('');
    //TODO: ideally writes to post endpoint that creates a comment
  }

  //handles update of txt state
  function writeHandler(_event: any) {
    setTxt(_event.target.value);
    console.log(_event.target.value);
  }

  return (
    <div className="text-light w-fill flex flex-col rounded-md bg-[rgb(var(--color-light-neutral-gray)/0.25)] p-md ">
      <UserSmallComponent avatarUrl={avatarUrl} name={name} />
      <textarea
        className="resize-none border-none bg-[rgb(var(--color-light-neutral-gray)/0)] py-sm outline-none"
        value={txt}
        onChange={writeHandler}
        placeholder="Add your thoughts..."
      ></textarea>
      <div className="m-sm flex justify-end">
        <Btn
          variant={'primary'}
          className="px-lg py-sm text-light-primary"
          onClick={sendHandler}
        >
          {' '}
          Send{' '}
        </Btn>
      </div>
    </div>
  );
};

export default CommentTextArea;
