import { ValidationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { User } from '../user.model';
import { PasswordUpdater } from './password-updater.service';
import * as bcrypt from 'bcrypt';

describe('PasswordUpdater', () => {
  const _ID = 'test';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'test';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';

  const NEW_PASSWORD = 'test2';

  let usersRepository: Repository<User>;
  let passwordUpdater: PasswordUpdater;

  beforeEach(async () => {
    usersRepository = new Repository<User>();
    passwordUpdater = new PasswordUpdater(usersRepository);
  });

  describe('update', () => {
    it('should return an user', async () => {
      const mockedUser = new User(EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => mockedUser);
      jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockedUser);

      const updatedUser = await passwordUpdater.update(_ID, NEW_PASSWORD);

      expect(await bcrypt.compare(NEW_PASSWORD, updatedUser.password)).toEqual(
        true,
      );
    });

    it('should throw validation error with findOne', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => undefined);

      expect(passwordUpdater.update(_ID, NEW_PASSWORD)).rejects.toThrowError(
        ValidationError,
      );
    });
  });
});
