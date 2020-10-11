import { Injectable } from '@nestjs/common';
import { ValidationError } from 'apollo-server-express';
import { User } from '../user.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';

@Injectable()
export class ProfileDisplayer {
  public constructor(private usersRepository: UsersRepository) {}

  public async show(_id: string): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if (user instanceof User) {
      return user;
    }

    throw new ValidationError('Missing user with id :' + _id);
  }
}
