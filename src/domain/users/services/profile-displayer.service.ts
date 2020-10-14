import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user.model';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { ProfileDisplayerUnknownUserError } from './errors/profile.displayer.unknown.user.error';

@Injectable()
export class ProfileDisplayer {
  public constructor(private usersRepository: UsersRepository) {}

  public async show(_id: string): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if (user instanceof User) {
      return user;
    }

    Logger.error(
      'ProfileDisplayer : Impossible to show this profile, user not found',
    );
    throw new ProfileDisplayerUnknownUserError('Missing user with id :' + _id);
  }
}
