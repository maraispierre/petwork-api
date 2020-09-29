import { JwtService } from '@nestjs/jwt';
import { AuthenticationError } from 'apollo-server-express';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';

describe('AuthResolver', () => {
  const ACCESS_TOKEN = 'test';

  let usersRepository: Repository<User>;
  let jwtService: JwtService;
  let authService: AuthService;
  let authResolver: AuthResolver;

  beforeEach(async () => {
    authService = new AuthService(usersRepository, jwtService);
    authResolver = new AuthResolver(authService);
  });

  describe('login', () => {
    it('should return a jwt token', async () => {
      const jwtToken = {
        access_token: ACCESS_TOKEN,
      };

      const loginInput = new LoginInput();

      jest.spyOn(authService, 'login').mockImplementation(async () => jwtToken);

      expect(await authResolver.login(loginInput)).toStrictEqual(jwtToken);
    });
  });
});
