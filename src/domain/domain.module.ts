import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './auth/authentication.module';

@Module({
  imports: [UsersModule, AuthenticationModule],
  exports: [UsersModule, AuthenticationModule],
})
export class DomainModule {}
