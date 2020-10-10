import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './models/jwt-token.model';
import { LoginInput } from './inputs/login.input';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../../../domain/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginInput): Promise<JwtToken> {
    const user = await this.usersRepository.findOne({
      where: { email: login.email },
    });

    if (user && (await bcrypt.compare(login.password, user.password))) {
      const payload = { email: login.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new AuthenticationError('Login failed');
  }
}
