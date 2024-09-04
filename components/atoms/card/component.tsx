import { cn } from '@/lib/cn';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Card: React.FC<Props> = ({ children, className, ...props }) => (
  <div
    className={cn(
      'overflow-clip rounded-md !border-line-width border-dashed border-light-neutral-gray bg-light-background',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
