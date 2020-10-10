import { Repository } from 'typeorm';
import { ProfileInput } from './inputs/profile.input';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from '../../users/models/user.model';
import { ProfileDisplayer } from '../../users/services/profile-displayer.service';
import { ProfileUpdater } from '../../users/services/profile-updater.service';
import { SubscriptionManager } from '../../users/services/subscription-manager.service';
import { UsersResolver } from './users.resolver';
import { Suspender } from '../../users/services/suspender.service';
import { PasswordUpdater } from '../../users/services/password-updater.service';

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
  let passwordUpdater: PasswordUpdater;

  beforeEach(async () => {
    subscriptionManager = new SubscriptionManager(usersRepository);
    profileDisplayer = new ProfileDisplayer(usersRepository);
    profileUpdater = new ProfileUpdater(usersRepository);
    suspender = new Suspender(usersRepository);
    passwordUpdater = new PasswordUpdater(usersRepository);
    usersResolver = new UsersResolver(
      subscriptionManager,
      profileDisplayer,
      profileUpdater,
      suspender,
      passwordUpdater,
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
      expect(await usersResolver.subscribe(subscriptionInput)).toEqual(user);
    });
  });

  describe('showProfile', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(profileDisplayer, 'show').mockImplementation(async () => user);

      expect(await usersResolver.showProfile(_ID)).toEqual(user);
    });
  });

  describe('updateProfile', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(profileUpdater, 'update').mockImplementation(async () => user);

      const profile = new ProfileInput(_ID, FIRSTNAME, LASTNAME);

      expect(await usersResolver.updateProfile(profile)).toEqual(user);
    });
  });

  describe('suspend', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest.spyOn(suspender, 'suspend').mockImplementation(async () => user);

      expect(await usersResolver.suspend(_ID)).toEqual(user);
    });
  });

  describe('updatePassword', () => {
    it('should return user', async () => {
      const user = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      jest
        .spyOn(passwordUpdater, 'update')
        .mockImplementation(async () => user);

      expect(await usersResolver.updatePassword(_ID, PASSWORD)).toEqual(user);
    });
  });
});
