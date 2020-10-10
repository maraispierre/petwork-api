import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';

@Injectable()
export class PasswordUpdater {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async update(_id: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if (user instanceof User) {
      user.updatePassword(password);

      return this.usersRepository.save(user);
    }

    throw new ValidationError('Missing user with id :' + _id);
  }
}
