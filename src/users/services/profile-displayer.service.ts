import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError, ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { SubscriptionInput } from '../inputs/subscription.input';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { globalConstants } from '../../constant';
import { EmptyError } from 'rxjs';

@Injectable()
export class ProfileDisplayer {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async show(_id: string): Promise<User> {
    const user = await this.usersRepository.findOne(_id);

    if(user instanceof User) {
        return user;
    }

    throw new ValidationError('Missing user with id :' + _id);
  }
}
