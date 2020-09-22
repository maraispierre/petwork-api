import { JwtService } from '@nestjs/jwt';
import { AuthenticationError } from 'apollo-server-express';
import { UsersService } from 'src/users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';

describe('AuthResolver', () => {
  const ACCESS_TOKEN = 'test';

  let usersService: UsersService;
  let jwtService: JwtService;
  let authService: AuthService;
  let authResolver: AuthResolver;

  beforeEach(async () => {
    authService = new AuthService(usersService, jwtService);
    authResolver = new AuthResolver(authService);
  });

  describe('login', () => {
    it('should return a jwt token', async () => {
      const jwtToken = {
        access_token: ACCESS_TOKEN,
      };

      const loginInput = new LoginInput();

      jest.spyOn(authService, 'login').mockImplementation(() => jwtToken);

      expect(authResolver.login(loginInput)).toStrictEqual(jwtToken);
    });

    it('should return AuthenticationError', () => {
      const loginInput = new LoginInput();

      jest.spyOn(authService, 'login').mockImplementation(() => undefined);

      const loginFunction = () => {
        authResolver.login(loginInput);
      };

      expect(loginFunction).toThrow(AuthenticationError);
    });
  });
});
