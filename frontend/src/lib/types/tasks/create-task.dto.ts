import z from 'zod';

export const createTaskSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
