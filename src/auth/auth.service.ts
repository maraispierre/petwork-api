import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const userModel = await this.usersService.findOne(login.email);
    if (userModel && login.password === userModel.password) {
      const payload = { email: login.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return 'Error';
  }
}
