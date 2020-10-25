import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Authentication } from './authentication.service';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../users/user.model';
import { UsersRepository } from '../../infrastructure/persistence/users/users.repository';

describe('AuthService', () => {
  const TOKEN_TEST = 'test';
  const EMAIL_LOGIN = 'test@test.com';
  const PASSWORD_LOGIN = 'test';
  const EMAIL_USER = 'test@test.com';
  const HASHED_PASSWORD_USER =
    '$2b$10$3LurkucjWlrAaTLFi/Fp0OXmg3zdGUmkee6NU/9IlX/aJuyH9efua';
  const FIRSTNAME_USER = 'test';
  const LASTNAME_USER = 'test';

  let authService: Authentication;
  let usersRepository: UsersRepository;
  let jwtOptions: JwtModuleOptions;
  let jwtService: JwtService;

  beforeEach(async () => {
    jwtService = new JwtService(jwtOptions);
    usersRepository = new UsersRepository(new Repository<User>());
    authService = new Authentication(usersRepository, jwtService);
  });

  describe('login', () => {
    it('should return a jwt token', async () => {
      const login = {
        email: EMAIL_LOGIN,
        password: PASSWORD_LOGIN,
      };

      const user = new User(
        undefined,
        EMAIL_USER,
        HASHED_PASSWORD_USER,
        FIRSTNAME_USER,
        LASTNAME_USER,
      );
      const result = { access_token: TOKEN_TEST };

      jest
        .spyOn(usersRepository, 'findOneByEmail')
        .mockImplementation(async () => user);
      jest.spyOn(jwtService, 'sign').mockImplementation(() => TOKEN_TEST);

      expect(await authService.login(login)).toStrictEqual(result);
    });

    it('should throw AuthenticationError', async () => {
      const login = {
        email: EMAIL_LOGIN,
        password: PASSWORD_LOGIN,
      };

      jest
        .spyOn(usersRepository, 'findOneByEmail')
        .mockImplementation(async () => undefined);
      jest.spyOn(jwtService, 'sign').mockImplementation(() => TOKEN_TEST);

      expect(authService.login(login)).rejects.toThrowError(
        AuthenticationError,
      );
    });
  });
});
