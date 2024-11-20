import { cn } from '@/lib/cn';
import TextInput from '@/components/atoms/text-input';

interface FormTextInputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

export const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  labelClassName,
  containerClassName,
  id,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col gap-2', containerClassName)}>
      <label 
        htmlFor={id}
        className={cn(
          'text-sm font-medium text-light-text px-3',
          labelClassName
        )}
      >
        {label}
      </label>
      <TextInput
        id={id}
        {...props}
      />
    </div>
  );
};