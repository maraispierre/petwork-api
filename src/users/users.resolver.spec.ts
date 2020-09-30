import { Repository } from 'typeorm';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { ProfileDisplayer } from './services/profile-displayer.service';
import { SubscriptionManager } from './services/subscription-manager.service';
import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  const _ID = 'test';
  const EMAIL = 'email';
  const PASSWORD = 'password';
  const FIRSTNAME = 'firstname';
  const LASTNAME = 'lastname';

  let usersResolver: UsersResolver;
  let usersRepository: Repository<User>;
  let subscriptionManager: SubscriptionManager;
  let profileDisplayer: ProfileDisplayer;

  beforeEach(async () => {
    subscriptionManager = new SubscriptionManager(usersRepository);
    profileDisplayer = new ProfileDisplayer(usersRepository);
    usersResolver = new UsersResolver(subscriptionManager, profileDisplayer);
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

  describe('showProfile', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(profileDisplayer, 'show').mockImplementation(async () => user);

      expect(await usersResolver.showProfile(_ID)).toStrictEqual(user);
    });
  });
});
