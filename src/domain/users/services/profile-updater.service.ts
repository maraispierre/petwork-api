import { Injectable } from '@nestjs/common';
import { ValidationError } from 'apollo-server-express';
import { User } from '../user.model';
import { ProfileInput } from '../../../application/api/users/inputs/profile.input';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';

@Injectable()
export class ProfileUpdater {
  constructor(private usersRepository: UsersRepository) {}

  async update(profile: ProfileInput): Promise<User> {
    const user = await this.usersRepository.findOne(profile._id);

    if (user instanceof User) {
      user.updateProfile(profile);

      return this.usersRepository.save(user);
    }

    throw new ValidationError('Missing user with id :' + profile._id);
  }
}
