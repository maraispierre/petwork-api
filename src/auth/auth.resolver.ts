import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtToken } from './models/jwt-token.model';
import { AuthenticationError } from 'apollo-server-express';
import { Login } from './inputs/login.input';

@Resolver(of => JwtToken)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => JwtToken)
  async login(@Args('login') login: Login) {
    const result = await this.authService.login(login);

    if (result === undefined) {
      throw new AuthenticationError('Login failed');
    }
    return result;
  }
}
