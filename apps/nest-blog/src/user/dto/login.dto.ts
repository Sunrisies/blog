import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';
import { IsNotEmpty } from 'class-validator';

export class LoginDto extends PartialType(RegisterDto) {
  @IsNotEmpty()
  user_name?: string;

  @IsNotEmpty()
  pass_word?: string;
  type: string;
  email?: string;
  code?: string;
}
