import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import { TextAreaField, TextField } from '@/components/fields';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Submit } from '@/components/ui/submit';
import { type CreateTaskDto, createTaskSchema } from '@/lib/types/tasks';

export interface CreateTaskFormProps {
  onSubmit: (data: CreateTaskDto) => void | Promise<unknown>;
}

export const CreateTaskForm = ({ onSubmit }: CreateTaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateTaskDto>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(createTaskSchema),
    mode: 'all',
  });

  const error = Object.values(errors)[0]?.message;

  const id = useId();

  const [dialogOpen, setDialogOpen] = useState(false);

  const onSubmitWrapper = useCallback(
    async (dto: CreateTaskDto) => {
      await onSubmit(dto);
      setDialogOpen(false);
    },
    [onSubmit],
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <form onSubmit={handleSubmit(onSubmitWrapper)} id={id}>
        <DialogTrigger asChild>
          <Button>Создать задачу</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создание задачи</DialogTitle>
          </DialogHeader>
          <TextField
            control={control}
            name='name'
            inputProps={{ placeholder: 'Название задачи' }}
          />
          <TextAreaField
            control={control}
            name='description'
            inputProps={{ placeholder: 'Описание задачи' }}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='secondary'>Отмена</Button>
            </DialogClose>
            <Submit
              isLoading={isSubmitting}
              disabled={!isValid || !!error}
              containerClassName='pt-0'
              form={id}
            >
              Создать
            </Submit>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
