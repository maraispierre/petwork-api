import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  const EMAIL = 'email';

  let usersResolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    usersService = new UsersService();
    usersResolver = new UsersResolver(usersService);
  });

  describe('user', () => {
    it('should return user', async () => {
      const user = {
        email: EMAIL,
      };

      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);
      expect(await usersResolver.user(EMAIL)).toStrictEqual(user);
    });
  });
});
