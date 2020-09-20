import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  const TOKEN_TEST = 'test';

  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    authService = new AuthService(usersService, jwtService);
    authController = new AuthController(authService);
  });

  describe('login', () => {
    it('should return a jwt token', async () => {
      const result = { access_token: TOKEN_TEST };
      const login = new LoginDto();
      jest.spyOn(authService, 'login').mockImplementation(async () => result);
      expect(await authController.login(login)).toBe(result);
    });

    it('should throw 401 exception', async () => {
      const login = new LoginDto();
      jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => undefined);
      await expect(authController.login(login)).rejects.toEqual(
        new UnauthorizedException(),
      );
    });
  });
});
