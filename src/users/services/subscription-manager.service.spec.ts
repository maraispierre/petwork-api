import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { SubscriptionInput } from '../inputs/subscription.input';
import { User } from '../models/user.model';
import { SubscriptionManager } from './subscription-manager.service';
import * as bcrypt from 'bcrypt';
import { EmailsSender } from '../../emails/emails-sender.service';
import { EmailSenderInterface } from '../../emails/interfaces/email-sender.interface';

describe('SubscriptionManager', () => {
  const EMAIL = 'test@test.com';
  const PASSWORD = 'password';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';
  const IS_SUSPENDED = false;

  let emailSenderInterface: EmailSenderInterface;
  let emailsSender: EmailsSender;
  let usersRepository: Repository<User>;
  let subscriptionManager: SubscriptionManager;

  beforeEach(async () => {
    usersRepository = new Repository<User>();
    emailsSender = new EmailsSender(emailSenderInterface);
    subscriptionManager = new SubscriptionManager(
      usersRepository,
      emailsSender,
    );
  });

  describe('subscription', () => {
    it('should subscribe an user', async () => {
      const subscription = new SubscriptionInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      const mockedUser = User.subscribe(subscription);

      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);
      jest.spyOn(emailsSender, 'sendEmail').mockImplementation();
      jest.spyOn(usersRepository, 'find').mockImplementation(async () => []);

      const subscriber = await subscriptionManager.subscribe(subscription);

      expect(subscriber.email).toEqual(EMAIL);
      expect(await bcrypt.compare(PASSWORD, subscriber.password)).toEqual(true);
      expect(subscriber.firstname).toEqual(FIRSTNAME);
      expect(subscriber.lastname).toEqual(LASTNAME);
      expect(subscriber.isSuspended).toEqual(IS_SUSPENDED);
    });

    it('should throw validation error', async () => {
      const mockedUser = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);
      jest
        .spyOn(usersRepository, 'find')
        .mockImplementation(async () => [mockedUser]);

      const subscriptionInput = new SubscriptionInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );

      expect(
        subscriptionManager.subscribe(subscriptionInput),
      ).rejects.toThrowError(ValidationError);
    });
  });
});
