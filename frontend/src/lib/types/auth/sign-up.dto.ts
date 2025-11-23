import z from 'zod';

export const signUpSchema = z
  .object({
    email: z.email('Некорректный email').trim(),
    password: z
      .string()
      .trim()
      .min(8, 'Пароль должен быть не менее 8 символов')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ',
      ),
    confirmPassword: z.string().trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
      });
    }
  });

export type SignUpDto = z.infer<typeof signUpSchema>;
