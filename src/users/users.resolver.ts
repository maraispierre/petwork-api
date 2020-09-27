import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SubscriptionInput } from './inputs/subscription.input';
import { User } from './models/user.model';
import { SubscriptionService } from './subscription.service';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Query(/* istanbul ignore next */ returns => User)
  async user(@Args('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Mutation(/* istanbul ignore next */ returns => User)
  async subscription(
    @Args('subscription') subscription: SubscriptionInput,
  ): Promise<User> {
    return this.subscriptionService.subscription(subscription);
  }
}
