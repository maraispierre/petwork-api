import { UsersRepository } from './users.repository';
import { User as UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { User } from '../../../domain/users/user.model';
import { DuplicatedUserError } from './duplicated-user.error';
import { File as FileEntity } from '../files/files.entity';
import { File } from '../../../domain/files/file.model';

describe('UsersRepository', () => {
  const _ID = 'test';
  const EMAIL = 'test@test.com';
  const PASSWORD = 'test';
  const FIRSTNAME = 'test';
  const LASTNAME = 'TEST';

  let repository: Repository<UserEntity>;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    repository = new Repository<UserEntity>();
    usersRepository = new UsersRepository(repository);
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      const mockedUser = new UserEntity(
        _ID,
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
        new FileEntity('', '', '', 0),
      );
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(async () => mockedUser);

      const user = await usersRepository.findOne(_ID);

      expect(user).toBeInstanceOf(User);
    });

    it('should return undefined', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(async () => undefined);

      const user = await usersRepository.findOne(_ID);

      expect(user).toEqual(undefined);
    });
  });

  describe('findOneByEmail', () => {
    it('should return an user', async () => {
      const mockedUser = new UserEntity(
        _ID,
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => [mockedUser]);

      const user = await usersRepository.findOneByEmail(_ID);

      expect(user).toBeInstanceOf(User);
    });

    it('should return undefined', async () => {
      jest.spyOn(repository, 'find').mockImplementation(async () => []);

      const user = await usersRepository.findOneByEmail(_ID);

      expect(user).toEqual(undefined);
    });

    it('should return error', async () => {
      const mockedUser = new UserEntity(
        _ID,
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => [mockedUser, mockedUser]);

      await expect(usersRepository.findOneByEmail(_ID)).rejects.toThrowError(
        DuplicatedUserError,
      );
    });
  });

  describe('findByEmail', () => {
    it('should return an array of user', async () => {
      const mockedUser = new UserEntity(
        _ID,
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => [mockedUser]);

      const users = await usersRepository.findByEmail(_ID);

      expect(users.length).toEqual(1);
    });
  });

  describe('save', () => {
    it('should return an user', async () => {
      const mockedUser = new UserEntity(
        _ID,
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
        new FileEntity('', '', '', 0),
      );
      jest.spyOn(repository, 'save').mockImplementation(async () => mockedUser);

      const user = new User(
        _ID,
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
        new File('', '', '', 0),
      );

      const expectedResult = await usersRepository.save(user);

      expect(expectedResult).toBeInstanceOf(User);
    });

    it('should return an user without avatar', async () => {
      const mockedUser = new UserEntity(
        _ID,
        EMAIL,
        PASSWORD,
        FIRSTNAME,
        LASTNAME,
      );
      jest.spyOn(repository, 'save').mockImplementation(async () => mockedUser);

      const user = new User(_ID, EMAIL, PASSWORD, FIRSTNAME, LASTNAME);

      const expectedResult = await usersRepository.save(user);

      expect(expectedResult).toBeInstanceOf(User);
    });
  });
});
