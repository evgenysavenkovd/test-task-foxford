import { type PropsWithChildren, useId, useMemo } from 'react';
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type TextFieldProps<T extends FieldValues> = UseControllerProps<T> &
  PropsWithChildren & {
    inputProps?: Omit<React.ComponentProps<'input'>, 'value' | 'onChange'>;
    className?: string;
    inputContainerClassName?: string;
    label?: string;
  };

export const TextField = <T extends FieldValues>({
  inputProps,
  className,
  label,
  children,
  inputContainerClassName,
  ...props
}: TextFieldProps<T>) => {
  const { field, fieldState, formState } = useController(props);

  const id = useId();

  const state = useMemo(() => {
    if (!fieldState.isTouched && !formState.isSubmitted) return;
    return fieldState.invalid ? 'invalid' : 'valid';
  }, [fieldState.isTouched, fieldState.invalid, formState.isSubmitted]);

  const placeholder = inputProps?.placeholder ?? label;

  return (
    <Field className={className}>
      <FieldLabel
        htmlFor={id}
        className={cn(state === 'invalid' && 'text-destructive')}
      >
        {label}
      </FieldLabel>
      <div className={cn('relative', inputContainerClassName)}>
        <Input
          {...inputProps}
          {...field}
          value={field.value ?? ''}
          id={id}
          placeholder={placeholder}
          aria-invalid={state === 'invalid'}
          data-valid={state === 'valid' ? 'true' : undefined}
          className={cn(inputProps?.className)}
        />
        {children}
      </div>
    </Field>
  );
};
