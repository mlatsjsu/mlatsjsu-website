import { cn } from '@/lib/cn';

interface Props extends React.ComponentProps<'button'> {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Btn: React.FC<Props> = ({
  variant,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-sm py-sm opacity-100 transition-all duration-100 ease-in-out hover:opacity-75',
        {
          'rounded-sm bg-light-neutral-gray px-lg': variant === 'primary',
          '': variant === 'secondary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
