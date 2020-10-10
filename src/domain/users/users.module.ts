import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { Register } from './services/register.service';
import { ProfileDisplayer } from './services/profile-displayer.service';
import { ProfileUpdater } from './services/profile-updater.service';
import { Suspender } from './services/suspender.service';
import { PasswordUpdater } from './services/password-updater.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    Register,
    ProfileDisplayer,
    ProfileUpdater,
    Suspender,
    PasswordUpdater,
  ],
  exports: [
    TypeOrmModule,
    Register,
    ProfileDisplayer,
    ProfileUpdater,
    Suspender,
    PasswordUpdater,
  ],
})
export class UsersModule {}
