import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Authentication } from '../../../domain/auth/authentication.service';
import { Login } from './models/login.model';
import { LoginInput } from './inputs/login.input';
import { Logger } from '@nestjs/common';

@Resolver(of => Login)
export class AuthResolver {
  public constructor(private readonly authentication: Authentication) {}

  @Mutation(/* istanbul ignore next */ returns => Login)
  public async login(@Args('login') login: LoginInput) {
    Logger.log('AuthResolver: Login with ' + login.email);
    return await this.authentication.login(login);
  }
}
