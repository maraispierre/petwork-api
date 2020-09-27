import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  const EMAIL = 'test@test.com';
  const PASSWORD = 'password';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';
  const IS_SUSPENDED = false;

  const HASHED_PASSWORD =
    '$2b$10$eUKaqwGWzThQePOXTefHzOOqcwZYAIszNmfO7D58vIqXqlO4vZiVG';

  let usersRepository: Repository<User>;
  let subscriptionService: SubscriptionService;

  beforeEach(async () => {
    usersRepository = new Repository<User>();
    subscriptionService = new SubscriptionService(usersRepository);
  });

  describe('subscription', () => {
    it('should subscribe an user', async () => {
      const mockedUser = new User(EMAIL, HASHED_PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);
      jest.spyOn(usersRepository, 'find').mockImplementation(async () => []);

      const subscriptionInput = new SubscriptionInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      const subscriber = await subscriptionService.subscription(
        subscriptionInput,
      );

      expect(subscriber.email).toEqual(EMAIL);
      expect(subscriber.password).toEqual(HASHED_PASSWORD);
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

      const subscriptionFunction = async () => {
        return await subscriptionService.subscription(subscriptionInput);
      };

      expect(
        subscriptionService.subscription(subscriptionInput),
      ).rejects.toThrowError(ValidationError);
    });
  });
});
