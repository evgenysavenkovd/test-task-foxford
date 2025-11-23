import { useMutation, useQueryClient } from '@tanstack/react-query';

import { tasksApi } from '@/lib/api';
import type { CreateTaskDto } from '@/lib/types/tasks';

import { qk } from './qk';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateTaskDto) => tasksApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.tasks.list });
    },
  });
};
