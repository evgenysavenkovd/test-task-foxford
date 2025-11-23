import { useState } from 'react';

import { SignInForm } from '@/components/forms/auth';
import { CardContent, CardHeader } from '@/components/ui/card';
import { authApi } from '@/lib/api';
import type { SignInDto } from '@/lib/types/auth';
import { getApiError } from '@/lib/utils';

export const SignInScreen = () => {
  const [apiError, setApiError] = useState<string>();

  const onSubmit = (dto: SignInDto) =>
    authApi.signIn(dto).catch((err) => {
      console.log(err);
      getApiError(err).then((msg) => {
        if (msg) setApiError(msg);
      });
    });

  return (
    <>
      <CardHeader>Логин</CardHeader>
      <CardContent>
        <SignInForm onSubmit={onSubmit} apiError={apiError} />
      </CardContent>
    </>
  );
};
