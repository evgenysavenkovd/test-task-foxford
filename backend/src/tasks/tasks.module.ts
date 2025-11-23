import { Module } from '@nestjs/common';

import { UsersModule } from '#src/users/users.module.js';

import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

@Module({
  imports: [UsersModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
