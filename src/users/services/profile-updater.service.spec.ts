import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { ProfileInput } from '../inputs/profile.input';
import { SubscriptionInput } from '../inputs/subscription.input';
import { User } from '../models/user.model';
import { ProfileDisplayer } from './profile-displayer.service';
import { ProfileUpdater } from './profile-updater.service';

describe('ProfileUpdater', () => {
  const _ID = 'test';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'test';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';
  const IS_SUSPENDED = false;

  const NEW_FIRSTNAME = 'test 2';
  const NEW_LASTNAME = 'TEST 2';

  let usersRepository: Repository<User>;
  let profileUpdater: ProfileUpdater;

  beforeEach(async () => {
    usersRepository = new Repository<User>();
    profileUpdater = new ProfileUpdater(usersRepository);
  });

  describe('update', () => {
    it('should return an user', async () => {
      const mockedUser = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      const mockedUpdatedUser = new User(
        EMAIL,
        PASSWORD,
        NEW_FIRSTNAME,
        NEW_LASTNAME,
      );
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => mockedUser);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUpdatedUser);

      const profile = new ProfileInput(_ID, NEW_FIRSTNAME, NEW_LASTNAME);

      const updatedProfile = await profileUpdater.update(profile);

      expect(updatedProfile.email).toEqual(EMAIL);
      expect(updatedProfile.password).toEqual(PASSWORD);
      expect(updatedProfile.firstname).toEqual(NEW_FIRSTNAME);
      expect(updatedProfile.lastname).toEqual(NEW_LASTNAME);
      expect(updatedProfile.isSuspended).toEqual(IS_SUSPENDED);
    });

    it('should throw validation error with findOne', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);

      const profile = new ProfileInput(_ID, NEW_FIRSTNAME, NEW_LASTNAME);

      expect(profileUpdater.update(profile)).rejects.toThrowError(
        ValidationError,
      );
    });

    it('should throw validation error with save', async () => {
      const mockedUser = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => mockedUser);
      jest.spyOn(usersRepository, 'save').mockImplementation(async () => null);

      const profile = new ProfileInput(_ID, NEW_FIRSTNAME, NEW_LASTNAME);

      expect(profileUpdater.update(profile)).rejects.toThrowError(
        ValidationError,
      );
    });
  });
});
