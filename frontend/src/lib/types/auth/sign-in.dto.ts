import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Некорректный email').trim(),
  password: z.string().trim().min(1, 'Некорректный пароль'),
});

export type SignInDto = z.infer<typeof signInSchema>;
