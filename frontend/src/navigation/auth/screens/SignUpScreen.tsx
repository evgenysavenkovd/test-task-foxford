import { useState } from 'react';

import { SignUpForm } from '@/components/forms/auth';
import { CardContent, CardHeader } from '@/components/ui/card';
import { authApi } from '@/lib/api';
import type { SignUpDto } from '@/lib/types/auth';
import { getApiError } from '@/lib/utils';

export const SignUpScreen = () => {
  const [apiError, setApiError] = useState<string>();

  const onSubmit = (values: SignUpDto) =>
    authApi.signUp(values).catch((err) => {
      console.log(err);
      getApiError(err).then((msg) => {
        if (msg) setApiError(msg);
      });
    });

  return (
    <>
      <CardHeader>Регистрация</CardHeader>
      <CardContent>
        <SignUpForm onSubmit={onSubmit} apiError={apiError} />
      </CardContent>
    </>
  );
};
