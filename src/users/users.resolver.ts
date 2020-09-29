import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { SubscriptionManager } from './services/subscription-manager.service';
import { UsersService } from './services/users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionManager: SubscriptionManager,
  ) {}

  @Query(/* istanbul ignore next */ returns => User)
  async user(@Args('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Mutation(/* istanbul ignore next */ returns => User)
  async subscribe(
    @Args('subscription') subscription: SubscriptionInput,
  ): Promise<User> {
    return this.subscriptionManager.subscribe(subscription);
  }
}
