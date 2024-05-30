import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    console.log(this.usersRepository, 'service');
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(user: Users): Promise<Users> {
    return this.usersRepository.save(user);
  }

  async update(id: number, user: Users): Promise<Users> {
    await this.usersRepository.update(id, user);
    console.log(user, 'user');
    return this.findOne(id);
  }
}
