import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService

  beforeEach(async () => {
    authController = new AuthController(authService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
