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
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

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

export function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label = 'Password',
  description,
  placeholder = 'Enter your password',
  labelClassName,
  className,
  ...inputProps
}: Readonly<FormInputProps<TFieldValues, TName>>) {
  const [showPassword, setShowPassword] = useState(false);
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
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                {...inputProps}
                {...field}
                className={cn(
                  'pl-12 pr-12 bg-gray-50 h-auto',
                  fieldState.error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                  className
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 h-8 w-8"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
