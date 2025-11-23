import { CreateTaskForm } from '@/components/forms/tasks';
import { TasksList } from '@/components/views';
import { useCreateTask } from '@/hooks/queries';

export const MainScreen = () => {
  const { mutateAsync: createTask } = useCreateTask();

  return (
    <div className='flex flex-col gap-5 p-10'>
      <div className='flex items-center justify-end'>
        <CreateTaskForm onSubmit={createTask} />
      </div>
      <TasksList />
    </div>
  );
};
