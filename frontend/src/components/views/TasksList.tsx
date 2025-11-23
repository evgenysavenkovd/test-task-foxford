import { useGetTasks } from '@/hooks/queries';

import { Item, ItemDescription, ItemHeader } from '../ui/item';
import { Spinner } from '../ui/spinner';

export const TasksList = () => {
  const { data: tasks } = useGetTasks();

  if (!tasks)
    return (
      <div className='flex min-h-10 items-center justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='flex flex-col gap-3'>
      {tasks.map((task) => (
        <Item key={task.id} variant='outline'>
          <ItemHeader>{task.name}</ItemHeader>
          <ItemDescription>
            Автор: {task.author.email} | Исполнитель: {task.assignee.email}
          </ItemDescription>
        </Item>
      ))}
    </div>
  );
};
