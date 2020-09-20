import { Controller, Body, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginDto) {
    const result = await this.authService.login(login);
    if (result === undefined) {
      throw new UnauthorizedException();
    }
    return result;
  }
}
