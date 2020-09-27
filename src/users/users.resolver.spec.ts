import { Repository } from 'typeorm';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { SubscriptionService } from './subscription.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  const EMAIL = 'email';
  const PASSWORD = 'password';
  const FIRSTNAME = 'firstname';
  const LASTNAME = 'lastname';

  let usersResolver: UsersResolver;
  let usersService: UsersService;
  let usersRepository: Repository<User>;
  let subscriptionService: SubscriptionService;

  beforeEach(async () => {
    usersService = new UsersService();
    subscriptionService = new SubscriptionService(usersRepository);
    usersResolver = new UsersResolver(usersService, subscriptionService);
  });

  describe('user', () => {
    it('should return user', async () => {
      const user = {
        email: EMAIL,
      };

      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);
      expect(await usersResolver.user(EMAIL)).toStrictEqual(user);
    });
  });

  describe('subscription', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest
        .spyOn(subscriptionService, 'subscription')
        .mockImplementation(async () => user);

      const subscriptionInput = new SubscriptionInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      expect(await usersResolver.subscription(subscriptionInput)).toStrictEqual(
        user,
      );
    });
  });
});
