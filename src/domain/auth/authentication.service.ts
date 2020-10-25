import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from '../../application/api/auth/models/jwt-token.model';
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

  async login(login: LoginInput): Promise<JwtToken> {
    const user = await this.usersRepository.findOneByEmail(login.email);

    if (user && (await bcrypt.compare(login.password, user.password))) {
      const payload = { email: login.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    Logger.error('Authentication : Login failed');
    throw new AuthenticationError('Authentication : Login failed');
  }
}
