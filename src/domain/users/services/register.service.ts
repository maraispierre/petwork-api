import { Injectable, Logger } from '@nestjs/common';
import { User } from '../user.model';
import { RegisterInput } from '../../../application/api/users/inputs/register.input';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { EmailsSender } from '../../../infrastructure/emails/emails-sender.service';
import { RegisterSendEmailError } from './errors/register-send-email.error';
import { RegisterDuplicatedEmailError } from './errors/register-duplicated-email.error';

@Injectable()
export class Register {
  constructor(
    private usersRepository: UsersRepository,
    private emailsSender: EmailsSender,
  ) {}

  public async register(register: RegisterInput): Promise<User> {
    if (await this.isEmailAlreadyUsed(register.email)) {
      Logger.error(
        'Register : Impossible to register user : User with this email already exists',
      );
      throw new RegisterDuplicatedEmailError(
        'Register : User with this email already exists',
      );
    }

    const user = await User.subscribe(register);

    try {
      await this.emailsSender.sendEmail(
        EmailsSender.REGISTER_TEMPLATE_ID,
        user.email,
      );
    } catch (error) {
      Logger.error('Register : Impossible to send email : ' + error.message);
      throw new RegisterSendEmailError(
        'Register : Error when try to send register email : email not sent',
      );
    }

    return this.usersRepository.save(user);
  }

  private async isEmailAlreadyUsed(email: string) {
    const users = await this.usersRepository.findByEmail(email);

    return users.length !== 0;
  }
}
