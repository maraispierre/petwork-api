import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from '../../application/api/auth/models/login.model';
import { LoginInput } from '../../application/api/auth/inputs/login.input';
import * as bcrypt from 'bcrypt';
import { AuthenticationError } from 'apollo-server-express';
import { UsersRepository } from '../../infrastructure/persistence/users/users.repository';

@Injectable()
export class Authentication {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginInput): Promise<Login> {
    const user = await this.usersRepository.findOneByEmail(login.email);

    if (
      user &&
      user._id &&
      (await bcrypt.compare(login.password, user.password))
    ) {
      const payload = { email: login.email };
      return {
        access_token: this.jwtService.sign(payload),
        user_id: user._id,
      };
    }

    Logger.error('Authentication : Login failed');
    throw new AuthenticationError('Authentication : Login failed');
  }
}
