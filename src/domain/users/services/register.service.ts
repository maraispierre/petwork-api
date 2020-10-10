import { Injectable } from '@nestjs/common';
import { ValidationError } from 'apollo-server-express';
import { User } from '../user.model';
import { SubscriptionInput } from '../../../application/api/users/inputs/subscription.input';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';

@Injectable()
export class Register {
  constructor(private usersRepository: UsersRepository) {}

  async subscribe(subscription: SubscriptionInput): Promise<User> {
    if (await this.isEmailAlreadyUsed(subscription.email)) {
      throw new ValidationError('Email already exists');
    }

    const user = await User.subscribe(subscription);

    return this.usersRepository.save(user);
  }

  private async isEmailAlreadyUsed(email: string) {
    const users = await this.usersRepository.findByEmail(email);

    return users.length !== 0;
  }
}
