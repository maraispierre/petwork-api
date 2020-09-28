import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './models/jwt-token.model';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(login: LoginInput): JwtToken {
    const userModel = this.usersService.findOne(login.email);
    if (userModel && login.password === userModel.password) {
      const payload = { email: login.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return undefined;
  }
}
