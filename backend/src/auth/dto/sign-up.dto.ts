import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[!@#$%^&*()]/, {
    message:
      'Password must contain at least one special character (!@#$%^&*())',
  })
  @Matches(/[!@#$%^&*()]/, {
    message:
      'Password must contain at least one special character (!@#$%^&*())',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least one number',
  })
  @ApiProperty({
    description:
      'Пароль должен иметь длину >= 8 символов, содержать хотя бы один специальный символ (!@#$%^&*()), хотя бы одну букву в верхнем/нижнем регистре, хотя бы одну цифру',
  })
  password: string;
}
