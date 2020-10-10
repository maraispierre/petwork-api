import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
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
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
