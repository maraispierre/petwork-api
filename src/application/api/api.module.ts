import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DomainModule } from '../../domain/domain.module';
import { UsersResolver } from './users/users.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { AuthenticationModule } from '../../domain/auth/authentication.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
    }),
    DomainModule,
    AuthenticationModule,
  ],
  providers: [UsersResolver, AuthResolver],
})
export class ApiModule {}
