import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { type FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { TextField, type TextFieldProps } from './TextField';

export const PasswordField = <T extends FieldValues>(
  props: TextFieldProps<T>,
) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      {...props}
      inputProps={{
        ...props.inputProps,
        type: showPassword ? 'text' : 'password',
      }}
      inputContainerClassName={cn(props.inputContainerClassName, 'relative')}
    >
      <button
        onClick={togglePassword}
        type='button'
        className='absolute top-0 right-0 bottom-0 flex w-8 cursor-pointer items-center justify-center transition hover:opacity-80'
        tabIndex={-1}
      >
        <div className='relative size-4'>
          <EyeIcon
            className={cn(
              'absolute inset-0 size-4 transition duration-200',
              showPassword && 'opacity-0',
            )}
            strokeWidth={2}
          />
          <EyeOffIcon
            className={cn(
              'absolute inset-0 size-4 transition duration-200',
              !showPassword && 'opacity-0',
            )}
            strokeWidth={2}
          />
        </div>
      </button>
    </TextField>
  );
};
