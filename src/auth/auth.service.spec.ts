import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const TOKEN_TEST = 'test';
  const EMAIL_LOGIN = 'test@test.com';
  const PASSWORD_LOGIN = 'test';
  const EMAIL_USER = 'test@test.com';
  const PASSWORD_USER = 'test';

  let authService: AuthService;
  let usersService: UsersService;
  let jwtOptions: JwtModuleOptions;
  let jwtService: JwtService;

  beforeEach(async () => {
    jwtService = new JwtService(jwtOptions);
    usersService = new UsersService();
    authService = new AuthService(usersService, jwtService);
  });

  describe('login', () => {
    it('should return a jwt token', async () => {
      const login = {
        email: EMAIL_LOGIN,
        password: PASSWORD_LOGIN,
      };
      const user = {
        email: EMAIL_USER,
        password: PASSWORD_USER,
      };
      const result = { access_token: TOKEN_TEST };

      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);
      jest.spyOn(jwtService, 'sign').mockImplementation(() => TOKEN_TEST);

      expect(await authService.login(login)).toStrictEqual(result);
    });

    it('should return null value', async () => {
      const login = {
        email: EMAIL_LOGIN,
        password: PASSWORD_LOGIN,
      };
      const user = null;
      const result = { access_token: TOKEN_TEST };

      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);
      jest.spyOn(jwtService, 'sign').mockImplementation(() => TOKEN_TEST);

      expect(await authService.login(login)).toBeUndefined();
    });
  });
});
