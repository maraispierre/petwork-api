import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { globalConstants } from '../constant';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [
    DomainModule,
    PassportModule,
    JwtModule.register({
      secret: globalConstants.jwtSecretKey,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
  controllers: [],
})
export class AuthModule {}
