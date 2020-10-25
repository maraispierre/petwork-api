import { JwtService } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { Authentication } from '../../../domain/auth/authentication.service';
import { LoginInput } from './inputs/login.input';
import { UsersRepository } from '../../../infrastructure/persistence/users/users.repository';

describe('AuthResolver', () => {
  const ACCESS_TOKEN = 'test';
  const _ID_USER = 'id';

  let usersRepository: UsersRepository;
  let jwtService: JwtService;
  let authService: Authentication;
  let authResolver: AuthResolver;

  beforeEach(async () => {
    authService = new Authentication(usersRepository, jwtService);
    authResolver = new AuthResolver(authService);
  });

  describe('login', () => {
    it('should return a jwt token', async () => {
      const jwtToken = {
        access_token: ACCESS_TOKEN,
        user_id: _ID_USER,
      };

      const loginInput = new LoginInput();

      jest.spyOn(authService, 'login').mockImplementation(async () => jwtToken);

      expect(await authResolver.login(loginInput)).toStrictEqual(jwtToken);
    });
  });
});
