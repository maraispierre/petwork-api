import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { SubscriptionInput } from '../../../application/users/inputs/subscription.input';

@Injectable()
export class Register {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async subscribe(subscription: SubscriptionInput): Promise<User> {
    if (await this.isEmailAlreadyUsed(subscription.email)) {
      throw new ValidationError('Email already exists');
    }

    const user = await User.subscribe(subscription);

    return this.usersRepository.save(user);
  }

  private async isEmailAlreadyUsed(email: string) {
    const users = await this.usersRepository.find({
      where: { email: email },
    });

    return users.length !== 0;
  }
}
