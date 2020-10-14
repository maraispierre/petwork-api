import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { PasswordUpdaterUnknownUserError } from './errors/password.updater.unknown.user.error';

@Injectable()
export class PasswordUpdater {
  public constructor(private usersRepository: UsersRepository) {}

  public async update(_id: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if (user instanceof User) {
      user.updatePassword(password);

      return this.usersRepository.save(user);
    }

    Logger.error(
      'PasswordUpdater : Impossible to update password, user not found',
    );
    throw new PasswordUpdaterUnknownUserError('Missing user with id :' + _id);
  }
}
