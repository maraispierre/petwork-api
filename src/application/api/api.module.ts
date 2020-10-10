import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DomainModule } from '../../domain/domain.module';
import { UsersResolver } from './users/users.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
    }),
    DomainModule,
  ],
  providers: [UsersResolver],
})
export class ApiModule {}
