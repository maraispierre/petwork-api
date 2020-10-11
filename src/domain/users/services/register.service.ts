import { Injectable } from '@nestjs/common';
import { ValidationError } from 'apollo-server-express';
import { User } from '../user.model';
import { RegisterInput } from '../../../application/api/users/inputs/register.input';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { EmailsSender } from '../../../infrastructure/emails/emails-sender.service';

@Injectable()
export class Register {
  constructor(
    private usersRepository: UsersRepository,
    private emailsSender: EmailsSender,
  ) {}

  public async register(register: RegisterInput): Promise<User> {
    if (await this.isEmailAlreadyUsed(register.email)) {
      throw new ValidationError('Email already exists');
    }

    const user = await User.subscribe(register);

    await this.emailsSender.sendEmail(
      EmailsSender.REGISTER_TEMPLATE_ID,
      user.email,
    );

    return this.usersRepository.save(user);
  }

  private async isEmailAlreadyUsed(email: string) {
    const users = await this.usersRepository.findByEmail(email);

    return users.length !== 0;
  }
}
