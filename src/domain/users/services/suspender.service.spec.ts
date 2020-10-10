import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { Suspender } from './suspender.service';

describe('Suspender', () => {
  const _ID = 'test';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'test';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';
  const IS_SUSPENDED = true;

  let usersRepository: Repository<User>;
  let suspender: Suspender;

  beforeEach(async () => {
    usersRepository = new Repository<User>();
    suspender = new Suspender(usersRepository);
  });

  describe('suspend', () => {
    it('should return an user', async () => {
      const mockedUser = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
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

    it('should throw validation error with findOne', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => undefined);

      expect(suspender.suspend(_ID)).rejects.toThrowError(ValidationError);
    });
  });
});
