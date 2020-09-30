import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { SubscriptionInput } from '../inputs/subscription.input';
import { User } from '../models/user.model';
import { ProfileDisplayer } from './profile-displayer.service';

describe('ProfileDisplayer', () => {
  const _ID = 'test';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'test';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';
  const IS_SUSPENDED = false;

  let usersRepository: Repository<User>;
  let profileDisplayer: ProfileDisplayer;

  beforeEach(async () => {
    usersRepository = new Repository<User>();
    profileDisplayer = new ProfileDisplayer(usersRepository);
  });

  describe('subscription', () => {
    it('should return an user', async () => {
      const mockedUser = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => mockedUser);

      const subscriber = await profileDisplayer.show(_ID);

      expect(subscriber.email).toEqual(EMAIL);
      expect(subscriber.password).toEqual(PASSWORD);
      expect(subscriber.firstname).toEqual(FIRSTNAME);
      expect(subscriber.lastname).toEqual(LASTNAME);
      expect(subscriber.isSuspended).toEqual(IS_SUSPENDED);
    });

    it('should throw validation error', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);

      expect(profileDisplayer.show(_ID)).rejects.toThrowError(ValidationError);
    });
  });
});
