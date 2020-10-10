import { Injectable } from '@nestjs/common';
import { ValidationError } from 'apollo-server-express';
import { User } from '../user.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';

@Injectable()
export class Suspender {
  constructor(private usersRepository: UsersRepository) {}

  async suspend(_id: string): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if (user instanceof User) {
      user.suspend();
      return this.usersRepository.save(user);
    }

    throw new ValidationError('Missing user with id :' + _id);
  }
}
