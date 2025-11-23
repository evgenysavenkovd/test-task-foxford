import { useQuery } from '@tanstack/react-query';

import { tasksApi } from '@/lib/api';

import { qk } from './qk';

export const useGetTasks = () => {
  const tasks = useQuery({
    queryKey: qk.tasks.list,
    queryFn: tasksApi.getAll,
  });
  return tasks;
};
