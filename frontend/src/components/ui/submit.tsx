import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Spinner } from './spinner';

export interface SubmitProps extends ButtonProps {
  isLoading?: boolean;
  error?: string;
  containerClassName?: string;
}

export const Submit = ({
  isLoading,
  children,
  className,
  containerClassName,
  error,
  ...props
}: SubmitProps) => (
  <div
    className={cn('flex flex-col gap-2', !error && 'pt-6', containerClassName)}
  >
    {error && (
      <p className='text-destructive min-h-4 text-center text-xs'>{error}</p>
    )}
    <Button
      type='submit'
      disabled={isLoading}
      className={cn(className, {
        'cursor-default opacity-80': isLoading || props.disabled,
      })}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </Button>
  </div>
);
