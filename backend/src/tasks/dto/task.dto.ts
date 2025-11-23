import { ApiProperty } from '@nestjs/swagger';

class TaskUser {
  @ApiProperty()
  email: string;
}

export class TaskDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: TaskUser })
  author: TaskUser;

  @ApiProperty({ type: TaskUser })
  assignee: TaskUser;
}
