import { cn } from '@/lib/cn';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
        '',
        {
          '': variant === 'primary',
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
