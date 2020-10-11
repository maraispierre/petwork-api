import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { User } from '../user.model';
import { Register } from './register.service';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from '../../../application/api/users/inputs/register.input';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { EmailsSender } from '../../../infrastructure/emails/emails-sender.service';
import { SendinBlueSender } from '../../../infrastructure/emails/sendin-blue-sender.service';

describe('Register', () => {
  const _ID = 'ID';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'password';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';
  const IS_SUSPENDED = false;

  let usersRepository: UsersRepository;
  let emailsSender: EmailsSender;
  let register: Register;

  beforeEach(async () => {
    usersRepository = new UsersRepository(new Repository<User>());
    emailsSender = new EmailsSender(new SendinBlueSender());
    register = new Register(usersRepository, emailsSender);
  });

  describe('register', () => {
    it('should register an user', async () => {
      const subscription = new RegisterInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      const mockedUser = User.subscribe(subscription);

      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockImplementation(async () => []);
      jest
        .spyOn(emailsSender, 'sendEmail')
        .mockImplementation(async () => undefined);

      const subscriber = await register.register(subscription);

      expect(subscriber.email).toEqual(EMAIL);
      expect(await bcrypt.compare(PASSWORD, subscriber.password)).toEqual(true);
      expect(subscriber.firstname).toEqual(FIRSTNAME);
      expect(subscriber.lastname).toEqual(LASTNAME);
      expect(subscriber.isSuspended).toEqual(IS_SUSPENDED);
    });

    it('should throw validation error', async () => {
      const mockedUser = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockImplementation(async () => [mockedUser]);
      jest
        .spyOn(emailsSender, 'sendEmail')
        .mockImplementation(async () => undefined);

      const subscriptionInput = new RegisterInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );

      expect(register.register(subscriptionInput)).rejects.toThrowError(
        ValidationError,
      );
    });
  });
});
