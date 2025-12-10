import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<typeof Input>, 'name'> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  labelClassName?: string;
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  labelClassName,
  className,
  ...inputProps
}: Readonly<FormInputProps<TFieldValues, TName>>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel
            className={cn(
              'block text-sm font-semibold text-gray-700 mb-2',
              labelClassName
            )}
            htmlFor={name}
          >
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...inputProps}
              {...field}
              className={cn(
                fieldState.error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                className
              )}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
