import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { SubscriptionInput } from '../inputs/subscription.input';
import { User } from '../models/user.model';
import { EmailsSender } from '../../emails/emails-sender.service';

@Injectable()
export class SubscriptionManager {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private emailSender: EmailsSender,
  ) {}

  async subscribe(subscription: SubscriptionInput): Promise<User> {
    if (await this.isEmailAlreadyUsed(subscription.email)) {
      throw new ValidationError('Email already exists');
    }

    const user = await User.subscribe(subscription);

    this.sendConfirmationEmail(user);

    return this.usersRepository.save(user);
  }

  private async isEmailAlreadyUsed(email: string): Promise<boolean> {
    const users = await this.usersRepository.find({
      where: { email: email },
    });

    return users.length !== 0;
  }

  private async sendConfirmationEmail(user: User): Promise<void> {
    await this.emailSender.sendEmail(1, user.email);
  }
}
