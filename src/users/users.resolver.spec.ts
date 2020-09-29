import { Repository } from 'typeorm';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { SubscriptionManager } from './services/subscription-manager.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './services/users.service';

describe('UsersResolver', () => {
  const EMAIL = 'email';
  const PASSWORD = 'password';
  const FIRSTNAME = 'firstname';
  const LASTNAME = 'lastname';

  let usersResolver: UsersResolver;
  let usersService: UsersService;
  let usersRepository: Repository<User>;
  let subscriptionManager: SubscriptionManager;

  beforeEach(async () => {
    usersService = new UsersService();
    subscriptionManager = new SubscriptionManager(usersRepository);
    usersResolver = new UsersResolver(usersService, subscriptionManager);
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

  describe('subscribe', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest
        .spyOn(subscriptionManager, 'subscribe')
        .mockImplementation(async () => user);

      const subscriptionInput = new SubscriptionInput(
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      expect(await usersResolver.subscribe(subscriptionInput)).toStrictEqual(
        user,
      );
    });
  });
});
