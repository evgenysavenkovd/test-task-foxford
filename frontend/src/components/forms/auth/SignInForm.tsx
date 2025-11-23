import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { PasswordField, TextField } from '@/components/fields';
import { Submit } from '@/components/ui/submit';
import { type SignInDto, signInSchema } from '@/lib/types/auth';

export interface SignInProps {
  onSubmit: (data: SignInDto) => void;
  apiError?: string;
}
export const SignInForm = ({ onSubmit, apiError }: SignInProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInDto>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
    mode: 'all',
  });

  const error = Object.values(errors)[0]?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <TextField
        control={control}
        name='email'
        label='Email'
        inputProps={{ type: 'email' }}
      />
      <PasswordField control={control} name='password' label='Пароль' />
      <Submit
        error={apiError || error}
        isLoading={isSubmitting}
        disabled={!isValid || !!error}
      >
        Войти
      </Submit>
      <div className='flex justify-end gap-2 text-xs'>
        <span className='text-muted-foreground'>Нет аккаунта?</span>
        <Link to='/sign-up' className='text-primary/80 hover:text-primary'>
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
};
