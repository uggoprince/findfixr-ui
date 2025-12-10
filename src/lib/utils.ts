import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MyApp';

export function showSuccessToast({
  title = 'Success',
  description,
  position = 'top-center',
}: {
  title?: string;
  description: string;
  position?:
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right';
}) {
  return toast.success(title, {
    description,
    position,
  });
}
