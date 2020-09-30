import { Repository } from 'typeorm';
import { ProfileInput } from './inputs/profile.input';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { ProfileDisplayer } from './services/profile-displayer.service';
import { ProfileUpdater } from './services/profile-updater.service';
import { SubscriptionManager } from './services/subscription-manager.service';
import { UsersResolver } from './users.resolver';
import { Suspender } from './services/suspender.service';

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
  let profileUpdater: ProfileUpdater;
  let suspender: Suspender;

  beforeEach(async () => {
    subscriptionManager = new SubscriptionManager(usersRepository);
    profileDisplayer = new ProfileDisplayer(usersRepository);
    profileUpdater = new ProfileUpdater(usersRepository);
    suspender = new Suspender(usersRepository);
    usersResolver = new UsersResolver(
      subscriptionManager,
      profileDisplayer,
      profileUpdater,
      suspender,
    );
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

  describe('updateProfile', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(profileUpdater, 'update').mockImplementation(async () => user);

      const profile = new ProfileInput(_ID, FIRSTNAME, LASTNAME);

      expect(await usersResolver.updateProfile(profile)).toStrictEqual(user);
    });
  });

  describe('suspend', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(suspender, 'suspend').mockImplementation(async () => user);

      expect(await usersResolver.suspend(_ID)).toStrictEqual(user);
    });
  });
});
