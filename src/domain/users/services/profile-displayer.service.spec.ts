import { Repository } from 'typeorm';
import { User } from '../user.model';
import { ProfileDisplayer } from './profile-displayer.service';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { ProfileDisplayerUnknownUserError } from './errors/profile-displayer-unknown-user.error';

describe('ProfileDisplayer', () => {
  const _ID = 'test';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'test';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';

  let usersRepository: UsersRepository;
  let profileDisplayer: ProfileDisplayer;

  beforeEach(async () => {
    usersRepository = new UsersRepository(new Repository<User>());
    profileDisplayer = new ProfileDisplayer(usersRepository);
  });

  describe('subscription', () => {
    it('should return an user', async () => {
      const mockedUser = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => mockedUser);

      const subscriber = await profileDisplayer.show(_ID);

      expect(subscriber.email).toEqual(EMAIL);
      expect(subscriber.firstname).toEqual(FIRSTNAME);
      expect(subscriber.lastname).toEqual(LASTNAME);
    });

    it('should throw ProfileDisplayerUnknownUserError', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => undefined);

      await expect(profileDisplayer.show(_ID)).rejects.toThrowError(
        ProfileDisplayerUnknownUserError,
      );
    });
  });
});
