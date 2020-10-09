import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { SubscriptionManager } from './services/subscription-manager.service';
import { ProfileDisplayer } from './services/profile-displayer.service';
import { ProfileUpdater } from './services/profile-updater.service';
import { Suspender } from './services/suspender.service';
import { PasswordUpdater } from './services/password-updater.service';
import { EmailsModule } from '../emails/emails.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailsModule],
  providers: [
    UsersResolver,
    SubscriptionManager,
    ProfileDisplayer,
    ProfileUpdater,
    Suspender,
    PasswordUpdater,
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
