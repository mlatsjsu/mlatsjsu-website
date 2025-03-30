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
    <div className={cn('flex flex-col', containerClassName)}>
      <label 
        htmlFor={id}
        className={cn(
          'text-sm font-medium text-light-text',
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