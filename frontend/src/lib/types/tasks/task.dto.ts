export interface TaskDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  author: { email: string };
  assignee: { email: string };
}
