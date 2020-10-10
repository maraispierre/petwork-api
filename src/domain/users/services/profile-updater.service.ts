import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { ProfileInput } from '../../../application/users/inputs/profile.input';

@Injectable()
export class ProfileUpdater {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async update(profile: ProfileInput): Promise<User> {
    const user = await this.usersRepository.findOne(profile._id);

    if (user instanceof User) {
      user.updateProfile(profile);

      return this.usersRepository.save(user);
    }

    throw new ValidationError('Missing user with id :' + profile._id);
  }
}
