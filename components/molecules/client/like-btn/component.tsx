'use client';
import { cn } from '@/lib/cn'; //import tailwind utility
import { Btn } from '@/components/atoms/btn'; //imports atom btn
import { HandThumbUpIcon } from '@heroicons/react/24/solid'; //import button svg
import React from 'react';

interface Props
  extends Omit<React.ComponentProps<typeof Btn>, 'variant' | 'children'> {}

//interface Props extends React.ComponentProps<typeof Btn> {}

export const LikeBtn: React.FC<Props> = ({ className, ...props }) => {
  //kept component/function def same from Authbtn

  const [liked, setLiked] = React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState<number>(0);

  function likeHandler() {
    liked ? setLiked(false) : setLiked(true);
    liked
      ? setLikeCount((likeCount) => likeCount - 1)
      : setLikeCount((likeCount) => likeCount + 1);
  }

  return (
    <Btn
      variant={'secondary'}
      className={cn(
        {
          'text-light-primary': liked,
          '': !liked,
        },
        className,
      )}
      onClick={likeHandler}
    >
      {' '}
      <HandThumbUpIcon className="text-current h-6 w-6" /> {likeCount} {liked}
    </Btn>
  );
};
