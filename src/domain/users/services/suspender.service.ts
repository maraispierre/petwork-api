import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { SuspenderUnknownUserError } from './errors/suspender-unknown-user.error';

@Injectable()
export class Suspender {
  public constructor(private usersRepository: UsersRepository) {}

  public async suspend(_id: string): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if (user instanceof User) {
      user.suspend();
      return this.usersRepository.save(user);
    }

    Logger.error('Suspender : Impossible to suspend this user, user not found');
    throw new SuspenderUnknownUserError('Missing user with id :' + _id);
  }
}
