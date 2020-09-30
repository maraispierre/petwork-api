import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProfileInput } from './inputs/profile.input';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { ProfileDisplayer } from './services/profile-displayer.service';
import { ProfileUpdater } from './services/profile-updater.service';
import { SubscriptionManager } from './services/subscription-manager.service';
import { Suspender } from './services/suspender.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly subscriptionManager: SubscriptionManager,
    private readonly profileDisplayer: ProfileDisplayer,
    private readonly profileUpdater: ProfileUpdater,
    private readonly suspender: Suspender,
  ) {}

  @Query(/* istanbul ignore next */ returns => User)
  async showProfile(@Args('_id') _id: string): Promise<User> {
    return this.profileDisplayer.show(_id);
  }

  @Mutation(/* istanbul ignore next */ returns => User)
  async subscribe(
    @Args('subscription') subscription: SubscriptionInput,
  ): Promise<User> {
    return this.subscriptionManager.subscribe(subscription);
  }

  @Mutation(/* istanbul ignore next */ returns => User)
  async updateProfile(@Args('profile') profile: ProfileInput): Promise<User> {
    return this.profileUpdater.update(profile);
  }

  @Mutation(/* istanbul ignore next */ returns => User)
  async suspend(@Args('_id') _id: string): Promise<User> {
    return this.suspender.suspend(_id);
  }
}
