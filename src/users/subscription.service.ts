import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async subscription(subscription: SubscriptionInput): Promise<User> {
    if (await this.isEmailAlreadyUsed(subscription.email)) {
      throw new ValidationError('Email already exists');
    }

    const user = new User(
      subscription.email,
      subscription.password,
      subscription.firstname,
      subscription.lastname,
    );
    return this.usersRepository.save(user);
  }

  private async isEmailAlreadyUsed(email: string) {
    const users = await this.usersRepository.find({
      where: { email: email },
    });

    if (users.length !== 0) {
      return true;
    }

    return false;
  }
}
