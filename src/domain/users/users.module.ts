import { Module } from '@nestjs/common';
import { Register } from './services/register.service';
import { ProfileDisplayer } from './services/profile-displayer.service';
import { ProfileUpdater } from './services/profile-updater.service';
import { Suspender } from './services/suspender.service';
import { PasswordUpdater } from './services/password-updater.service';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { EmailsModule } from '../../infrastructure/emails/emails.module';
import { AvatarManager } from './services/avatar-manager.service';

@Module({
  imports: [PersistenceModule, EmailsModule],
  providers: [
    Register,
    ProfileDisplayer,
    ProfileUpdater,
    Suspender,
    PasswordUpdater,
    AvatarManager
  ],
  exports: [
    Register,
    ProfileDisplayer,
    ProfileUpdater,
    Suspender,
    PasswordUpdater,
    AvatarManager
  ],
})
export class UsersModule {}
