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
import { User } from 'lucide-react';

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

export function PersonInput<
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
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                {...inputProps}
                {...field}
                className={cn(
                  'pl-12 pr-4 bg-gray-50 h-auto',
                  fieldState.error &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                  className
                )}
              />
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
