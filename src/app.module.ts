import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://mongo-petwork-admin:bMVAHZkO6ja8pg4A@cluster0.z4vfi.gcp.mongodb.net/petwork?retryWrites=true&w=majority',
      entities: [join(__dirname, '**/**.model{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
