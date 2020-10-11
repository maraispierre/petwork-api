import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DomainModule } from '../../domain/domain.module';
import { UsersResolver } from './users/users.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { AuthModule } from '../../domain/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
    }),
    DomainModule,
    AuthModule,
  ],
  providers: [UsersResolver, AuthResolver],
})
export class ApiModule {}
