import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProfileInput } from './inputs/profile.input';
import { SubscriptionInput } from './inputs/subscription.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../domain/auth/jwt-auth.guard';
import { Register } from '../../../domain/users/services/register.service';
import { ProfileDisplayer } from '../../../domain/users/services/profile-displayer.service';
import { ProfileUpdater } from '../../../domain/users/services/profile-updater.service';
import { Suspender } from '../../../domain/users/services/suspender.service';
import { PasswordUpdater } from '../../../domain/users/services/password-updater.service';
import { User } from './user.schema';
import { UserMapper } from '../../../infrastructure/mappers/user.mapper';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly subscriptionManager: Register,
    private readonly profileDisplayer: ProfileDisplayer,
    private readonly profileUpdater: ProfileUpdater,
    private readonly suspender: Suspender,
    private readonly passwordUpdater: PasswordUpdater,
  ) {}

  @Mutation(/* istanbul ignore next */ returns => User)
  async subscribe(
    @Args('subscription') subscription: SubscriptionInput,
  ): Promise<User> {
    return UserMapper.toDTO(
      await this.subscriptionManager.subscribe(subscription),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(/* istanbul ignore next */ returns => User)
  async showProfile(@Args('_id') _id: string): Promise<User> {
    return UserMapper.toDTO(await this.profileDisplayer.show(_id));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(/* istanbul ignore next */ returns => User)
  async updateProfile(@Args('profile') profile: ProfileInput): Promise<User> {
    return UserMapper.toDTO(await this.profileUpdater.update(profile));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(/* istanbul ignore next */ returns => User)
  async suspend(@Args('_id') _id: string): Promise<User> {
    return UserMapper.toDTO(await this.suspender.suspend(_id));
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(/* istanbul ignore next */ returns => User)
  async updatePassword(
    @Args('_id') _id: string,
    @Args('password') password: string,
  ): Promise<User> {
    return UserMapper.toDTO(await this.passwordUpdater.update(_id, password));
  }
}
