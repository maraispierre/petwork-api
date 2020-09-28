import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { SubscriptionManager } from './services/subscription-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService, SubscriptionManager],
  exports: [UsersService],
})
export class UsersModule {}
