import { Repository } from 'typeorm';
import { User } from '../user.model';
import { Suspender } from './suspender.service';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { SuspenderUnknownUserError } from './errors/suspender-unknown-user.error';

describe('Suspender', () => {
  const _ID = 'test';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'test';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';
  const IS_SUSPENDED = true;

  let usersRepository: UsersRepository;
  let suspender: Suspender;

  beforeEach(async () => {
    usersRepository = new UsersRepository(new Repository<User>());
    suspender = new Suspender(usersRepository);
  });

  describe('suspend', () => {
    it('should return an user', async () => {
      const mockedUser = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => mockedUser);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);

      const suspendUser = await suspender.suspend(_ID);

      expect(suspendUser.email).toEqual(EMAIL);
      expect(suspendUser.firstname).toEqual(FIRSTNAME);
      expect(suspendUser.lastname).toEqual(LASTNAME);
      expect(suspendUser.isSuspended).toEqual(IS_SUSPENDED);
    });

    it('should throw SuspenderUnknownUserError', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => undefined);

      await expect(suspender.suspend(_ID)).rejects.toThrowError(
        SuspenderUnknownUserError,
      );
    });
  });
});
