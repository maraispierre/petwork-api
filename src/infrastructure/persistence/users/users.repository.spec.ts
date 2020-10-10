import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';
import { User as UserEntity} from './user.entity';
import { Repository } from 'typeorm';
import { User } from '../../../domain/users/user.model';
import { ValidationError } from 'apollo-server-express';

describe('UsersRepository', () => {
  const _ID = 'test';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'test';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';
  const IS_SUSPENDED = true;

  let repository: Repository<UserEntity>
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    repository = new Repository<UserEntity>();
    usersRepository = new UsersRepository(repository);
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      const mockedUser = new UserEntity(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(async () => mockedUser);

      const user = await usersRepository.findOne(_ID);

      expect(user).toBeInstanceOf(User);
    });

    it('should return undefined', async () => {
      const mockedUser = new UserEntity(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(async () => undefined);

      const user = await usersRepository.findOne(_ID);

      expect(user).toEqual(undefined);
    });
  });

  describe('findOneByEmail', () => {
    it('should return an user', async () => {
      const mockedUser = new UserEntity(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => [mockedUser]);

      const user = await usersRepository.findOneByEmail(_ID);

      expect(user).toBeInstanceOf(User);
    });

    it('should return undefined', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => []);

      const user = await usersRepository.findOneByEmail(_ID);

      expect(user).toEqual(undefined);
    });

    it('should return error', async () => {
      const mockedUser = new UserEntity(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => [mockedUser, mockedUser]);

      expect(
        usersRepository.findOneByEmail(_ID),
      ).rejects.toThrowError(ValidationError);
    });
  });

  describe('findByEmail', () => {
    it('should return an array of user', async () => {
      const mockedUser = new UserEntity(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => [mockedUser]);

      const users = await usersRepository.findByEmail(_ID);

      expect(users.length).toEqual(1);
    });
  });

  describe('save', () => {
    it('should return an user', async () => {
      const mockedUser = new UserEntity(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(async () => mockedUser);

      const user = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME)

      const expectedResult = await usersRepository.save(user);

      expect(expectedResult).toBeInstanceOf(User);
    });
  });
});
