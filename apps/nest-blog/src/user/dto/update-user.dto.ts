import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;

  firstName: string;

  lastName: string;

  isActive: boolean;

  email: string;

  password: string;

  createdAt: Date;
}
