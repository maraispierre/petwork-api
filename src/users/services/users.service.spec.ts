import { UsersService } from './users.service';

describe('UsersService', () => {
  const BAD_EMAIL = 'fake';

  let usersService: UsersService;

  beforeEach(async () => {
    usersService = new UsersService();
  });

  describe('findOne', () => {
    it('should return undefined', async () => {
      expect(await usersService.findOne(BAD_EMAIL)).toBeUndefined();
    });
  });
});
