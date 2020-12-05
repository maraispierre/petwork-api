import { Repository } from 'typeorm';
import { User } from '../user.model';
import { Register } from './register.service';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from '../../../application/api/users/inputs/register.input';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { EmailsSender } from '../../../infrastructure/emails/emails-sender.service';
import { SendinBlueSender } from '../../../infrastructure/emails/sendin-blue-sender.impl.service';
import { RegisterSendEmailError } from './errors/register.send.email.error';
import { RegisterDuplicatedEmailError } from './errors/register.duplicated.email.error';

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
      const registerInput = new RegisterInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      const mockedUser = User.subscribe(registerInput);

      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockImplementation(async () => []);
      jest
        .spyOn(emailsSender, 'sendEmail')
        .mockImplementation(async () => undefined);

      const user = await register.register(registerInput);

      expect(user.email).toEqual(EMAIL);
      expect(await bcrypt.compare(PASSWORD, user.password)).toEqual(true);
      expect(user.firstname).toEqual(FIRSTNAME);
      expect(user.lastname).toEqual(LASTNAME);
      expect(user.isSuspended).toEqual(IS_SUSPENDED);
    });

    it('should throw RegisterDuplicatedEmailError', async () => {
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

      const registerInput = new RegisterInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );

      await expect(register.register(registerInput)).rejects.toThrowError(
        RegisterDuplicatedEmailError,
      );
    });

    it('should throw RegisterEmailError', async () => {
      const mockedUser = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockImplementation(async () => []);
      jest.spyOn(emailsSender, 'sendEmail').mockImplementation(async () => {
        throw new RegisterSendEmailError();
      });

      const registerInput = new RegisterInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );

      await expect(register.register(registerInput)).rejects.toThrowError(
        RegisterSendEmailError,
      );
    });
  });
});
