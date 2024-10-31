'use client';
import { Btn } from '@/components/atoms/btn';
import { cn } from '@/lib/cn';
import React, { useState } from 'react';

interface Props
  extends Omit<
    React.ComponentProps<typeof Btn>,
    'variant' | 'children' | 'href' | 'onClick'
  > {
  userId: string;
}

export const FollowBtn: React.FC<Props> = ({ className, userId, ...props }) => {
  const [following, setFollowing] = useState(false);
  const [hover, setHover] = useState(false);

  React.useEffect(() => {
    // fetch follow status
  }, [userId]);

  const handleFollow = async () => {
    setFollowing(!following);
    // follow user
  };

  return (
    <Btn
      variant="secondary"
      className={cn(
        {
          'text-light-text hover:text-[#CF0000]': following,
          'text-light-primary': !following,
        },
        className,
      )}
      onClick={handleFollow}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {!hover && !following && 'Follow'}
      {hover && !following && 'Follow'}
      {!hover && following && 'Following'}
      {hover && following && 'Unfollow'}
    </Btn>
  );
};
