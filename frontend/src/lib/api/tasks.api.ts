import type { CreateTaskDto, TaskDto } from '../types/tasks';
import { apiClient } from './base-instance';

export const tasksApi = { create, getAll };

async function create(dto: CreateTaskDto) {
  const response = await apiClient.post<TaskDto>('tasks', { json: dto });
  return response.json();
}

async function getAll(): Promise<TaskDto[]> {
  const response = await apiClient.get<TaskDto[]>('tasks');
  return response.json();
}
