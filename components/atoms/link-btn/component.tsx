import { cn } from '@/lib/cn';
import Link from 'next/link';

interface Props extends React.ComponentProps<typeof Link> {
  variant: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const LinkBtn: React.FC<Props> = ({
  variant,
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={cn(
        'flex w-fit items-center justify-center gap-sm whitespace-nowrap rounded-md py-sm !text-button transition-all duration-100 ease-in-out max-lg:w-full',
        {
          '!border-line-width border-dashed border-light-neutral-gray bg-light-background px-lg text-light-text hover:border-solid hover:opacity-75 active:border-solid active:opacity-50':
            variant === 'primary',
          'text-light-text hover:opacity-75 active:opacity-50':
            variant === 'secondary',
          'text-primary !border-line-width border-dashed border-light-primary px-lg hover:border-solid active:border-solid active:border-light-secondary active:text-light-secondary':
            variant === 'ghost',
        },
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
