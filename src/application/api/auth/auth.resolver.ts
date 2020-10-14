import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../../domain/auth/auth.service';
import { JwtToken } from './models/jwt-token.model';
import { LoginInput } from './inputs/login.input';
import { Logger } from '@nestjs/common';

@Resolver(of => JwtToken)
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  @Mutation(/* istanbul ignore next */ returns => JwtToken)
  public async login(@Args('login') login: LoginInput) {
    Logger.log('AuthResolver: Login with ' + login.email);
    return await this.authService.login(login);
  }
}
