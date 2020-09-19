import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    authService = new AuthService(usersService, jwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
