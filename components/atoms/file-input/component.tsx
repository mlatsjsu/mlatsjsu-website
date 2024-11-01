import { cn } from '@/lib/cn';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
export const FileInput: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      type="file"
      className={cn(
        'w-fit max-w-[247px] cursor-pointer gap-md file:mr-4 file:cursor-pointer file:rounded-sm file:border-none file:bg-light-primary file:px-md file:py-sm file:text-light-background',
        className,
      )}
      {...props}
    />
  );
};
