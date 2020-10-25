import { Module } from '@nestjs/common';
import { Authentication } from './authentication.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { globalConstants } from '../../constant';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';

@Module({
  imports: [
    PersistenceModule,
    PassportModule,
    JwtModule.register({
      secret: globalConstants.jwtSecretKey,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [Authentication, JwtStrategy],
  exports: [Authentication],
})
export class AuthModule {}
