"use client"
import { Btn } from '@/components/atoms/btn';
import { cn } from '@/lib/cn';
import { useState } from 'react';

interface Props
  extends Omit<
    React.ComponentProps<typeof Btn>,
    'variant' | 'children' | 'href' | 'onClick'
  > {
    followed?: boolean
  }

export const FollowBtn: React.FC<Props> = ({className, followed=false, ...props}) => {
  const [following, setFollowing] = useState(followed);
  const [hover, setHover] = useState(false);

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
    onClick={() => setFollowing(!following)}
    onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!hover && !following && 'Follow'}
      {hover && !following && 'Follow'}
      {!hover && following && 'Following'}
      {hover && following && 'Unfollow'}

      </Btn>
)
}
