import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        email: 'john',
        password: 'changeme',
      },
      {
        id: 2,
        email: 'chris',
        password: 'secret',
      },
      {
        id: 3,
        email: 'maria',
        password: 'guess',
      },
    ];
  }

  findOne(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}
