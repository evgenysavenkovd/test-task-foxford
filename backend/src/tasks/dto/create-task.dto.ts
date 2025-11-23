import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  description: string;
}
