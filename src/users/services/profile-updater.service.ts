import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { ProfileInput } from '../inputs/profile.input';
import { User } from '../models/user.model';

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
      const updatedUser = await this.usersRepository.save(user);

      if (updatedUser instanceof User) {
        return updatedUser;
      }
    }

    throw new ValidationError('Missing user with id :' + profile._id);
  }
}
