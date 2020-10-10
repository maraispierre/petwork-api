import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../../domain/auth/auth.service';
import { JwtToken } from './models/jwt-token.model';
import { LoginInput } from './inputs/login.input';

@Resolver(of => JwtToken)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(/* istanbul ignore next */ returns => JwtToken)
  async login(@Args('login') login: LoginInput) {
    return await this.authService.login(login);
  }
}
