import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user.model';
import { ProfileInput } from '../../../application/api/users/inputs/profile.input';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { ProfileUpdaterUnknownUserError } from './errors/profile-updater-unknown-user.error';

@Injectable()
export class ProfileUpdater {
  public constructor(private usersRepository: UsersRepository) {}

  public async update(profile: ProfileInput): Promise<User> {
    const user = await this.usersRepository.findOne(profile._id);

    if (user instanceof User) {
      user.updateProfile(profile);

      return this.usersRepository.save(user);
    }

    Logger.error(
      'ProfileUpdater : Impossible to update this profile, user not found',
    );
    throw new ProfileUpdaterUnknownUserError(
      'Missing user with id :' + profile._id,
    );
  }
}
