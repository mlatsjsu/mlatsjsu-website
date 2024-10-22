import { Btn } from '@/components/atoms/btn';
import { cn } from '@/lib/cn';

interface Props
  extends Omit<
    React.ComponentProps<typeof Btn>,
    'variant' | 'children' | 'href' | 'onClick'
  > {
    variant: 'follow' | 'unfollow' | 'following';
  }

export const FollowBtn: React.FC<Props> = ({variant, className, ...props}) => (
    <Btn 
    variant="secondary"
    className={cn(
        {
            'text-light-primary': variant === 'follow',
            'text-light-text': variant === 'following',
            "text-[#CF0000]": variant === "unfollow",
        },
        className,
    )}
    >
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Btn>
)
