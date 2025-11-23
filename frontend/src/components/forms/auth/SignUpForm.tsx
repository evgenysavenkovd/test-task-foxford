import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { PasswordField, TextField } from '@/components/fields';
import { Submit } from '@/components/ui/submit';
import { type SignUpDto, signUpSchema } from '@/lib/types/auth';

export interface SignUpProps {
  onSubmit: (data: SignUpDto) => void;
  apiError?: string;
}
export const SignUpForm = ({ onSubmit, apiError }: SignUpProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpDto>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpSchema),
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
      <PasswordField
        control={control}
        name='confirmPassword'
        label='Подтверждение пароля'
      />
      <Submit
        error={apiError || error}
        isLoading={isSubmitting}
        disabled={!isValid || !!error}
      >
        Войти
      </Submit>
      <div className='flex justify-end gap-2 text-xs'>
        <span className='text-muted-foreground'>Уже есть аккаунт?</span>
        <Link to='/' className='text-primary/80 hover:text-primary'>
          Войти
        </Link>
      </div>
    </form>
  );
};
