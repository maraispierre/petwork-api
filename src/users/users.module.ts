import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { SubscriptionManager } from './services/subscription-manager.service';
import { ProfileDisplayer } from './services/profile-displayer.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, SubscriptionManager, ProfileDisplayer],
  exports: [TypeOrmModule],
})
export class UsersModule {}
