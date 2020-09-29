import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { ProfileDisplayer } from './services/profile-displayer.service';
import { SubscriptionManager } from './services/subscription-manager.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly subscriptionManager: SubscriptionManager,
    private readonly profileDisplayer: ProfileDisplayer
  ) {}

  @Query(/* istanbul ignore next */ returns => User)
  async showProfile(@Args('_id') _id: string) : Promise<User> {
      return this.profileDisplayer.show(_id);
  }

  @Mutation(/* istanbul ignore next */ returns => User)
  async subscribe(
    @Args('subscription') subscription: SubscriptionInput,
  ): Promise<User> {
    return this.subscriptionManager.subscribe(subscription);
  }
}
